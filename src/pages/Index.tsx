
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Coins, Recycle, MapPin, QrCode, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { user, signOut } = useAuth();

  // Fetch user profile data
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Fetch recent recycling sessions
  const { data: recentSessions } = useQuery({
    queryKey: ['recent-sessions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('recycling_sessions')
        .select(`
          *,
          bins (name, location)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Fetch weekly recycling count
  const { data: weeklyCount } = useQuery({
    queryKey: ['weekly-count', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('recycling_sessions')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', oneWeekAgo.toISOString());
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: !!user?.id
  });

  // Fetch user rank (simplified - just count users with more points)
  const { data: userRank } = useQuery({
    queryKey: ['user-rank', profile?.total_points],
    queryFn: async () => {
      if (!profile?.total_points) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .gt('total_points', profile.total_points);
      
      if (error) throw error;
      return (data?.length || 0) + 1;
    },
    enabled: !!profile?.total_points
  });

  const handleSignOut = async () => {
    await signOut();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name}!` : '!'}</h1>
            <p className="opacity-90">Keep making a difference</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold">{profile?.total_points?.toLocaleString() || 0}</div>
              <div className="text-sm opacity-90">Points</div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              className="text-white hover:bg-white/20"
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/20 border-0 text-white">
            <CardContent className="p-4 text-center">
              <Recycle className="mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">{weeklyCount || 0}</div>
              <div className="text-xs opacity-90">This Week</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 border-0 text-white">
            <CardContent className="p-4 text-center">
              <Trophy className="mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">#{userRank || '--'}</div>
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
          {recentSessions && recentSessions.length > 0 ? (
            recentSessions.map((session: any) => (
              <Card key={session.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{session.bins?.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{session.waste_type}</p>
                      <p className="text-xs text-gray-500">{formatDate(session.created_at)}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      +{session.points_earned} points
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-4 text-center text-gray-500">
                <p>No recycling activity yet.</p>
                <p className="text-sm">Start recycling to see your activity here!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
