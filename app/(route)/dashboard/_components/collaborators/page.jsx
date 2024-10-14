"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Mail } from "lucide-react"

const accessLevels = [
  { value: "owner", label: "Owner" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "commenter", label: "Commenter" },
]

const initialCollaborators = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", access: "owner", avatar: "/avatars/alice.jpg" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", access: "editor", avatar: "/avatars/bob.jpg" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", access: "viewer", avatar: "/avatars/charlie.jpg" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", access: "commenter", avatar: "/avatars/diana.jpg" },
]

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState(initialCollaborators)
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("")
  const [newCollaboratorAccess, setNewCollaboratorAccess] = useState("viewer")

  const handleInvite = () => {
    if (newCollaboratorEmail && newCollaboratorAccess) {
      const newCollaborator = {
        id: collaborators.length + 1,
        name: newCollaboratorEmail.split("@")[0],
        email: newCollaboratorEmail,
        access: newCollaboratorAccess,
        avatar: `/placeholder.svg?height=40&width=40`,
      }
      setCollaborators([...collaborators, newCollaborator])
      setNewCollaboratorEmail("")
      setNewCollaboratorAccess("viewer")
    }
  }

  const handleAccessChange = (collaboratorId, newAccess) => {
    setCollaborators(collaborators.map(c => 
      c.id === collaboratorId ? { ...c, access: newAccess } : c))
  }

  const handleRemoveCollaborator = (collaboratorId) => {
    setCollaborators(collaborators.filter(c => c.id !== collaboratorId))
  }

  return (
    (<div className="p-4 w-full mx-auto overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Collaborators</h1>
      <Card className="mb-8 dark:bg-neutral-900 dark:bg-opacity-60">
        <CardHeader>
          <CardTitle>Invite Collaborators</CardTitle>
          <CardDescription>Add new team members to your project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex-1">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="collaborator@example.com"
                type="email"
                value={newCollaboratorEmail}
                onChange={(e) => setNewCollaboratorEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="access-level">Access level</Label>
              <Select value={newCollaboratorAccess} onValueChange={setNewCollaboratorAccess}>
                <SelectTrigger id="access-level" className="w-[180px]">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleInvite}>
            <Plus className="mr-2 h-4 w-4" /> Invite Collaborator
          </Button>
        </CardFooter>
      </Card>
      <Card className='dark:bg-neutral-900 dark:bg-opacity-60'>
        <CardHeader>
          <CardTitle>Current Collaborators</CardTitle>
          <CardDescription>Manage your team members and their access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className='dark:border-neutral-700'>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collaborators.map((collaborator) => (
                <TableRow key={collaborator.id} className='dark:border-neutral-700'>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{collaborator.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{collaborator.email}</TableCell>
                  <TableCell>
                    <Badge variant={collaborator.access === "owner" ? "default" : "secondary"}>
                      {collaborator.access}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => window.location.href = `mailto:${collaborator.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change access</DropdownMenuLabel>
                        {accessLevels.map((level) => (
                          <DropdownMenuItem
                            key={level.value}
                            onClick={() => handleAccessChange(collaborator.id, level.value)}>
                            {level.label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleRemoveCollaborator(collaborator.id)}>
                          Remove collaborator
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>)
  );
}