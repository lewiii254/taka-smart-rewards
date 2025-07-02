
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, Trophy, Recycle, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

const SocialFeed = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Fetch recent recycling sessions from all users for social feed
  const { data: feedData = [] } = useQuery({
    queryKey: ['social-feed'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recycling_sessions')
        .select(`
          *,
          profiles!recycling_sessions_user_id_fkey (full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      
      // Generate mock social activities
      return data?.map(session => ({
        id: session.id,
        type: 'recycling',
        user: session.profiles?.full_name || 'Anonymous User',
        action: `recycled ${session.waste_type}`,
        points: session.points_earned,
        time: session.created_at,
        wasteType: session.waste_type,
        likes: Math.floor(Math.random() * 15) + 1,
        comments: Math.floor(Math.random() * 8),
      })) || [];
    }
  });

  // Generate some achievement posts
  const achievementPosts = [
    {
      id: 'ach-1',
      type: 'achievement',
      user: 'Sarah M.',
      action: 'unlocked "Eco Warrior" badge',
      badge: 'Eco Warrior',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 23,
      comments: 5,
    },
    {
      id: 'ach-2',
      type: 'milestone',
      user: 'John K.',
      action: 'reached 1000 points!',
      points: 1000,
      time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      likes: 18,
      comments: 3,
    }
  ];

  const allPosts = [...feedData, ...achievementPosts].sort((a, b) => 
    new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getPostIcon = (type, wasteType) => {
    if (type === 'achievement') return <Trophy className="w-5 h-5 text-yellow-600" />;
    if (type === 'milestone') return <Trophy className="w-5 h-5 text-purple-600" />;
    return <Recycle className="w-5 h-5 text-green-600" />;
  };

  const getWasteTypeColor = (wasteType) => {
    const colors = {
      plastic: 'bg-blue-100 text-blue-700',
      paper: 'bg-green-100 text-green-700',
      metal: 'bg-gray-100 text-gray-700',
      glass: 'bg-purple-100 text-purple-700',
      organic: 'bg-orange-100 text-orange-700'
    };
    return colors[wasteType] || 'bg-gray-100 text-gray-700';
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Community Feed
          </CardTitle>
          <p className="text-sm text-gray-600">
            See what the TakaSmart community is up to
          </p>
        </CardHeader>
      </Card>

      {allPosts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <Recycle className="mx-auto mb-4 text-gray-300" size={48} />
            <p>No community activity yet.</p>
            <p className="text-sm">Start recycling to see your activity here!</p>
          </CardContent>
        </Card>
      ) : (
        allPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {getInitials(post.user)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getPostIcon(post.type, post.wasteType)}
                    <span className="font-medium">{post.user}</span>
                    <span className="text-gray-600">{post.action}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {post.wasteType && (
                      <Badge className={getWasteTypeColor(post.wasteType)} variant="outline">
                        {post.wasteType}
                      </Badge>
                    )}
                    {post.badge && (
                      <Badge className="bg-yellow-100 text-yellow-700" variant="outline">
                        🏆 {post.badge}
                      </Badge>
                    )}
                    {post.points && (
                      <Badge className="bg-green-100 text-green-700" variant="outline">
                        +{post.points} points
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    {formatDistanceToNow(new Date(post.time), { addSuffix: true })}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 ${
                        likedPosts.has(post.id) 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <Heart 
                        size={16} 
                        className={likedPosts.has(post.id) ? 'fill-current' : ''} 
                      />
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                      <MessageCircle size={16} />
                      {post.comments}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                      <Share size={16} />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SocialFeed;
