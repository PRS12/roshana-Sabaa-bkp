-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

-- Enable Row Level Security for enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Policy: users can view their own enrollments
CREATE POLICY IF NOT EXISTS "Users can view their enrollments" ON public.enrollments
  FOR SELECT USING (user_id = auth.uid());

-- Policy: users can enroll themselves
CREATE POLICY IF NOT EXISTS "Users can insert their own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy: users can delete their own enrollments
CREATE POLICY IF NOT EXISTS "Users can delete their own enrollments" ON public.enrollments
  FOR DELETE USING (user_id = auth.uid());
