
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  price: number;
  availableSeats: number;
  amenities: string[];
  status: "On Time" | "Delayed" | "Running";
}

const TrainResults = () => {
  const navigate = useNavigate();
  const [trains] = useState<TrainData[]>([
    {
      id: "1",
      name: "Rajdhani Express",
      number: "12001",
      departure: "06:00",
      arrival: "14:30",
      duration: "8h 30m",
      price: 1250,
      availableSeats: 42,
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
      price: 890,
      availableSeats: 28,
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
      price: 1100,
      availableSeats: 15,
      amenities: ["AC", "Meals"],
      status: "Delayed"
    }
  ]);

  const handleSelectTrain = (trainId: string) => {
    navigate(`/seat-selection/${trainId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time": return "text-green-600 bg-green-50";
      case "Delayed": return "text-red-600 bg-red-50";
      case "Running": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Trains</h1>
          <p className="text-gray-600">New Delhi → Mumbai • Today • 3 Passengers</p>
        </div>

        <div className="space-y-6">
          {trains.map((train) => (
            <Card key={train.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
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
                  <div className="lg:col-span-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{train.departure}</div>
                        <div className="text-sm text-gray-600">New Delhi</div>
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
                        <div className="text-sm text-gray-600">Mumbai</div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities & Seats */}
                  <div className="lg:col-span-3">
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">{train.availableSeats} seats available</span>
                      </div>
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

                  {/* Price & Book */}
                  <div className="lg:col-span-2 text-right">
                    <div className="mb-3">
                      <div className="text-2xl font-bold text-gray-900">₹{train.price}</div>
                      <div className="text-sm text-gray-600">per person</div>
                    </div>
                    <Button 
                      onClick={() => handleSelectTrain(train.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Select Seats
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
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
