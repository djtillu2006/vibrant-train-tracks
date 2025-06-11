
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Search, Train, Calendar, Clock, MapPin, Users } from "lucide-react";

const PNRStatus = () => {
  const [pnr, setPnr] = useState("");
  const [pnrData, setPnrData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePNRCheck = () => {
    if (pnr.length !== 10) {
      alert("Please enter a valid 10-digit PNR number");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPnrData({
        pnr: pnr,
        status: "Confirmed",
        trainName: "Rajdhani Express",
        trainNumber: "12001",
        from: "New Delhi",
        to: "Mumbai Central",
        date: "15 Dec 2024",
        departure: "06:00",
        arrival: "14:30",
        coach: "A1",
        seatNumbers: ["1A", "2A"],
        passengers: [
          { name: "John Doe", age: 32, status: "Confirmed" },
          { name: "Jane Doe", age: 28, status: "Confirmed" }
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PNR Status</h1>
          <p className="text-gray-600">Check your booking status and journey details</p>
        </div>

        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6 text-blue-600" />
              <span>Check PNR Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="pnr">PNR Number</Label>
                <Input
                  id="pnr"
                  placeholder="Enter 10-digit PNR number"
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  className="transition-all duration-200 focus:scale-105"
                />
              </div>
              <Button
                onClick={handlePNRCheck}
                disabled={pnr.length !== 10 || isLoading}
                className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Checking..." : "Check Status"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {pnrData && (
          <Card className="animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Train className="h-6 w-6" />
                  <span>Booking Details</span>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">PNR</div>
                  <div className="text-xl font-bold">{pnrData.pnr}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Journey Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Train className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{pnrData.trainName}</div>
                        <div className="text-sm text-gray-600">#{pnrData.trainNumber}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{pnrData.from} → {pnrData.to}</div>
                        <div className="text-sm text-gray-600">Route</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{pnrData.date}</div>
                        <div className="text-sm text-gray-600">Travel Date</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{pnrData.departure} - {pnrData.arrival}</div>
                        <div className="text-sm text-gray-600">Timing</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Booking Status</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-green-700 font-semibold">Status: {pnrData.status}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coach:</span>
                        <span className="font-medium">{pnrData.coach}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seats:</span>
                        <span className="font-medium">{pnrData.seatNumbers.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Passenger Details
                </h3>
                <div className="space-y-3">
                  {pnrData.passengers.map((passenger: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{passenger.name}</div>
                        <div className="text-sm text-gray-600">Age: {passenger.age}</div>
                      </div>
                      <div className="text-green-600 font-medium">{passenger.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PNRStatus;
