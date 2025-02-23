"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "@/components/dashboard"
import Leaderboard from "@/components/leaderboard"
import ActivityFeed from "@/components/activity-feed"

export default function AppLayout() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex flex-col items-center p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-blue-300 mb-6">TokenUp</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
        </TabsList>
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "activity" && <ActivityFeed />}
      </Tabs>
    </div>
  )
}

