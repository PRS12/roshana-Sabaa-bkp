
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AssignmentSubmission = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const { toast } = useToast();

  const assignments = [
    {
      id: 1,
      title: "Maths Assignment",
      course: "Maths for Beginners",
      dueDate: "2025-08-15",
      description: "Addition and Subtraction exercises",
      maxPoints: 100,
      submitted: false,
    },
    {
      id: 2,
      title: "Economics Essay",
      course: "Economics Fundamentals",
      dueDate: "2024-08-16",
      description: "Complete the essay on market structures",
      maxPoints: 50,
      submitted: true,
      grade: 45,
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (assignmentId: number) => {
    if (!selectedFile && !submissionText) {
      toast({
        title: "Submission Required",
        description: "Please upload a file or enter text submission",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Assignment Submitted!",
      description: "Your assignment has been successfully submitted.",
    });

    setSelectedFile(null);
    setSubmissionText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-600 mt-2">Submit your coursework and track your progress</p>
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">{assignment.title}</CardTitle>
                  <p className="text-blue-600 font-medium mt-1">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {assignment.dueDate}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {assignment.maxPoints} points
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6">{assignment.description}</p>

              {assignment.submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium text-green-800">Submitted</span>
                    </div>
                    {assignment.grade && (
                      <span className="text-green-700 font-semibold">
                        Grade: {assignment.grade}/{assignment.maxPoints}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <p className="text-gray-600">Upload your assignment file</p>
                      <Input
                        type="file"
                        onChange={handleFileUpload}
                        className="max-w-xs mx-auto"
                        accept=".pdf,.doc,.docx,.txt,.zip"
                      />
                      {selectedFile && (
                        <div className="flex items-center justify-center mt-2 text-sm text-blue-600">
                          <FileText className="w-4 h-4 mr-1" />
                          {selectedFile.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Text Submission (Optional)
                    </label>
                    <Textarea
                      placeholder="Enter your assignment text or additional notes..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">Save as Draft</Button>
                    <Button 
                      onClick={() => handleSubmit(assignment.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Assignment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
