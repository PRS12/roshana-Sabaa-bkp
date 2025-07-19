
import { NavLink } from "react-router-dom";
import { 
  Book, 
  Users, 
  User, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string> ('User');
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          setUserRole(data.role || 'User');
        }
      }
    };

    fetchUserRole();
  }, [user?.id]);

  // If not authenticated, show only auth-related links
  if (!isAuthenticated) {
    return (
      <div className={cn(
        "flex flex-col h-screen bg-white shadow-lg transition-all duration-300 border-r border-gray-200",
        isOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            {isOpen && <h1 className="text-xl font-bold text-gray-800">Roshana-Sabaa</h1>}
          </div>
        </div>
        <nav className="flex-1 py-4">
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                isActive && "bg-blue-50 text-blue-600 border-r-2 border-blue-600",
                !isOpen && "justify-center"
              )
            }
          >
            <User className="w-5 h-5" />
            {isOpen && <span className="ml-3">Sign In</span>}
          </NavLink>
        </nav>
      </div>
    );
  }

  const studentLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: User, label: "Dashboard" },
    { to: "/courses", icon: Book, label: "My Courses" },
    { to: "/assignments", icon: FileText, label: "Assignments" },
  ];

  const adminLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/admin", icon: User, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "Manage Users" },
    { to: "/admin/courses", icon: Book, label: "Manage Courses" },
  ];

  const links = userRole === 'admin' ? adminLinks : studentLinks;

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white shadow-lg transition-all duration-300 border-r border-gray-200",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Top Bar with Toggle */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          {isOpen && <h1 className="text-xl font-bold text-gray-800">Roshana-Sabaa</h1>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hidden md:flex"
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User Profile Section */}
      <div className={cn(
        "p-4 border-b border-gray-100",
        !isOpen && "flex justify-center"
      )}>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || ''} />
            <AvatarFallback>{(user?.email || '?').charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                isActive && "bg-blue-50 text-blue-600 border-r-2 border-blue-600",
                !isOpen && "justify-center"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {isOpen && <span className="ml-3">{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
