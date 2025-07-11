import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Book, FileText, TrendingUp, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "./UserManagement";
import { useState } from "react";

export const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, color: "from-blue-500 to-blue-600" },
    { title: "Active Courses", value: "45", icon: Book, color: "from-green-500 to-green-600" },
    { title: "Assignments", value: "156", icon: FileText, color: "from-purple-500 to-purple-600" },
    { title: "Completion Rate", value: "87%", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
  ];

  // State to manage the current tab and mode for UserManagement
  const [tab, setTab] = useState<'view' | 'add' | 'report'>('view');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Taleem-Dekhteer Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your Taleem-Dekhteer learning management system</p>
        </div>
        <div className="flex space-x-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`bg-gradient-to-r ${stat.color} text-white`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="courses">Course Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              {/* User Management: Add User & View All Users */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* View All Users */}
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold">View All Users</h3>
                    <p className="text-sm text-gray-600">Manage student and instructor accounts</p>
                    <Button className="mt-2" onClick={() => setTab('view')}>View All Users</Button>
                  </div>
                </Card>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                {/* Add New User */}
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <Plus className="w-8 h-8 mx-auto mb-3 text-green-600" />
                    <h3 className="font-semibold">Add New User</h3>
                    <p className="text-sm text-gray-600">Create student or instructor account</p>
                    <Button className="mt-2" onClick={() => setTab('add')}>Add User</Button>
                  </div>
                </Card>
                {/* User Reports */}
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <FileText className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-semibold">User Reports</h3>
                    <p className="text-sm text-gray-600">Generate user activity reports</p>
                    <Button className="mt-2" onClick={() => setTab('report')}>User Reports</Button>
                  </div>
                </Card>
              </div>
              {/* Render UserManagement component for Add/View, and placeholder for User Reports */}
              {tab === 'add' && <UserManagement />}
              {tab === 'view' && <UserManagement />}
              {tab === 'report' && (
                <Card className="mt-4 p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">User Reports</h3>
                  <p className="text-gray-600 mb-4">(User activity reports functionality coming soon.)</p>
                  {/* Implement user report logic here as needed */}
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <Book className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold">View All Courses</h3>
                    <p className="text-sm text-gray-600">Manage existing courses</p>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <Plus className="w-8 h-8 mx-auto mb-3 text-green-600" />
                    <h3 className="font-semibold">Create Course</h3>
                    <p className="text-sm text-gray-600">Add new learning content</p>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-3 text-orange-600" />
                    <h3 className="font-semibold">Course Analytics</h3>
                    <p className="text-sm text-gray-600">Track course performance</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm">New user registration</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm">Course completion</span>
                        <span className="text-xs text-gray-500">4 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm">Assignment submitted</span>
                        <span className="text-xs text-gray-500">6 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Server Status</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Storage</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">75% Used</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
