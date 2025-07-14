-- Courses table
CREATE TABLE public.courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments table (many-to-many: user <-> course)
CREATE TABLE public.enrollments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

-- Enable RLS for enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Policy: users can see their own enrollments
CREATE POLICY "Users can view their enrollments" ON public.enrollments
  FOR SELECT USING (user_id = auth.uid());

-- Policy: users can enroll themselves
CREATE POLICY "Users can insert their own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy: users can delete their own enrollments
CREATE POLICY "Users can delete their own enrollments" ON public.enrollments
  FOR DELETE USING (user_id = auth.uid());
