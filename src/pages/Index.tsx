import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { 
  Recycle, 
  Trophy, 
  MapPin, 
  QrCode, 
  TrendingUp, 
  Calendar,
  Leaf,
  Globe,
  Route,
  Cloud
} from "lucide-react";
import EcoTips from "@/components/EcoTips";
import SustainabilityNews from "@/components/SustainabilityNews";
import WastePickupReminders from "@/components/WastePickupReminders";
import RouteOptimization from "@/components/RouteOptimization";
import WeatherIntegration from "@/components/WeatherIntegration";

const Index = () => {
  const { user } = useAuth();

  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery(
    ['profile'],
    async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw new Error(error.message);
      }
      return data;
    },
    {
      enabled: !!user?.id,
    }
  );

  const { data: recyclingSessions, isLoading: sessionsLoading, error: sessionsError } = useQuery(
    ['recyclingSessions'],
    async () => {
      const { data, error } = await supabase
        .from('recycling_sessions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching recycling sessions:", error);
        throw new Error(error.message);
      }
      return data;
    },
    {
      enabled: !!user?.id,
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="opacity-90">Ready to make a positive impact today?</p>
      </div>

      <div className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="eco-tips" className="text-xs">Eco Tips</TabsTrigger>
            <TabsTrigger value="smart" className="text-xs">Smart</TabsTrigger>
            <TabsTrigger value="news" className="text-xs">News</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{profile?.total_points || 0}</div>
                  <p className="text-gray-500 text-sm">Earned through recycling</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Recycling Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{recyclingSessions?.length || 0}</div>
                  <p className="text-gray-500 text-sm">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Rewards Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">3</div>
                  <p className="text-gray-500 text-sm">Unlock more rewards</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {sessionsLoading ? (
                  <p>Loading recycling sessions...</p>
                ) : sessionsError ? (
                  <p>Error: {sessionsError.message}</p>
                ) : (
                  <ul className="list-none space-y-2">
                    {recyclingSessions?.map((session) => (
                      <li key={session.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Recycle className="w-4 h-4 text-green-500" />
                          <span>Recycled {session.waste_type}</span>
                        </div>
                        <span className="text-sm text-gray-500">+{session.points_earned} points</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            
            {/* Add EcoTips to overview */}
            <EcoTips />
          </TabsContent>

          <TabsContent value="eco-tips" className="space-y-6">
            <EcoTips />
            <WeatherIntegration />
          </TabsContent>

          <TabsContent value="smart" className="space-y-6">
            <WastePickupReminders />
            <RouteOptimization />
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <SustainabilityNews />
          </TabsContent>
        </Tabs>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
