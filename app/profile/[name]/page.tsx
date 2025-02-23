import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage({ params }: { params: { name: string } }) {
  const name = params.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-white">
        <CardHeader>
          <Link href="/" className="text-blue-300 hover:text-blue-100 flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leaderboard
          </Link>
          <CardTitle className="text-2xl font-bold text-center text-blue-300">{name}&apos;s Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">Profile information for {name} goes here.</p>
          {/* Add more profile content here */}
        </CardContent>
      </Card>
    </div>
  )
}

