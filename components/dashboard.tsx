"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image, Award, TrendingUp, BadgeIcon as Certificate, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { verifyCertificate } from "@/lib/certificate-verification"

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleFileUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadStatus({ type: null, message: "" })

    try {
      // Simulate certificate verification
      const result = await verifyCertificate(selectedFile)

      if (result.isValid) {
        setUploadStatus({
          type: "success",
          message: `Certificate verified! You earned ${result.tokenReward} tokens for your ${result.certificateType} certificate.`,
        })
      } else {
        setUploadStatus({
          type: "error",
          message: "Certificate verification failed. Please ensure you uploaded a valid certificate.",
        })
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "An error occurred during upload. Please try again.",
      })
    } finally {
      setIsUploading(false)
      setSelectedFile(null)
    }
  }

  return (
    <div className="grid gap-6">
      {/* Upload Section */}
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-300">Upload Certificate</CardTitle>
          <CardDescription className="text-gray-400">
            Upload your certificates to earn tokens. Supported formats: PDF, JPG, PNG
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
              id="certificate-upload"
            />
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                {selectedFile ? (
                  <p className="text-blue-300">{selectedFile.name}</p>
                ) : (
                  <p className="text-gray-400">Drag and drop your certificate here or click to browse</p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("certificate-upload")?.click()}
                className="text-blue-300 border-blue-300 hover:bg-blue-300/10"
              >
                <Image className="w-4 h-4 mr-2" />
                Select Certificate
              </Button>
            </div>
          </div>

          <Button
            onClick={handleFileUpload}
            disabled={!selectedFile || isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? "Verifying..." : "Upload & Verify Certificate"}
          </Button>

          {uploadStatus.type && (
            <Alert
              className={`${
                uploadStatus.type === "success" ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
              } border-0`}
            >
              <AlertTitle>{uploadStatus.type === "success" ? "Success!" : "Error"}</AlertTitle>
              <AlertDescription>{uploadStatus.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Statistics Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gray-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Tokens</CardTitle>
            <Award className="w-4 h-4 text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-300">38</div>
            <p className="text-xs text-gray-400">+3 tokens this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Certificates</CardTitle>
            <Certificate className="w-4 h-4 text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-300">5</div>
            <p className="text-xs text-gray-400">Across 3 platforms</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Ranking</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-300">#4</div>
            <p className="text-xs text-gray-400">Top 10%</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Certificates */}
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-300">Recent Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "NPTEL - Data Structures", date: "Feb 20, 2025", tokens: 3, progress: 100 },
              { name: "Coursera - Machine Learning", date: "Feb 15, 2025", tokens: 2, progress: 100 },
              { name: "edX - Web Development", date: "In Progress", tokens: 0, progress: 65 },
            ].map((cert, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-gray-400">{cert.date}</p>
                  </div>
                  {cert.tokens > 0 && (
                    <div className="flex items-center text-green-400">
                      <Award className="w-4 h-4 mr-1" />+{cert.tokens}
                    </div>
                  )}
                </div>
                <Progress value={cert.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

