
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Trophy, Heart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SocialFeed from "@/components/SocialFeed";
import AchievementBadges from "@/components/AchievementBadges";
import ImpactCalculator from "@/components/ImpactCalculator";
import Leaderboard from "@/components/Leaderboard";

const Community = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Community</h1>
              <p className="opacity-90">Connect with fellow eco-warriors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed" className="flex items-center gap-1">
              <Heart size={16} />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-1">
              <Trophy size={16} />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-1">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-1">
              <Users size={16} />
              <span className="hidden sm:inline">Rankings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <SocialFeed />
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <AchievementBadges />
          </TabsContent>

          <TabsContent value="impact" className="mt-6">
            <ImpactCalculator />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>

      <Navigation />
    </div>
  );
};

export default Community;
