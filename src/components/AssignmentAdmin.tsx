import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, CheckCircle, XCircle } from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  maxPoints: number;
  submissions: Submission[];
}

interface Submission {
  id: number;
  student: string;
  submittedAt: string;
  grade?: number;
}

export const AssignmentAdmin = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "React Component Assignment",
      course: "React Development",
      dueDate: "2025-07-20",
      maxPoints: 100,
      submissions: [
        { id: 1, student: "Ali Khan", submittedAt: "2025-07-10", grade: 90 },
        { id: 2, student: "Sara Ahmed", submittedAt: "2025-07-11" },
      ],
    },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
    maxPoints: 100,
  });

  // Handle assignment creation
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignments([
      ...assignments,
      {
        id: assignments.length + 1,
        ...newAssignment,
        submissions: [],
      },
    ]);
    setShowCreate(false);
    setNewAssignment({ title: "", course: "", dueDate: "", maxPoints: 100 });
  };

  // Handle grading
  const handleGrade = (assignmentId: number, submissionId: number, grade: number) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              submissions: a.submissions.map((s) =>
                s.id === submissionId ? { ...s, grade } : s
              ),
            }
          : a
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Assignment Management</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-2" /> Create Assignment
        </Button>
      </div>
      {/* Assignment Creation Modal */}
      {showCreate && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleCreate}>
              <div>
                <Label>Title</Label>
                <Input
                  value={newAssignment.title}
                  onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Course</Label>
                <Input
                  value={newAssignment.course}
                  onChange={e => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Max Points</Label>
                <Input
                  type="number"
                  value={newAssignment.maxPoints}
                  onChange={e => setNewAssignment({ ...newAssignment, maxPoints: Number(e.target.value) })}
                  min={1}
                  required
                />
              </div>
              <div className="col-span-2 flex gap-4 mt-4">
                <Button type="submit">Create</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      {/* Assignment List */}
      <div className="space-y-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
              <div className="text-sm text-gray-500">Course: {assignment.course} | Due: {assignment.dueDate} | Max Points: {assignment.maxPoints}</div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Submissions</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border">Student</th>
                      <th className="p-2 border">Submitted At</th>
                      <th className="p-2 border">Grade</th>
                      <th className="p-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignment.submissions.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center p-4 text-gray-400">No submissions yet.</td>
                      </tr>
                    )}
                    {assignment.submissions.map((sub) => (
                      <tr key={sub.id}>
                        <td className="p-2 border">{sub.student}</td>
                        <td className="p-2 border">{sub.submittedAt}</td>
                        <td className="p-2 border">
                          <Input
                            type="number"
                            className="w-20"
                            value={sub.grade ?? ""}
                            min={0}
                            max={assignment.maxPoints}
                            onChange={e => handleGrade(assignment.id, sub.id, Number(e.target.value))}
                          />
                        </td>
                        <td className="p-2 border">
                          {sub.grade !== undefined ? (
                            <span className="inline-flex items-center text-green-600"><CheckCircle className="w-4 h-4 mr-1" /> Graded</span>
                          ) : (
                            <span className="inline-flex items-center text-gray-400"><XCircle className="w-4 h-4 mr-1" /> Not Graded</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
