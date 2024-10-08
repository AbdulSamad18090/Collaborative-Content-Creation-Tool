"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Send } from "lucide-react";

// Mock data for documents and comments
const documents = [
  { id: 1, title: "Q2 Marketing Strategy", author: "Alice Johnson", date: "2024-05-15" },
  { id: 2, title: "Product Roadmap 2024", author: "Bob Smith", date: "2024-05-14" },
  { id: 3, title: "Customer Feedback Analysis", author: "Charlie Brown", date: "2024-05-13" },
]

const initialComments = [
  { id: 1, documentId: 1, author: "Diana Ross", content: "Great strategy! Can we discuss the social media plan in more detail?", date: "2024-05-16T10:30:00", avatar: "/avatars/diana.jpg" },
  { id: 2, documentId: 1, author: "Elton John", content: "I think we should focus more on influencer marketing.", date: "2024-05-16T11:45:00", avatar: "/avatars/elton.jpg" },
  { id: 3, documentId: 2, author: "Freddie Mercury", content: "The timeline for Q3 looks ambitious. Can we review the resources?", date: "2024-05-15T09:15:00", avatar: "/avatars/freddie.jpg" },
  { id: 4, documentId: 3, author: "Grace Slick", content: "Interesting insights. We should prioritize addressing the top 3 issues.", date: "2024-05-14T14:20:00", avatar: "/avatars/grace.jpg" },
]

export default function Comments() {
  const [comments, setComments] = useState(initialComments)
  const [selectedDocument, setSelectedDocument] = useState(documents[0].id)
  const [newComment, setNewComment] = useState("")

  const filteredComments = comments.filter(comment => comment.documentId === selectedDocument)

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        documentId: selectedDocument,
        author: "Current User", // In a real app, this would be the logged-in user
        content: newComment,
        date: new Date().toISOString(),
        avatar: "/placeholder.svg?height=40&width=40",
      }
      setComments([...comments, newCommentObj])
      setNewComment("")
    }
  }

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId))
  }

  return (
    (<div className="p-4 w-full mx-auto overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      <Tabs
        defaultValue={selectedDocument.toString()}
        onValueChange={(value) => setSelectedDocument(parseInt(value))}>
        <TabsList className="mb-4">
          {documents.map((doc) => (
            <TabsTrigger key={doc.id} value={doc.id.toString()}>
              {doc.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {documents.map((doc) => (
          <TabsContent key={doc.id} value={doc.id.toString()}>
            <Card>
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>
                  by {doc.author} • {doc.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {filteredComments.length > 0 ? (
                    filteredComments.map((comment, index) => (
                      <div key={comment.id} className="mb-4">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{comment.author}</h4>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)}>
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.date).toLocaleString()}
                            </p>
                            <p>{comment.content}</p>
                          </div>
                        </div>
                        {index < filteredComments.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No comments yet.</p>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1" />
                  <Button onClick={handleAddComment}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>)
  );
}