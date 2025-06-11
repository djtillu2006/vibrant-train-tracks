import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Clock, MapPin, Train, Users, Wifi, Coffee, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

interface TrainData {
  id: string;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  prices: {
    "1st-ac": number;
    "2nd-ac": number;
    "3rd-ac": number;
    "general": number;
  };
  availableSeats: {
    "1st-ac": number;
    "2nd-ac": number;
    "3rd-ac": number;
    "general": number;
  };
  amenities: string[];
  status: "On Time" | "Delayed" | "Running";
}

const TrainResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle case where state might be undefined
  const stateData = location.state || {};
  const searchData = stateData.searchData || { 
    from: "New Delhi", 
    to: "Mumbai", 
    passengers: "1",
    date: new Date().toISOString().split('T')[0],
    bookingType: "regular"
  };
  const passengerDetails = stateData.passengerDetails || [];

  console.log("TrainResults - location.state:", location.state);
  console.log("TrainResults - searchData:", searchData);

  // If no valid data, redirect to home
  if (!location.state || !location.state.searchData) {
    console.log("No search data found, redirecting to home");
    navigate("/");
    return null;
  }

  const [trains] = useState<TrainData[]>([
    {
      id: "1",
      name: "Rajdhani Express",
      number: "12001",
      departure: "06:00",
      arrival: "14:30",
      duration: "8h 30m",
      prices: {
        "1st-ac": 3500,
        "2nd-ac": 1250,
        "3rd-ac": 890,
        "general": 350
      },
      availableSeats: {
        "1st-ac": 10,
        "2nd-ac": 42,
        "3rd-ac": 65,
        "general": 120
      },
      amenities: ["WiFi", "AC", "Meals"],
      status: "On Time"
    },
    {
      id: "2",
      name: "Shatabdi Express",
      number: "12002",
      departure: "09:15",
      arrival: "16:45",
      duration: "7h 30m",
      prices: {
        "1st-ac": 3200,
        "2nd-ac": 890,
        "3rd-ac": 650,
        "general": 280
      },
      availableSeats: {
        "1st-ac": 8,
        "2nd-ac": 28,
        "3rd-ac": 45,
        "general": 95
      },
      amenities: ["WiFi", "AC", "Snacks"],
      status: "On Time"
    },
    {
      id: "3",
      name: "Duronto Express",
      number: "12259",
      departure: "14:20",
      arrival: "21:50",
      duration: "7h 30m",
      prices: {
        "1st-ac": 3000,
        "2nd-ac": 1100,
        "3rd-ac": 750,
        "general": 320
      },
      availableSeats: {
        "1st-ac": 5,
        "2nd-ac": 15,
        "3rd-ac": 35,
        "general": 80
      },
      amenities: ["AC", "Meals"],
      status: "Delayed"
    }
  ]);

  const handleSelectTrain = (trainId: string, seatClass: string) => {
    const selectedTrain = trains.find(t => t.id === trainId);
    navigate(`/seat-selection/${trainId}`, { 
      state: { 
        searchData, 
        passengerDetails, 
        selectedTrain,
        seatClass,
        price: selectedTrain?.prices[seatClass as keyof typeof selectedTrain.prices] || 0
      } 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time": return "text-green-600 bg-green-50";
      case "Delayed": return "text-red-600 bg-red-50";
      case "Running": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getSeatClassName = (seatClass: string) => {
    switch (seatClass) {
      case "1st-ac": return "1st AC";
      case "2nd-ac": return "2nd AC";
      case "3rd-ac": return "3rd AC";
      case "general": return "General";
      default: return seatClass;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Trains</h1>
          <p className="text-gray-600">
            {searchData.from} → {searchData.to} • {searchData.date} • {searchData.passengers} Passenger{parseInt(searchData.passengers) > 1 ? 's' : ''}
            {searchData.bookingType === 'tatkal' && <span className="text-orange-600 font-medium"> • Tatkal Booking</span>}
          </p>
        </div>

        <div className="space-y-6">
          {trains.map((train) => (
            <Card key={train.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Train Info and Timing */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Train Info */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Train className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{train.name}</h3>
                          <p className="text-sm text-gray-600">#{train.number}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(train.status)}`}>
                        {train.status}
                      </div>
                    </div>

                    {/* Timing */}
                    <div className="lg:col-span-6">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{train.departure}</div>
                          <div className="text-sm text-gray-600">{searchData.from}</div>
                        </div>
                        <div className="flex-1 px-4">
                          <div className="text-center mb-1">
                            <span className="text-sm text-gray-600">{train.duration}</span>
                          </div>
                          <div className="relative">
                            <div className="h-0.5 bg-gray-300"></div>
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{train.arrival}</div>
                          <div className="text-sm text-gray-600">{searchData.to}</div>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="lg:col-span-3">
                      <div className="flex space-x-2">
                        {train.amenities.map((amenity) => (
                          <span key={amenity} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                            {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                            {amenity === "Meals" && <Coffee className="h-3 w-3 mr-1" />}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Seat Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(train.prices).map(([seatClass, price]) => (
                      <div key={seatClass} className="border rounded-lg p-4 bg-gray-50">
                        <div className="text-center mb-3">
                          <h4 className="font-semibold text-gray-900">{getSeatClassName(seatClass)}</h4>
                          <div className="text-2xl font-bold text-blue-600">₹{price}</div>
                          <div className="text-sm text-gray-600">per person</div>
                        </div>
                        <div className="text-center mb-3">
                          <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{train.availableSeats[seatClass as keyof typeof train.availableSeats]} available</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleSelectTrain(train.id, seatClass)}
                          disabled={train.availableSeats[seatClass as keyof typeof train.availableSeats] === 0}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm"
                        >
                          Select
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainResults;
