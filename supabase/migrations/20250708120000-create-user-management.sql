-- Migration to create user_management table for admin user management
CREATE TABLE IF NOT EXISTS user_management (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  role text NOT NULL CHECK (role IN ('student', 'instructor', 'admin')),
  status text NOT NULL CHECK (status IN ('active', 'inactive')),
  courses integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
