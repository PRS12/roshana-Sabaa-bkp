import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
        } else {
          toast({ title: 'Welcome back!', description: 'You have been successfully logged in.' });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({ title: 'Signup Failed', description: error.message, variant: 'destructive' });
        } else {
          toast({ title: 'Account Created!', description: 'Please check your email to verify your account.' });
        }
      }
    } catch {
      toast({ title: 'Error', description: 'An unexpected error occurred. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Handlers for landing page buttons
  const handleViewCourses = () => navigate('/courses');
  const handleCreateAccount = () => setIsLogin(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Top Navigation Bar */}
      <div className="w-full max-w-8xl mx-auto flex items-center justify-between py-7 px-9 bg-white rounded-2xl shadow mb-8">
        <div className="flex items-center gap-4">
          <span className="font-bold text-xl text-gray-700 tracking-tight">Taleem-Dekhteer</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-500" onClick={() => setIsLogin(false)}>Sign up</Button>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl w-full bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-16">
        {/* Left Section: Headline, Stats, Info Cards */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h1 className="text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              LEARNING <br />
              <span className="text-green-600">WITHOUT</span> <br />
              <span className="text-green-600">LIMITS</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join our online community and learn from professionals.
            </p>
            <div className="flex gap-12 text-center mb-8">
              <div>
                <p className="text-2xl font-bold text-green-600">95%</p>
                <p className="text-xs text-gray-500">student approval</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">+120</p>
                <p className="text-xs text-gray-500">online courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">+20</p>
                <p className="text-xs text-gray-500">categories</p>
              </div>
            </div>
          </div>
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-start border border-gray-100 min-h-[120px]">
              <h3 className="font-semibold text-lg mb-2">Popular Courses</h3>
              <p className="text-gray-500 text-sm">Explore the most popular courses among our students</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-start border border-gray-100 min-h-[120px]">
              <h3 className="font-semibold text-lg mb-2">New Courses</h3>
              <p className="text-gray-500 text-sm">Explore the new courses on our platform</p>
            </div>
          </div>
        </div>
        {/* Right Section: Auth Form */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          <div className="w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-center mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-center text-gray-500 mb-6">
              {isLogin ? 'Sign in to access your learning dashboard' : 'Join our learning management system'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
