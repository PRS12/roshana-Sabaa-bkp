import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Book, Search, Plus, Edit, Trash, Users, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [courses, setCourses] = useState([]); // No default courses
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    students: 0,
    lessons: 0,
    status: 'active',
    category: '',
    duration: ''
  });

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCourse = (courseId: number, courseTitle: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
    toast({
      title: "Course Deleted",
      description: `"${courseTitle}" has been removed from the system.`,
    });
  };

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.instructor || !newCourse.category || !newCourse.duration) {
      toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    setCourses([
      ...courses,
      {
        ...newCourse,
        id: Date.now(),
        students: Number(newCourse.students),
        lessons: Number(newCourse.lessons),
      },
    ]);
    setShowAddModal(false);
    setNewCourse({ title: '', instructor: '', students: 0, lessons: 0, status: 'active', category: '', duration: '' });
    toast({ title: "Course Added", description: `"${newCourse.title}" has been added.` });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Programming': return 'bg-blue-100 text-blue-800';
      case 'Design': return 'bg-purple-100 text-purple-800';
      case 'Database': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Roshana-Sabaa Course Management</h1>
          <p className="text-gray-600 mt-2">Create and manage learning courses on Roshana-Sabaa</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Course</h2>
            <div className="space-y-3">
              <Input placeholder="Title" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
              <Input placeholder="Instructor" value={newCourse.instructor} onChange={e => setNewCourse({ ...newCourse, instructor: e.target.value })} />
              <Input placeholder="Category" value={newCourse.category} onChange={e => setNewCourse({ ...newCourse, category: e.target.value })} />
              <Input placeholder="Duration (e.g. 8 weeks)" value={newCourse.duration} onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })} />
              <Input type="number" placeholder="Lessons" value={newCourse.lessons} onChange={e => setNewCourse({ ...newCourse, lessons: Number(e.target.value) })} />
              <Input type="number" placeholder="Students" value={newCourse.students} onChange={e => setNewCourse({ ...newCourse, students: Number(e.target.value) })} />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={handleAddCourse}>Add Course</Button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Book className="w-5 h-5 mr-2" />
              All Courses ({filteredCourses.length})
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                        <Badge className={getStatusBadgeColor(course.status)}>
                          {course.status}
                        </Badge>
                        <Badge className={getCategoryColor(course.category)}>
                          {course.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {course.students} students enrolled
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Video className="w-4 h-4 mr-2" />
                          {course.lessons} lessons
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Book className="w-4 h-4 mr-2" />
                          {course.duration}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id, course.title)}
                      >
                        <Trash className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Courses</h3>
            <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Courses</h3>
            <p className="text-2xl font-bold text-green-600">
              {courses.filter(c => c.status === 'active').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
            <p className="text-2xl font-bold text-purple-600">
              {courses.reduce((sum, course) => sum + course.students, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Draft Courses</h3>
            <p className="text-2xl font-bold text-orange-600">
              {courses.filter(c => c.status === 'draft').length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
