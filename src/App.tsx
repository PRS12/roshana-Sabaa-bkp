import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthPage } from "./components/AuthPage";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { CourseContent } from "./components/CourseContent";
import { AssignmentSubmission } from "./components/AssignmentSubmission";
import { AdminDashboard } from "./components/AdminDashboard";
import { UserManagement } from "./components/UserManagement";
import { CourseManagement } from "./components/CourseManagement";
import NotFound from "./pages/NotFound";
import { LandingPage } from "./pages/LandingPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { role, loading } = useAuth();

  if (loading) return null; // Or a loader

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="courses" element={<CourseContent />} />
          <Route path="assignments" element={<AssignmentSubmission />} />
          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="courses" element={<CourseManagement />} />
          </Route>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
