import { Button } from "@/components/ui/button";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Top Navigation Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-8 bg-white rounded-2xl shadow mb-8">
        <div className="flex items-center gap-4">
          <span className="font-bold text-xl text-gray-700 tracking-tight">Roshana-Sabaa</span>
          <div className="flex items-center gap-2 ml-8">
            <span className="text-gray-500 font-medium">Categories</span>
            <span className="text-gray-400">▼</span>
          </div>
        </div>
        <input className="px-4 py-2 border border-gray-200 rounded-lg text-sm w-64 bg-gray-50" placeholder="Search" />
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-500">Sign up</Button>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-10">
        {/* Left Section: Headline and Actions */}
        <div className="flex-1">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            LEARNING <br />
            <span className="text-green-600">WITHOUT</span> <br />
            <span className="text-green-600">LIMITS</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join our online community and learn from professionals.
          </p>
          <div className="flex gap-4 mb-8">
            <Button variant="outline" className="px-6 py-3 text-base font-semibold">View Courses</Button>
            <Button className="px-6 py-3 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700">Create Account</Button>
          </div>
          <div className="flex gap-12 text-center mb-8">
            <div>
              <p className="text-2xl font-bold text-green-600">95%</p>
              <p className="text-xs text-gray-500">student approval</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">+120</p>
              <p className="text-xs text-gray-500">online courses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">+20</p>
              <p className="text-xs text-gray-500">categories</p>
            </div>
          </div>
        </div>
        {/* Right Section: Info Cards */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-start border border-gray-100 min-h-[120px]">
              <h3 className="font-semibold text-lg mb-2">Popular Courses</h3>
              <p className="text-gray-500 text-sm">Explore the most popular courses among our students</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-start border border-gray-100 min-h-[120px]">
              <h3 className="font-semibold text-lg mb-2">New Courses</h3>
              <p className="text-gray-500 text-sm">Explore the new courses on our platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
