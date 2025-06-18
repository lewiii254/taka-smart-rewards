
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Wifi, Gift, Clock } from "lucide-react";
import { toast } from "sonner";

const Rewards = () => {
  const userPoints = 2450;

  const airtimeRewards = [
    { amount: "Ksh 50", points: 500, provider: "Safaricom" },
    { amount: "Ksh 100", points: 950, provider: "Safaricom" },
    { amount: "Ksh 200", points: 1800, provider: "Safaricom" },
    { amount: "Ksh 50", points: 500, provider: "Airtel" },
    { amount: "Ksh 100", points: 950, provider: "Airtel" },
  ];

  const dataRewards = [
    { amount: "1GB", points: 800, provider: "Safaricom", validity: "7 days" },
    { amount: "2GB", points: 1500, provider: "Safaricom", validity: "14 days" },
    { amount: "5GB", points: 3500, provider: "Safaricom", validity: "30 days" },
    { amount: "1GB", points: 800, provider: "Airtel", validity: "7 days" },
  ];

  const discountRewards = [
    { title: "10% off EcoFriendly Store", points: 200, validity: "30 days", brand: "EcoKe" },
    { title: "Ksh 100 off Green Products", points: 400, validity: "14 days", brand: "Zuri Health" },
    { title: "Free delivery on orders", points: 300, validity: "7 days", brand: "Jumia" },
    { title: "20% off Organic Food", points: 600, validity: "30 days", brand: "Zucchini" },
  ];

  const recentRedemptions = [
    { date: "2 days ago", reward: "Ksh 50 Airtime", points: 500 },
    { date: "1 week ago", reward: "1GB Data Bundle", points: 800 },
    { date: "2 weeks ago", reward: "10% Discount Voucher", points: 200 },
  ];

  const handleRedeem = (rewardType, points, description) => {
    if (userPoints >= points) {
      toast.success(`Successfully redeemed ${description}!`);
    } else {
      toast.error(`Not enough points. You need ${points - userPoints} more points.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6">
        <h1 className="text-2xl font-bold">Rewards</h1>
        <div className="flex items-center gap-2 mt-2">
          <span>Available Points:</span>
          <Badge className="bg-white text-green-600 text-lg px-3 py-1">
            {userPoints.toLocaleString()}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="airtime" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="airtime" className="flex items-center gap-2">
              <Smartphone size={16} />
              Airtime
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Wifi size={16} />
              Data
            </TabsTrigger>
            <TabsTrigger value="discounts" className="flex items-center gap-2">
              <Gift size={16} />
              Discounts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="airtime" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {airtimeRewards.map((reward, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{reward.amount} Airtime</h3>
                        <p className="text-sm text-gray-600">{reward.provider}</p>
                        <Badge variant="outline" className="mt-1">
                          {reward.points} points
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleRedeem("airtime", reward.points, reward.amount)}
                        disabled={userPoints < reward.points}
                        variant={userPoints >= reward.points ? "default" : "secondary"}
                      >
                        {userPoints >= reward.points ? "Redeem" : "Not Enough Points"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {dataRewards.map((reward, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{reward.amount} Data</h3>
                        <p className="text-sm text-gray-600">{reward.provider}</p>
                        <p className="text-xs text-gray-500">Valid for {reward.validity}</p>
                        <Badge variant="outline" className="mt-1">
                          {reward.points} points
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleRedeem("data", reward.points, reward.amount)}
                        disabled={userPoints < reward.points}
                        variant={userPoints >= reward.points ? "default" : "secondary"}
                      >
                        {userPoints >= reward.points ? "Redeem" : "Not Enough Points"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discounts" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {discountRewards.map((reward, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{reward.title}</h3>
                        <p className="text-sm text-gray-600">{reward.brand}</p>
                        <p className="text-xs text-gray-500">Valid for {reward.validity}</p>
                        <Badge variant="outline" className="mt-1">
                          {reward.points} points
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleRedeem("discount", reward.points, reward.title)}
                        disabled={userPoints < reward.points}
                        variant={userPoints >= reward.points ? "default" : "secondary"}
                      >
                        {userPoints >= reward.points ? "Redeem" : "Not Enough Points"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Redemptions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Recent Redemptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRedemptions.map((redemption, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{redemption.reward}</p>
                    <p className="text-sm text-gray-600">{redemption.date}</p>
                  </div>
                  <Badge variant="secondary">
                    -{redemption.points} points
                  </Badge>
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

export default Rewards;
