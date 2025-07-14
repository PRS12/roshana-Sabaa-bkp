import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const visionRef = useRef<HTMLDivElement>(null);
  const [visionVisible, setVisionVisible] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const node = visionRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisionVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 overflow-y-auto relative">
      {/* Flag at the extreme right above the navigation bar */}
      <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 50 }}>
        <img
          src="/flag.png"
          alt="Flag"
          style={{ width: 56, height: 36, objectFit: 'cover', borderRadius: 6, border: '2px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        />
      </div>
      {/* Top Navigation Bar (added at the very top) */}
      <div className="w-full max-w-8xl mx-auto flex items-center justify-between py-4 px-4 bg-white rounded-2xl shadow mb-10 mt-4">
        <div className="flex items-center gap-5">
          <span className="font-bold text-xl text-gray-700 tracking-tight">Roshana-Sabaa</span>
        </div>
        {/* <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-500" onClick={() => setIsLogin(false)}>Sign up</Button>
        </div> */}
      </div>
      {/* Site-wide full-page watermark */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <img
          src="/watermark.jpeg"
          alt="Site Watermark"
          className="object-cover w-full h-full opacity-10 mix-blend-multiply"
          style={{ filter: 'grayscale(100%) blur(2px)' }}
        />
      </div>
      {/* Vision Statement Section - left-aligned, wide (60% of screen), single line between paragraphs, with classroom image on the right */}
      <div className="w-full flex flex-row justify-start items-stretch mt-10 z-10 gap-8">
        <div
          ref={visionRef}
          className={`relative bg-white rounded-2xl border border-green-600 shadow-2xl p-14 transition-opacity duration-1000 flex flex-col items-start h-full ${visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ width: '60vw', minWidth: '600px', maxWidth: '1100px', height: '100%' }}
        >
          <div className="z-10 w-full">
            <h1 className="text-4xl md:text-5xl font-extrabold text-centre text-green-700 mb-4 leading-tight">Roshana Sabaa</h1>
            <h2 className="text-4xl md:text-5xl font-extrabold text-left text-green-700 mb-4 leading-tight">Cloud Based Education Model</h2>
            <h3 className="text-2xl font-bold text-left text-gray-800 mb-6">An Initiative by Ambassador Farid Mamundzay</h3>
            <div className="text-gray-700 text-base md:text-lg leading-9 tracking-wider space-y-4 text-left">
              <p>Education empowers us with a vision to create opportunities for all—transforming lives, economies, and societies. It enables every individual to live a life of purpose and actively contribute to global growth and development. This vision strengthens our ability to respond to emerging challenges and ensures we address the needs and aspirations of future generations.</p>
              <p>As an Afghan Ambassador, I felt a profound sense of collective purpose and responsibility in actively supporting and advancing education for Afghan refugees. </p>
              <p>I have drawn deep inspiration from my experience as a lecturer at the American University of Afghanistan, where I served in the Faculty of Business and strived to broaden educational horizons and empowered young minds.</p>
              <p>In my role as an ambassador, I actively championed educational progress for the greater good by facilitating scholarships and building partnerships with universities in India to support Afghan students. One of our proudest achievements was the reopening of the Syed Jamaluddin School—the only school for Afghan refugees in New Delhi.</p>
              <p>Placing a greater focus on education, we shine a light on a startling reality: an estimated 8.9 million children in Afghanistan—among them 888,000 with disabilities and 2.2 million girls—are out of school and urgently need educational emergency support.</p>
              <p>To ensure greater access to education for Afghan refugees, we aim to forge partnerships with a diverse set of stakeholders to support their lifelong learning, enabling them to heal and rebuild their lives.</p>
              <p>To turn our vision into reality, we are launching a cloud-based education program designed to provide meaningful support and reach the doorstep of every Afghan child.</p>
              <p>This Initiative represents a transformative step in responding to Afghanistan’s ongoing crisis—ensuring continuity in education for Afghan children, even in the most challenging times.</p>
            </div>
          </div>
        </div>
        {/* Classroom image on the right */}
        <div
          ref={visionRef}
          className={`relative bg-white rounded-2xl border border-green-600 shadow-2xl p-14 transition-opacity duration-1000 flex flex-col items-start h-full ${visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ width: '60vw', minWidth: '600px', maxWidth: '1100px', height: '100%', flex: 1 }}
        >
          <img
            src="/classroom_new.png"
            alt="Afghan classroom"
            className="rounded-2xl border border-gray-300 w-full h-full"
            style={{ background: '#fff', objectFit: 'fill', height: '100%' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.insertAdjacentHTML('beforeend', "<div class='text-gray-400 text-center mt-4'>Classroom image not found. Please add <b>classroom_new.png</b> to the public folder.</div>"); }}
          />
        </div>
      </div>

      {/* Main Content (Landing + Auth) below Vision Statement, starts from 3/4th of the page */}
      <div className="w-full flex flex-col items-center justify-center mt-32">
        {/* Top Navigation Bar */}
        <div className="w-full max-w-8xl mx-auto flex items-center justify-between py-4 px-4 bg-white rounded-2xl shadow mb-10">
          <div className="flex items-center gap-5">
            <span className="font-bold text-xl text-gray-700 tracking-tight">Roshana-Sabaa</span>
          </div>
          <div className="flex items-center">
            <img
              src="/flag.png"
              alt="Flag"
              style={{ width: 56, height: 36, objectFit: 'cover', borderRadius: 6, border: '2px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            />
          </div>
          {/* <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-500" onClick={() => setIsLogin(false)}>Sign up</Button>
          </div> */}
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
                Join our online community.
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
              <h2 className="text-2xl font-bold text-center mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h2>
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
                  {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}

                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Footer with blog and other links */}
      <div className="w-full flex flex-col items-center justify-center mt-40 bg-black py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <a href="#" className="text-white text-2xl font-bold hover:underline">Blog</a>
          <a href="#" className="text-white text-2xl font-bold hover:underline">About</a>
          <a href="#" className="text-white text-2xl font-bold hover:underline">Contact</a>
          <a href="#" className="text-white text-2xl font-bold hover:underline">Help</a>
        </div>
        <div className="text-gray-400 text-lg mt-8">&copy; {`${new Date().getFullYear()} Roshana-Sabaa. All rights reserved.`}</div>
      </div>
    </div>
  );
};
