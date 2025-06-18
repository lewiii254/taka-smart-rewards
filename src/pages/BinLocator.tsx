
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const BinLocator = () => {
  const [selectedBin, setSelectedBin] = useState(null);
  
  const nearbyBins = [
    {
      id: 1,
      name: "Westlands Mall",
      distance: "0.2 km",
      status: "active",
      fillLevel: 30,
      types: ["Plastic", "Metal", "Paper"],
      coordinates: { lat: -1.2641, lng: 36.8078 }
    },
    {
      id: 2,
      name: "Sarit Centre",
      distance: "0.5 km",
      status: "full",
      fillLevel: 95,
      types: ["Plastic", "Paper"],
      coordinates: { lat: -1.2615, lng: 36.8047 }
    },
    {
      id: 3,
      name: "Village Market",
      distance: "0.8 km",
      status: "active",
      fillLevel: 45,
      types: ["Plastic", "Metal", "Paper", "Glass"],
      coordinates: { lat: -1.2505, lng: 36.8013 }
    },
    {
      id: 4,
      name: "Junction Mall",
      distance: "1.2 km",
      status: "maintenance",
      fillLevel: 60,
      types: ["Plastic"],
      coordinates: { lat: -1.2364, lng: 36.8847 }
    }
  ];

  const getStatusIcon = (status, fillLevel) => {
    if (status === "maintenance") return <AlertTriangle className="text-orange-500" size={16} />;
    if (fillLevel > 80) return <AlertTriangle className="text-red-500" size={16} />;
    return <CheckCircle className="text-green-500" size={16} />;
  };

  const getStatusColor = (status, fillLevel) => {
    if (status === "maintenance") return "bg-orange-100 text-orange-700";
    if (fillLevel > 80) return "bg-red-100 text-red-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-2xl font-bold">Find Smart Bins</h1>
        <p className="opacity-90">Locate nearby TakaSmart bins</p>
      </div>

      {/* Map Placeholder */}
      <div className="h-64 bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
          <div className="text-center">
            <MapPin className="mx-auto mb-2 text-green-600" size={48} />
            <p className="text-gray-600">Interactive Map</p>
            <p className="text-sm text-gray-500">Showing {nearbyBins.length} nearby bins</p>
          </div>
        </div>
        
        {/* Map pins simulation */}
        <div className="absolute top-16 left-12">
          <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
        <div className="absolute top-32 right-20">
          <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
        <div className="absolute bottom-20 left-20">
          <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      </div>

      {/* Bins List */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Nearby Bins ({nearbyBins.length})</h2>
        <div className="space-y-4">
          {nearbyBins.map((bin) => (
            <Card key={bin.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{bin.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin size={14} />
                      <span>{bin.distance} away</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(bin.status, bin.fillLevel)}
                    <Badge className={getStatusColor(bin.status, bin.fillLevel)}>
                      {bin.status === "maintenance" ? "Maintenance" :
                       bin.fillLevel > 80 ? "Nearly Full" : "Available"}
                    </Badge>
                  </div>
                </div>

                {/* Fill Level */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fill Level</span>
                    <span>{bin.fillLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        bin.fillLevel > 80 ? 'bg-red-500' : 
                        bin.fillLevel > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${bin.fillLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Accepted Waste Types */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Accepts:</p>
                  <div className="flex flex-wrap gap-2">
                    {bin.types.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full mt-3"
                  variant={bin.status === "maintenance" || bin.fillLevel > 90 ? "secondary" : "default"}
                  disabled={bin.status === "maintenance" || bin.fillLevel > 90}
                >
                  {bin.status === "maintenance" ? "Under Maintenance" :
                   bin.fillLevel > 90 ? "Bin Full" : "Get Directions"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default BinLocator;
