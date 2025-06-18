
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Camera, Upload, CheckCircle, Coins } from "lucide-react";
import { toast } from "sonner";

const ScanBin = () => {
  const [scanStep, setScanStep] = useState("scan"); // scan, photo, confirm, success
  const [scannedBin, setScannedBin] = useState(null);
  const [selectedWasteType, setSelectedWasteType] = useState("");
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const wasteTypes = [
    { type: "Plastic Bottles", points: 50, color: "bg-blue-100 text-blue-700" },
    { type: "Metal Cans", points: 30, color: "bg-gray-100 text-gray-700" },
    { type: "Paper", points: 20, color: "bg-green-100 text-green-700" },
    { type: "Glass", points: 40, color: "bg-purple-100 text-purple-700" },
  ];

  const handleScanBin = () => {
    // Simulate QR scan
    setTimeout(() => {
      setScannedBin({
        name: "Westlands Mall Bin #3",
        location: "Westlands Shopping Centre",
        id: "BIN001"
      });
      setScanStep("photo");
      toast.success("Bin scanned successfully!");
    }, 1500);
  };

  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
    setScanStep("confirm");
    toast.success("Photo uploaded!");
  };

  const handleConfirmRecycling = () => {
    const selectedWaste = wasteTypes.find(w => w.type === selectedWasteType);
    setScanStep("success");
    toast.success(`Great job! You earned ${selectedWaste?.points} points!`);
  };

  if (scanStep === "success") {
    const selectedWaste = wasteTypes.find(w => w.type === selectedWasteType);
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <Card className="mx-6 w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recycling Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for helping the environment</p>
            
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="text-green-600" size={20} />
                <span className="text-2xl font-bold text-green-600">+{selectedWaste?.points}</span>
              </div>
              <p className="text-sm text-gray-600">Points earned for {selectedWasteType}</p>
            </div>

            <Button 
              onClick={() => {
                setScanStep("scan");
                setScannedBin(null);
                setSelectedWasteType("");
                setPhotoUploaded(false);
              }}
              className="w-full"
            >
              Scan Another Bin
            </Button>
          </CardContent>
        </Card>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-2xl font-bold">Scan Smart Bin</h1>
        <p className="opacity-90">Scan QR code and upload photo</p>
      </div>

      <div className="p-6">
        {scanStep === "scan" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="text-green-600" size={24} />
                Scan Bin QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Scanner Placeholder */}
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="mx-auto mb-4 text-gray-400" size={64} />
                  <p className="text-gray-600">Position QR code in the frame</p>
                  <p className="text-sm text-gray-500 mt-2">Camera will scan automatically</p>
                </div>
              </div>

              <Button onClick={handleScanBin} className="w-full" size="lg">
                Simulate QR Scan
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Can't scan? Find the bin ID and enter manually
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {scanStep === "photo" && scannedBin && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="font-semibold">Bin Scanned</span>
                </div>
                <p className="text-sm text-gray-600">{scannedBin.name}</p>
                <p className="text-xs text-gray-500">{scannedBin.location}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="text-blue-600" size={24} />
                  Upload Waste Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  {photoUploaded ? (
                    <div className="text-center">
                      <CheckCircle className="mx-auto mb-2 text-green-600" size={32} />
                      <p className="text-green-600 font-medium">Photo uploaded</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-600">Take photo of your recyclables</p>
                    </div>
                  )}
                </div>

                {!photoUploaded && (
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={handlePhotoUpload} variant="outline" className="flex items-center gap-2">
                      <Camera size={16} />
                      Take Photo
                    </Button>
                    <Button onClick={handlePhotoUpload} variant="outline" className="flex items-center gap-2">
                      <Upload size={16} />
                      Upload
                    </Button>
                  </div>
                )}

                {photoUploaded && (
                  <Button onClick={() => setScanStep("confirm")} className="w-full">
                    Continue
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {scanStep === "confirm" && (
          <Card>
            <CardHeader>
              <CardTitle>Select Waste Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {wasteTypes.map((waste) => (
                  <button
                    key={waste.type}
                    onClick={() => setSelectedWasteType(waste.type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedWasteType === waste.type
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{waste.type}</span>
                      <Badge className={waste.color}>
                        +{waste.points} points
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>

              <Button 
                onClick={handleConfirmRecycling}
                disabled={!selectedWasteType}
                className="w-full"
                size="lg"
              >
                Confirm Recycling
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default ScanBin;
