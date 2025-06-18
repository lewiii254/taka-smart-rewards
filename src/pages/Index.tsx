
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Coins, Recycle, MapPin, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [userPoints, setUserPoints] = useState(2450);
  const [weeklyRecycling, setWeeklyRecycling] = useState(12);
  const [userRank, setUserRank] = useState(7);

  const recentActivity = [
    { date: "Today", location: "Westlands Mall", type: "Plastic Bottles", points: 50 },
    { date: "Yesterday", location: "Sarit Centre", type: "Metal Cans", points: 30 },
    { date: "2 days ago", location: "Village Market", type: "Paper", points: 20 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="opacity-90">Keep making a difference</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userPoints.toLocaleString()}</div>
            <div className="text-sm opacity-90">Points</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/20 border-0 text-white">
            <CardContent className="p-4 text-center">
              <Recycle className="mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">{weeklyRecycling}</div>
              <div className="text-xs opacity-90">This Week</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 border-0 text-white">
            <CardContent className="p-4 text-center">
              <Trophy className="mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">#{userRank}</div>
              <div className="text-xs opacity-90">Leaderboard</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/locate">
            <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200 h-20 flex flex-col gap-2">
              <MapPin size={24} />
              <span>Find Bins</span>
            </Button>
          </Link>
          
          <Link to="/scan">
            <Button className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 h-20 flex flex-col gap-2">
              <QrCode size={24} />
              <span>Scan Bin</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{activity.location}</p>
                    <p className="text-sm text-gray-600">{activity.type}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    +{activity.points} points
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
