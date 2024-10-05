"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Pen,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  MoreVertical,
  ChevronDown,
  Calendar,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const activityData = [
  { name: "Mon", documents: 4, collaborators: 3, comments: 7 },
  { name: "Tue", documents: 3, collaborators: 4, comments: 5 },
  { name: "Wed", documents: 5, collaborators: 2, comments: 8 },
  { name: "Thu", documents: 2, collaborators: 5, comments: 6 },
  { name: "Fri", documents: 4, collaborators: 3, comments: 9 },
  { name: "Sat", documents: 1, collaborators: 1, comments: 2 },
  { name: "Sun", documents: 0, collaborators: 0, comments: 1 },
];

const pieChartData = [
  { name: "Documents", value: 400 },
  { name: "Tasks", value: 300 },
  { name: "Discussions", value: 200 },
  { name: "Files", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const recentDocuments = [
  {
    id: 1,
    title: "Q2 Marketing Strategy",
    author: "John Doe",
    date: "2024-05-15",
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Product Roadmap 2024",
    author: "Jane Smith",
    date: "2024-05-14",
    progress: 90,
    status: "Review",
  },
  {
    id: 3,
    title: "Customer Feedback Analysis",
    author: "Mike Johnson",
    date: "2024-05-13",
    progress: 60,
    status: "In Progress",
  },
  {
    id: 4,
    title: "Q3 Financial Projections",
    author: "Sarah Lee",
    date: "2024-05-12",
    progress: 40,
    status: "Draft",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Alice Cooper",
    role: "Content Strategist",
    avatar: "/avatars/alice.jpg",
  },
  { id: 2, name: "Bob Dylan", role: "UX Writer", avatar: "/avatars/bob.jpg" },
  {
    id: 3,
    name: "Charlie Parker",
    role: "Editor",
    avatar: "/avatars/charlie.jpg",
  },
  {
    id: 4,
    name: "Diana Ross",
    role: "Content Manager",
    avatar: "/avatars/diana.jpg",
  },
];

export default function AdvancedDashboardComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [documents, setDocuments] = useState(recentDocuments);

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded
    if (!session) {
      router.push("/"); // Redirect if there's no session
    } else {
      console.log(session); // Log the session if it exists
    }
  }, [session, status, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(documents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDocuments(items);
  };

  const profileImage =
    session?.user?.image ||
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+";

  return (
    session && (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <Link href="/" className="flex items-center space-x-2">
              <Pen className="h-8 w-6 text-black" />
              <span className="text-xl font-bold">ContentCollab</span>
            </Link>
            <button onClick={toggleSidebar} className="md:hidden">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
                { icon: FileText, label: "Documents", id: "documents" },
                { icon: Users, label: "Team", id: "team" },
                { icon: Calendar, label: "Calendar", id: "calendar" },
                { icon: MessageSquare, label: "Messages", id: "messages" },
                { icon: Settings, label: "Settings", id: "settings" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? "bg-black text-white bg-opacity-90"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-700">
            <button
              className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => {
                signOut({
                  callbackUrl: "/",
                  redirect: false,
                });
              }}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button onClick={toggleSidebar} className="md:hidden">
                  <Menu className="h-6 w-6" />
                </button>
                <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <Label htmlFor="search" className="sr-only">
                      Search
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm dark:border-neutral-800"
                        placeholder="Search documents, tasks, team members..."
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black relative">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={profileImage}
                          alt="User avatar"
                        />
                        <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
                {[
                  {
                    label: "Total Documents",
                    value: "1,284",
                    icon: FileText,
                    change: 12,
                    trend: "up",
                  },
                  {
                    label: "In Progress",
                    value: "12",
                    icon: TrendingUp,
                    change: 2,
                    trend: "up",
                  },
                  {
                    label: "In Review",
                    value: "38",
                    icon: Users,
                    change: 5,
                    trend: "up",
                  },
                  {
                    label: "Completed",
                    value: "643",
                    icon: Calendar,
                    change: 8,
                    trend: "down",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center"
                  >
                    <div className="flex-1">
                      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {stat.label}
                      </h2>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p
                        className={`text-sm ${
                          stat.trend === "'up'"
                            ? "'text-green-600'"
                            : "'text-red-600'"
                        } flex items-center mt-1`}
                      >
                        {stat.trend === "'up'" ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {stat.change}%
                      </p>
                    </div>
                    <div className="ml-4">
                      <stat.icon className="h-12 w-12 text-yellow-500 opacity-75" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6">
                {/* Activity Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Weekly Activity
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="documents"
                          stroke="#8884d8"
                        />
                        <Line
                          type="monotone"
                          dataKey="collaborators"
                          stroke="#82ca9d"
                        />
                        <Line
                          type="monotone"
                          dataKey="comments"
                          stroke="#ffc658"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Content Distribution Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Content Distribution
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center mt-4">
                    {pieChartData.map((entry, index) => (
                      <div
                        key={`legend-${index}`}
                        className="flex items-center mr-4"
                      >
                        <div
                          className="w-3 h-3 rounded-full mr-1"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="text-sm">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Documents */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Recent Documents
                  </h2>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="documents">
                      {(provided) => (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                          {documents.map((doc, index) => (
                            <Draggable
                              key={doc.id}
                              draggableId={doc.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out"
                                >
                                  <div className="flex items-center">
                                    <FileText className="h-6 w-6 text-gray-400 mr-3" />
                                    <div>
                                      <p className="text-sm font-medium">
                                        {doc.title}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {doc.author} • {doc.date}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <Badge
                                      variant={
                                        doc.status === "'In Progress'"
                                          ? "'default'"
                                          : doc.status === "'Review'"
                                          ? "'secondary'"
                                          : "'outline'"
                                      }
                                      className="mr-2"
                                    >
                                      {doc.status}
                                    </Badge>
                                    <Progress
                                      value={doc.progress}
                                      className="w-24 h-2 mr-2"
                                    />
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                      {doc.progress}%
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                      <MoreVertical className="h-5 w-5" />
                                    </button>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                  <Button className="w-full flex items-center justify-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Document
                  </Button>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Team Members</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split("'")
                              .map((n) => n[0])
                              .join("''")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  );
}
