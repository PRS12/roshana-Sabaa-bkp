import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Plus, Edit, Trash, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "student", status: "active", courses: 3 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "instructor", status: "active", courses: 5 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "student", status: "inactive", courses: 1 },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "admin", status: "active", courses: 0 },
    { id: 5, name: "Tom Brown", email: "tom@example.com", role: "student", status: "active", courses: 2 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    status: 'active',
    courses: 0
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: number, userName: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User Deleted",
      description: `${userName} has been removed from the system.`,
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    setUsers([
      ...users,
      {
        ...newUser,
        id: Date.now(),
        courses: Number(newUser.courses),
      },
    ]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'student', status: 'active', courses: 0 });
    toast({ title: "User Added", description: `"${newUser.name}" has been added.` });
  };

  const handleToggleStatus = (userId: number, userName: string, currentStatus: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: currentStatus === 'active' ? 'inactive' : 'active' } : u));
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: "Status Updated",
      description: `${userName} is now ${newStatus}.`,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'instructor': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage students, instructors, and administrators</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>
      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div className="space-y-3">
              <Input placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
              <Input placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              <select className="w-full border rounded px-3 py-2" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
              <select className="w-full border rounded px-3 py-2" value={newUser.status} onChange={e => setNewUser({ ...newUser, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Input type="number" placeholder="Courses" value={newUser.courses} onChange={e => setNewUser({ ...newUser, courses: Number(e.target.value) })} />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </div>
          </div>
        </div>
      )}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              All Users ({filteredUsers.length})
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Courses</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{user.courses}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleStatus(user.id, user.name, user.status)}
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.name)}
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === 'student').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructors</h3>
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role === 'instructor').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Users</h3>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.status === 'active').length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
