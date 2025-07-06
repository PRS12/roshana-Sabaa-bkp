import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileAudio, FileText, Play, Download, Book } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CourseContent = () => {
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const contentItems = [
    {
      id: 1,
      title: "Introduction to React",
      type: "video",
      duration: "15:30",
      description: "Learn the basics of React components and JSX",
      url: "https://www.youtube.com/embed/dGcsHMXbSOA"
    },
    {
      id: 2,
      title: "React Hooks Explained",
      type: "audio",
      duration: "12:45",
      description: "Understanding useState and useEffect hooks",
      url: "#"
    },
    {
      id: 3,
      title: "React Best Practices Guide",
      type: "pdf",
      pages: 25,
      description: "Comprehensive guide to React development patterns",
      url: "#"
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-blue-600" />;
      case 'audio': return <FileAudio className="w-5 h-5 text-green-600" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">React Development Course</h1>
        <p className="text-gray-600 mt-2">Master React from fundamentals to advanced concepts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {contentItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContent?.id === item.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedContent(item)}
                  >
                    <div className="flex items-center space-x-3">
                      {getIcon(item.type)}
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
                          <div className="text-center text-white">
                            <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Video Player</p>
                            <p className="text-sm opacity-75">Duration: {selectedContent.duration}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedContent.type === 'audio' && (
                      <div className="text-center">
                        <FileAudio className="w-16 h-16 mx-auto mb-4 text-green-600" />
                        <p className="text-lg font-medium">Audio Content</p>
                        <p className="text-gray-600">Duration: {selectedContent.duration}</p>
                        <Button className="mt-4">
                          <Play className="w-4 h-4 mr-2" />
                          Play Audio
                        </Button>
                      </div>
                    )}
                    
                    {selectedContent.type === 'pdf' && (
                      <div className="text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-red-600" />
                        <p className="text-lg font-medium">PDF Document</p>
                        <p className="text-gray-600">{selectedContent.pages} pages</p>
                        <Button className="mt-4">
                          <FileText className="w-4 h-4 mr-2" />
                          Open PDF
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
                    <p className="text-sm">Choose from the course content list</p>
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
