
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Phone, Mail, MapPin, Trophy, Recycle, Calendar, Settings } from "lucide-react";

const Profile = () => {
  const userProfile = {
    name: "John Mwangi",
    phone: "+254 712 345 678",
    email: "john.mwangi@example.com",
    location: "Westlands, Nairobi",
    joinDate: "January 2024",
    totalPoints: 8750,
    pointsThisMonth: 2450,
    totalRecycling: 156,
    rank: 7
  };

  const achievements = [
    { title: "Eco Warrior", description: "100+ recycling sessions", earned: true },
    { title: "Point Master", description: "5000+ points earned", earned: true },
    { title: "Green Champion", description: "50+ different locations", earned: true },
    { title: "Monthly Leader", description: "Top 10 this month", earned: true },
    { title: "Planet Saver", description: "1000+ items recycled", earned: false },
  ];

  const monthlyStats = [
    { month: "Dec 2024", points: 2450, recycling: 12, rank: 7 },
    { month: "Nov 2024", points: 1890, recycling: 9, rank: 12 },
    { month: "Oct 2024", points: 2100, recycling: 11, rank: 8 },
    { month: "Sep 2024", points: 2310, recycling: 13, rank: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Profile Info */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16 bg-white text-green-600">
            <AvatarFallback className="text-lg font-bold">JM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="opacity-90">Member since {userProfile.joinDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userProfile.totalPoints.toLocaleString()}</div>
            <div className="text-xs opacity-90">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userProfile.totalRecycling}</div>
            <div className="text-xs opacity-90">Recycling Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">#{userProfile.rank}</div>
            <div className="text-xs opacity-90">Current Rank</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-500" />
              <span>{userProfile.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-500" />
              <span>{userProfile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-500" />
              <span>{userProfile.location}</span>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Settings size={16} className="mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* This Month's Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              This Month's Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{userProfile.pointsThisMonth}</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Recycling Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy size={20} />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Trophy 
                      size={20} 
                      className={achievement.earned ? 'text-green-600' : 'text-gray-400'} 
                    />
                    <div>
                      <p className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-600'}`}>
                        {achievement.title}
                      </p>
                      <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={achievement.earned ? "default" : "secondary"}
                    className={achievement.earned ? "bg-green-600" : ""}
                  >
                    {achievement.earned ? "Earned" : "Locked"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle size={20} />
              Monthly History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{stat.month}</p>
                    <p className="text-sm text-gray-600">{stat.recycling} sessions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{stat.points} pts</p>
                    <p className="text-sm text-gray-600">Rank #{stat.rank}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
