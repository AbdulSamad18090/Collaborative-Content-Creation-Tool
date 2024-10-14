"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar as CalendarIcon,
  FileText,
  MoreVertical,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileTypeDrawer } from "../documents/_components/drawer/page";

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

const MainDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [documents, setDocuments] = useState(recentDocuments);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(documents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDocuments(items);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-neutral-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
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
              icon: CalendarIcon,
              change: 8,
              trend: "down",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex items-center"
            >
              <div className="flex-1">
                <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-500 mb-1">
                  {stat.label}
                </h2>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p
                  className={`text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  } flex items-center mt-1`}
                >
                  {stat.trend === "up" ? (
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
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="documents" stroke="#8884d8" />
                  <Line
                    type="monotone"
                    dataKey="collaborators"
                    stroke="#82ca9d"
                  />
                  <Line type="monotone" dataKey="comments" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Content Distribution Chart */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Content Distribution</h2>
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
                <div key={`legend-${index}`} className="flex items-center mr-4">
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
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="documents">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="divide-y divide-gray-200 dark:divide-neutral-800"
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
                            className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors duration-150 ease-in-out"
                          >
                            <div className="flex items-center">
                              <FileText className="h-6 w-6 text-gray-400 mr-3" />
                              <div>
                                <p className="text-sm font-medium">
                                  {doc.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-neutral-400">
                                  {doc.author} • {doc.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Badge
                                variant={
                                  doc.status === "In Progress"
                                    ? "default"
                                    : doc.status === "Review"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="mr-2 rounded-full"
                              >
                                {doc.status}
                              </Badge>
                              <Progress
                                value={doc.progress}
                                className="w-24 h-2 mr-2"
                              />
                              <span className="text-sm text-gray-500 dark:text-neutral-400 mr-2">
                                {doc.progress}%
                              </span>
                              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-neutral-300">
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
          <div className="bg-gray-50 dark:bg-neutral-900 px-6 py-3">
            <FileTypeDrawer
              drawerTrigger={
                <Button className="w-full flex items-center justify-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Document
                </Button>
              }
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg"
                >
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">
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
  );
};

export default MainDashboard;
