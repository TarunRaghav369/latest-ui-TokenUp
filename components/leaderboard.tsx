import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, ExternalLink } from "lucide-react"
import Link from "next/link"

const students = [
  { name: "Aarav Patel", tokens: 48 },
  { name: "Diya Sharma", tokens: 45 },
  { name: "Arjun Singh", tokens: 42 },
  { name: "Ananya Gupta", tokens: 39 },
  { name: "Vihaan Reddy", tokens: 36 },
  { name: "Ishaan Malhotra", tokens: 33 },
  { name: "Zara Khan", tokens: 30 },
  { name: "Advait Choudhury", tokens: 27 },
  { name: "Riya Kapoor", tokens: 24 },
  { name: "Kabir Joshi", tokens: 21 },
]

export default function Leaderboard() {
  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-300">Student Token Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-300">Rank</TableHead>
              <TableHead className="text-blue-300">Name</TableHead>
              <TableHead className="text-right text-blue-300">Tokens</TableHead>
              <TableHead className="text-right text-blue-300">Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index} className={index < 3 ? "font-medium" : ""}>
                <TableCell className="flex items-center">
                  {index < 3 ? (
                    <Trophy
                      className={`mr-2 h-5 w-5 ${index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : "text-yellow-700"}`}
                    />
                  ) : null}
                  {index + 1}
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell className="text-right">{student.tokens}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/profile/${student.name.toLowerCase().replace(" ", "-")}`}
                    className="text-blue-300 hover:text-blue-100 flex items-center justify-end"
                  >
                    Profile
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

