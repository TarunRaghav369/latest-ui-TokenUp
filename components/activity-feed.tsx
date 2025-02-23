"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Award, ThumbsUp, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  id: number
  user: string
  avatar: string
  content: string
  certificate?: string
  certificateType?: string
  tokens?: number
  likes: number
  comments: number
  shares: number
  timestamp: string
}

const certificateImages = [
  "/placeholder.svg?height=300&width=400&text=NPTEL+Certificate",
  "/placeholder.svg?height=300&width=400&text=Coursera+Certificate",
  "/placeholder.svg?height=300&width=400&text=edX+Certificate",
  "/placeholder.svg?height=300&width=400&text=Udacity+Nanodegree",
  "/placeholder.svg?height=300&width=400&text=Google+Certification",
]

export default function ActivityFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Aarav Patel",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-23%20at%207.56.46%E2%80%AFAM-f7beEy26aPoDC0TGA3cyZlm2keSZdH.png",
      content:
        "Just completed my NPTEL course in Data Structures! 🎉 The algorithms section was challenging but incredibly rewarding. Can't wait to apply these concepts in real-world projects. #NPTELCertified #DataStructures",
      certificate: certificateImages[0],
      certificateType: "NPTEL",
      tokens: 3,
      likes: 24,
      comments: 5,
      shares: 2,
      timestamp: "2h ago",
    },
    {
      id: 2,
      user: "Diya Sharma",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-23%20at%207.56.46%E2%80%AFAM-f7beEy26aPoDC0TGA3cyZlm2keSZdH.png",
      content:
        "Excited to share my Coursera certification in Machine Learning! 🤖 The course by Andrew Ng was intense but so worth it. Looking forward to exploring more in AI and Deep Learning. #MachineLearning #CourseraCertified",
      certificate: certificateImages[1],
      certificateType: "Coursera",
      tokens: 2,
      likes: 18,
      comments: 3,
      shares: 1,
      timestamp: "4h ago",
    },
    {
      id: 3,
      user: "Arjun Singh",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-23%20at%207.56.46%E2%80%AFAM-f7beEy26aPoDC0TGA3cyZlm2keSZdH.png",
      content:
        "Just earned my Google Cloud Architect certification! ☁️ The journey was challenging but it's opened up so many new possibilities. Excited to leverage these skills in upcoming projects. #GoogleCloudCertified #CloudComputing",
      certificate: certificateImages[4],
      certificateType: "Google",
      tokens: 4,
      likes: 32,
      comments: 7,
      shares: 5,
      timestamp: "1d ago",
    },
  ])

  const [newPost, setNewPost] = useState("")

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newPostObj: Post = {
      id: posts.length + 1,
      user: "Current User",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-23%20at%207.56.46%E2%80%AFAM-f7beEy26aPoDC0TGA3cyZlm2keSZdH.png",
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-300">Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-23%20at%207.56.46%E2%80%AFAM-f7beEy26aPoDC0TGA3cyZlm2keSZdH.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts or achievements..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px] bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-blue-300 border-blue-300 hover:bg-blue-300/10"
                >
                  📷 Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-blue-300 border-blue-300 hover:bg-blue-300/10"
                >
                  🏆 Achievement
                </Button>
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post.id} className="bg-gray-800 text-white">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post.user}</h3>
                  <p className="text-sm text-gray-400">{post.timestamp}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-700 text-white border-gray-600">
                  <DropdownMenuItem>Save Post</DropdownMenuItem>
                  <DropdownMenuItem>Hide Post</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="mb-4">{post.content}</p>
            {post.certificate && (
              <div className="mb-4 relative">
                <img src={post.certificate || "/placeholder.svg"} alt="Certificate" className="w-full rounded-lg" />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-sm">
                  <Award className="w-4 h-4 mr-1" />+{post.tokens} Tokens
                </div>
              </div>
            )}
            {post.tokens && (
              <div className="mb-4 bg-blue-900/30 text-blue-300 p-3 rounded-md flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>Congratulations! This achievement earned you {post.tokens} tokens. Keep up the great work!</span>
              </div>
            )}
            <div className="flex items-center justify-between text-gray-400">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-gray-400 hover:text-blue-300">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-blue-300">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-blue-300">
                  <Share2 className="w-4 h-4 mr-1" />
                  {post.shares}
                </Button>
              </div>
              <Button variant="ghost" className="text-gray-400 hover:text-blue-300">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
            <Separator className="my-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-23%20at%207.56.46%E2%80%AFAM-f7beEy26aPoDC0TGA3cyZlm2keSZdH.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

