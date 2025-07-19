import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, ClipboardList, ChevronRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          console.log('Fetching role for user:', user.id);
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error fetching user role:', error);
            return;
          }
          
          if (data) {
            console.log('User role data:', data);
            const role = data.role?.toLowerCase() || 'user';
            console.log('Setting user role to:', role);
            setUserRole(role);
          }
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.id]);

  const studentQuickLinks = [
    {
      title: "Browse Courses",
      description: "Explore our wide range of courses designed to enhance your learning journey.",
      icon: <BookOpen className="h-6 w-6" />,
      path: "/courses",
    },
    {
      title: "Assignments",
      description: "Access and submit your assignments for different courses.",
      icon: <ClipboardList className="h-6 w-6" />,
      path: "/assignments",
    },
    {
      title: "Community",
      description: "Connect with fellow learners and instructors in our vibrant community.",
      icon: <Users className="h-6 w-6" />,
      path: "/dashboard",
    },
  ];

  const adminQuickLinks = [
    {
      title: "Dashboard",
      description: "Access your administrative dashboard to manage the platform.",
      icon: <User className="h-6 w-6" />,
      path: "/admin",
    },
    {
      title: "Manage Users",
      description: "Add, modify, or remove user accounts and manage permissions.",
      icon: <Users className="h-6 w-6" />,
      path: "/admin/users",
    },
    {
      title: "Manage Courses",
      description: "Create and manage courses, content, and enrollments.",
      icon: <BookOpen className="h-6 w-6" />,
      path: "/admin/courses",
    },
  ];

  const quickLinks = !loading && userRole === 'admin' ? adminQuickLinks : studentQuickLinks;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Roshana Saba
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your gateway to comprehensive learning and academic excellence
        </p>
      </section>

      {/* Vision Section */}
      <section className="mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
              <p className="text-gray-600">
                At Roshana Saba, we envision a world where quality education is accessible to all. 
                Our platform is designed to break down barriers to learning, fostering an environment where 
                students and educators can collaborate effectively, share knowledge, and achieve their academic goals.
              </p>
              <div className="mt-6 space-y-2">
                <h3 className="font-medium text-gray-900">We strive to:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Provide accessible, high-quality educational resources</li>
                  <li>Foster a collaborative learning environment</li>
                  <li>Support academic growth and achievement</li>
                  <li>Enable seamless communication between students and educators</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Navigation Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Navigation</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Card key={link.path} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => navigate(link.path)}
                  >
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Getting Started Tips */}
      <section className="mt-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Getting Started {loading ? '(Loading...)' : `(${userRole})`}
            </h2>
            {!loading && userRole === 'admin' ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Welcome, Administrator! Here's how you can manage the platform effectively:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-4">
                  <li>
                    <span className="font-medium text-gray-900">User Management:</span>{" "}
                    Add, modify, or remove user accounts and manage their roles and permissions
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Course Administration:</span>{" "}
                    Create new courses, update content, and manage course enrollments
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Monitor Progress:</span>{" "}
                    Track student engagement, course completion rates, and overall platform usage
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">System Settings:</span>{" "}
                    Configure platform settings, manage notifications, and maintain system performance
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Support & Communication:</span>{" "}
                    Respond to user inquiries and send platform-wide announcements
                  </li>
                </ol>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Welcome to your learning journey! Here's how to get the most out of Roshana Saba:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-4">
                  <li>
                    <span className="font-medium text-gray-900">Profile Setup:</span>{" "}
                    Complete your profile to personalize your learning experience
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Course Enrollment:</span>{" "}
                    Browse and enroll in courses that align with your learning goals
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Track Learning:</span>{" "}
                    Monitor your progress through the dashboard and stay on top of deadlines
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Assignments:</span>{" "}
                    Submit your work on time and receive feedback from instructors
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Collaborate:</span>{" "}
                    Participate in discussions and connect with fellow learners
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    💡 Pro Tip: Set up notifications to stay updated with course announcements and assignment deadlines!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
