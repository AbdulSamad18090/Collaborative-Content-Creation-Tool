"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import DialogComponent from "@/components/dialog/page";
import { useRouter } from "next/navigation";
import { FileTypeDrawer } from "./_components/drawer/page";

const documents = [
  {
    id: 1,
    title: "Q2 Marketing Strategy",
    author: "John Doe",
    date: "2024-05-15",
    progress: 75,
    status: "In Progress",
    type: "Document",
  },
  {
    id: 2,
    title: "Product Roadmap 2024",
    author: "Jane Smith",
    date: "2024-05-14",
    progress: 90,
    status: "Review",
    type: "Spreadsheet",
  },
  {
    id: 3,
    title: "Customer Feedback Analysis",
    author: "Mike Johnson",
    date: "2024-05-13",
    progress: 60,
    status: "In Progress",
    type: "Document",
  },
  {
    id: 4,
    title: "Q3 Financial Projections",
    author: "Sarah Lee",
    date: "2024-05-12",
    progress: 40,
    status: "Draft",
    type: "Spreadsheet",
  },
  {
    id: 5,
    title: "New Feature Specifications",
    author: "Tom Brown",
    date: "2024-05-11",
    progress: 85,
    status: "Review",
    type: "Document",
  },
  {
    id: 6,
    title: "User Research Findings",
    author: "Emily Chen",
    date: "2024-05-10",
    progress: 100,
    status: "Completed",
    type: "Presentation",
  },
  {
    id: 7,
    title: "Brand Guidelines Update",
    author: "Alex Kim",
    date: "2024-05-09",
    progress: 30,
    status: "Draft",
    type: "Document",
  },
  {
    id: 8,
    title: "Sales Team Performance",
    author: "Chris Taylor",
    date: "2024-05-08",
    progress: 70,
    status: "In Progress",
    type: "Spreadsheet",
  },
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterDocuments(term, filterStatus, filterType, filterDate);
  };

  const handleFilter = (status, type, date) => {
    setFilterStatus(status);
    setFilterType(type);
    setFilterDate(date);
    filterDocuments(searchTerm, status, type, date);
  };

  const filterDocuments = (term, status, type, date) => {
    const filtered = documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(term.toLowerCase()) ||
        doc.author.toLowerCase().includes(term.toLowerCase()) ||
        doc.type.toLowerCase().includes(term.toLowerCase());

      const matchesStatus = status ? doc.status === status : true;
      const matchesType = type ? doc.type === type : true;
      const matchesDate = date ? doc.date === date : true;

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
    setFilteredDocuments(filtered);
  };

  return (
    <>
      <div className="p-4 w-full mx-auto overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Documents</h1>
          <FileTypeDrawer
            drawerTrigger={
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> New Document
              </Button>
            }
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 bg-white shadow-lg rounded-lg p-2 w-[300px]">
              <DropdownMenuLabel className="font-bold text-lg text-gray-700">
                Filter by
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="flex flex-col space-y-1">
                <DropdownMenuItem
                  onClick={() => handleFilter("", "", "")}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <span className="mr-2">
                    <Filter className="h-4 w-4 text-black" />
                  </span>
                  None
                </DropdownMenuItem>
                <span className="font-semibold text-gray-600">Status</span>
                <DropdownMenuItem
                  onClick={() => handleFilter("In Progress", "", "")}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <span className="mr-2">
                    <Filter className="h-4 w-4 text-blue-600" />
                  </span>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilter("Review", "", "")}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <span className="mr-2">
                    <Filter className="h-4 w-4 text-yellow-600" />
                  </span>
                  Review
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilter("Completed", "", "")}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <span className="mr-2">
                    <Filter className="h-4 w-4 text-green-600" />
                  </span>
                  Completed
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              <div className="flex flex-col space-y-1">
                <span className="font-semibold text-gray-600">Type</span>
                <DropdownMenuItem
                  onClick={() => handleFilter("", "Document", "")}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <span className="mr-2">
                    <Filter className="h-4 w-4 text-purple-600" />
                  </span>
                  Document
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilter("", "Spreadsheet", "")}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <span className="mr-2">
                    <Filter className="h-4 w-4 text-red-600" />
                  </span>
                  Spreadsheet
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilter("", "Presentation", "")}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <span className="mr-2">
                    <Filter className="h-4 w-4 text-teal-600" />
                  </span>
                  Presentation
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="bg-white mb-5 overflow-auto dark:bg-gray-800 shadow rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${doc.author}`}
                          alt={doc.author}
                        />
                        <AvatarFallback>
                          {doc.author
                            .split("")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {doc.author}
                    </div>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doc.status === "Completed"
                          ? "default"
                          : doc.status === "Review"
                          ? "secondary"
                          : "outline"
                      }
                      className="rounded-full"
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={doc.progress} className="w-full mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* <DialogComponent isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4">Select a Document Type</h2>
        <div className="grid grid-cols-3 gap-4 w-full">
          <button
            className="bg-gray-100 p-4 rounded-xl border shadow hover:bg-black hover:text-white transition-all duration-300 flex-grow"
            onClick={() => {
              router.push("/docs/create/text");
            }}
          >
            <div className="flex flex-col items-center w-full">
              <FileText className="h-12 w-12 text-blue-600" />
              <span className="mt-2">Text File</span>
            </div>
          </button>
          <button
            className="bg-gray-100 p-4 rounded-xl border shadow hover:bg-black hover:text-white transition-all duration-300 flex-grow"
            onClick={() => {
              router.push("/docs/create/sheet");
            }}
          >
            <div className="flex flex-col items-center w-full">
              <FileSpreadsheet className="h-12 w-12 text-green-600" />
              <span className="mt-2">Spread Sheet</span>
            </div>
          </button>
          <button
            className="bg-gray-100 p-4 rounded-xl border shadow hover:bg-black hover:text-white transition-all duration-300 flex-grow"
            onClick={() => {
              router.push("/docs/create/pdf");
            }}
          >
            <div className="flex flex-col items-center w-full">
              <FileText className="h-12 w-12 text-red-600" />
              <span className="mt-2">PDF</span>
            </div>
          </button>
        </div>
      </DialogComponent> */}
    </>
  );
}
