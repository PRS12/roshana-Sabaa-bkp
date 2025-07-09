import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileAudio, FileText, Play, Download, Book } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const CourseContent = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // Fetch course content from JSON file
  useEffect(() => {
    fetch("/course-content.json")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setSelectedCourseId(data[0]?.id || null);
        setSelectedModuleId(data[0]?.modules[0]?.id || null);
      });
  }, []);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const selectedModule = selectedCourse?.modules.find((m: any) => m.id === selectedModuleId);

  // Update module when course changes
  const handleCourseChange = (id: string) => {
    setSelectedCourseId(Number(id));
    const course = courses.find(c => c.id === Number(id));
    setSelectedModuleId(course?.modules[0]?.id || null);
    setSelectedContent(null);
  };

  // Update content when module changes
  const handleModuleChange = (id: string) => {
    setSelectedModuleId(Number(id));
    setSelectedContent(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Portal</h1>
        <p className="text-gray-600 mt-2">Browse your courses and modules</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium">Select Course</label>
          <Select value={selectedCourseId?.toString()} onValueChange={handleCourseChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id.toString()}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium">Select Module</label>
          <Select value={selectedModuleId?.toString()} onValueChange={handleModuleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a module" />
            </SelectTrigger>
            <SelectContent>
              {selectedCourse?.modules.map(module => (
                <SelectItem key={module.id} value={module.id.toString()}>{module.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Module Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedModule?.contents.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContent?.id === item.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedContent(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          {item.type === 'pdf' ? `${item.pages} pages` : item.duration}
                        </p>
                      </div>
                      {selectedContent?.id === item.id && (
                        <Play className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              {selectedContent ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{selectedContent.title}</h2>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <p className="text-gray-600">{selectedContent.description}</p>
                  <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                    {selectedContent.type === 'video' && (
                      <div className="w-full">
                        <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                          <video controls className="w-full h-full rounded-lg">
                            <source src={selectedContent.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    )}
                    {selectedContent.type === 'audio' && (
                      <div className="text-center">
                        <FileAudio className="w-16 h-16 mx-auto mb-4 text-green-600" />
                        <p className="text-lg font-medium">Audio Content</p>
                        <p className="text-gray-600">Duration: {selectedContent.duration}</p>
                        <audio controls className="mt-4 w-full">
                          <source src={selectedContent.url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                    {selectedContent.type === 'pdf' && (
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-red-600" />
                        <p className="text-lg font-medium">PDF Document</p>
                        <p className="text-gray-600">{selectedContent.pages} pages</p>
                        <Button className="mt-4" asChild>
                          <a href={selectedContent.url} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 mr-2" />
                            Open PDF
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <Book className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select content to view</p>
                    <p className="text-sm">Choose from the module content list</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
