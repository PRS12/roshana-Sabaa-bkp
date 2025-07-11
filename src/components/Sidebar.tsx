import { NavLink } from "react-router-dom";
import { Book, Video, FileAudio, BookOpen, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const { role } = useAuth();

  const studentLinks = [
    { to: "/", icon: BookOpen, label: "Dashboard" },
    { to: "/courses", icon: Book, label: "My Courses" },
    { to: "/assignments", icon: FileText, label: "Assignments" },
  ];

  const adminLinks = [
    { to: "/admin", icon: BookOpen, label: "Admin Dashboard" },
    { to: "/admin/users", icon: Book, label: "Manage Users" },
    { to: "/admin/courses", icon: Book, label: "Manage Courses" },
  ];

  // Use student links for any non-admin (case-insensitive)
  const links = role && role.toLowerCase() === "admin" ? adminLinks : studentLinks;

  return (
    <div className={cn(
      "bg-white shadow-lg transition-all duration-300 border-r border-gray-200",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          {isOpen && <h1 className="text-xl font-bold text-gray-800">Taleem-Dekhteer</h1>}
        </div>
      </div>
      
      <nav className="mt-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                isActive && "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
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
