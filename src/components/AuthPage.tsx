import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Array of images for the slideshow
// changed the UI commemnt to reflect the current images
// Array of images for the slideshow updated to include classroom images
const SLIDESHOW_IMAGES = [
  {
    src: "/Main_image.jpg",
    alt: "Afghan classroom"
  },
  // {
  //   src: "/classroom_new.png",
  //   alt: "Afghan classroom"
  // },
  {
    src: "/classroom2.jpg",
    alt: "Students learning"
  },
  {
    src: "/classroom3.jpg",
    alt: "Interactive learning"
  }
  // Add more images as needed
];

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-2 sm:px-4 overflow-y-auto relative">
      {/* Flag at the extreme right above the navigation bar */}
      <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50">
        <img
          src="/flag.png"
          alt="Flag"
          className="w-8 h-6 sm:w-10 sm:h-7 object-cover rounded-md sm:rounded-lg border-2 border-gray-200 shadow-md transition-transform hover:scale-105"
        />
      </div>
      {/* Top Navigation Bar (added at the very top) */}
      <div className="w-full max-w-8xl mx-auto flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 bg-white rounded-xl sm:rounded-2xl shadow mb-4 sm:mb-6 mt-2 sm:mt-3">
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="font-bold text-lg sm:text-xl text-gray-700 tracking-tight">Roshana-Sabaa</span>
        </div>
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
      {/* Vision Statement Section - responsive for mobile */}
      <div className="w-full flex flex-col md:flex-row justify-start items-stretch mt-4 sm:mt-6 md:mt-10 z-10 gap-4 sm:gap-6 md:gap-8">
        {/* Vision text */}
        <div
          ref={visionRef}
          className={`relative bg-white rounded-2xl border border-green-600 shadow-2xl p-4 sm:p-8 md:p-14 transition-opacity duration-1000 flex flex-col items-start h-full min-h-[auto] md:min-h-[500px] w-full ${visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ flex: 1, minWidth: 0 }}
        >
          <div className="z-10 w-full">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-center sm:text-left text-green-700 mb-2 sm:mb-4 leading-tight">Roshana Sabaa</h1>
            <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-center sm:text-left text-green-700 mb-2 sm:mb-4 leading-tight">Cloud-Based Education Model</h2>
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-center sm:text-left text-gray-800 mb-3 sm:mb-6">An Initiative by Ambassador Farid Mamundzay</h3>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 tracking-wide sm:tracking-wider space-y-2 sm:space-y-3 md:space-y-4 text-left">
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
        {/* Classroom slideshow on the right, stacks below on mobile */}
        <div
          className={`relative bg-white rounded-2xl border border-green-600 shadow-2xl p-4 sm:p-8 transition-opacity duration-1000 flex flex-col items-center justify-center ${visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ width: '100%', maxWidth: '800px', minWidth: 0, flex: 1 }}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              containScroll: "trimSnaps",
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true
              })
            ]}
            className="w-full max-w-[700px] mx-auto animate-in fade-in zoom-in duration-1000"
          >
            <CarouselContent className="h-full">
              {SLIDESHOW_IMAGES.map((image, index) => (
                <CarouselItem key={index} className="h-full transition-transform duration-500 ease-in-out transform hover:scale-[1.02]">
                  <div className="relative w-full aspect-square transition-all duration-500">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="rounded-2xl border border-gray-700 w-full h-full object-cover"
                      style={{ 
                        background: '#fff', 
                        objectFit: 'cover',
                        width: '700px',
                        height: '700px',
                        maxWidth: '100%',
                        margin: '0 auto'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.insertAdjacentHTML(
                          'beforeend',
                          `<div class='text-gray-700 text-center mt-4'>Image not found. Please add <b>${image.src.substring(1)}</b> to the public folder.</div>`
                        );
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 bg-white/80 hover:bg-white" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </div>

      {/* Main Content (Landing + Auth) below Vision Statement, responsive for mobile */}
      <div className="w-full flex flex-col items-center justify-center mt-8 sm:mt-16 md:mt-32">
        {/* Main Content */}
        <div className="max-w-7xl w-full bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-16">
          {/* Left Section: Headline, Stats, Info Cards */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-8 w-full">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-center md:text-left text-gray-900 leading-tight mb-3 sm:mb-4 md:mb-6">
                LEARNING <br />
                <span className="text-green-600">BEYOND</span> <br />
                <span className="text-green-600">BORDERS</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-center md:text-left text-gray-600 mb-3 sm:mb-4 md:mb-8">
                Be part of our online community.
              </p>
            </div>
          </div>
          {/* Right Section: Auth Form */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md">
            <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h2>
              <p className="text-center text-gray-500 mb-4 sm:mb-6">
                {isLogin ? 'Sign in to access your learning dashboard' : 'Join our learning management system'}
              </p>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {!isLogin && (
                  <div className="space-y-1 sm:space-y-2">
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
                <div className="space-y-1 sm:space-y-2">
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
                <div className="space-y-1 sm:space-y-2">
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
              <div className="mt-4 sm:mt-6 text-center">
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
      <div className="w-full flex flex-col items-center justify-center mt-12 sm:mt-20 md:mt-40 bg-black py-6 sm:py-8 md:py-16">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-12">
          <a href="#" className="text-white text-base sm:text-lg md:text-2xl font-bold hover:underline transition-colors duration-200 hover:text-green-400">Blog</a>
          <a href="#" className="text-white text-base sm:text-lg md:text-2xl font-bold hover:underline transition-colors duration-200 hover:text-green-400">About</a>
          <a href="#" className="text-white text-base sm:text-lg md:text-2xl font-bold hover:underline transition-colors duration-200 hover:text-green-400">Contact</a>
          <a href="#" className="text-white text-base sm:text-lg md:text-2xl font-bold hover:underline transition-colors duration-200 hover:text-green-400">Help</a>
        </div>
        <div className="text-gray-400 text-xs sm:text-sm md:text-lg mt-4 sm:mt-6 md:mt-8 px-4 text-center">&copy; {`${new Date().getFullYear()} Roshana-Sabaa. All rights reserved.`}</div>
      </div>
    </div>
  );
};
