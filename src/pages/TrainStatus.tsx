
import { useState } from "react";
import { Search, MapPin, Clock, Train, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";

interface Station {
  name: string;
  code: string;
  arrival: string;
  departure: string;
  distance: string;
  status: "completed" | "current" | "upcoming";
  delay?: number;
}

const TrainStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainData, setTrainData] = useState<any>(null);

  const sampleTrainData = {
    name: "Rajdhani Express",
    number: "12001",
    date: "15 Dec 2024",
    status: "Running On Time",
    currentStation: "Mathura Junction",
    nextStation: "Agra Cantt",
    delay: 0,
    stations: [
      {
        name: "New Delhi",
        code: "NDLS",
        arrival: "Source",
        departure: "06:00",
        distance: "0 km",
        status: "completed"
      },
      {
        name: "Mathura Junction",
        code: "MTJ",
        arrival: "07:45",
        departure: "07:47",
        distance: "145 km",
        status: "current"
      },
      {
        name: "Agra Cantt",
        code: "AGC",
        arrival: "08:30",
        departure: "08:32",
        distance: "200 km",
        status: "upcoming"
      },
      {
        name: "Jhansi Junction",
        code: "JHS",
        arrival: "10:15",
        departure: "10:20",
        distance: "415 km",
        status: "upcoming"
      },
      {
        name: "Bhopal Junction",
        code: "BPL",
        arrival: "12:30",
        departure: "12:35",
        distance: "680 km",
        status: "upcoming"
      },
      {
        name: "Mumbai Central",
        code: "BCT",
        arrival: "14:30",
        departure: "Destination",
        distance: "1384 km",
        status: "upcoming"
      }
    ] as Station[]
  };

  const handleSearch = () => {
    if (searchQuery) {
      setTrainData(sampleTrainData);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "current":
        return <div className="h-5 w-5 bg-blue-500 rounded-full animate-pulse" />;
      case "upcoming":
        return <Circle className="h-5 w-5 text-gray-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "current":
        return "text-blue-600 font-bold";
      case "upcoming":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Train Status</h1>
          <p className="text-gray-600">Track your train's live location and status</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter train number or PNR"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Search className="h-5 w-5 mr-2" />
                Track Train
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Train Status Results */}
        {trainData && (
          <div className="space-y-6">
            {/* Train Info */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Train className="h-6 w-6" />
                    <div>
                      <div>{trainData.name}</div>
                      <div className="text-sm opacity-90">#{trainData.number}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">{trainData.date}</div>
                    <div className="text-lg font-bold">{trainData.status}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Current Location</div>
                      <div className="text-sm text-gray-600">{trainData.currentStation}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Next Station</div>
                      <div className="text-sm text-gray-600">{trainData.nextStation}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Station Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Station Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {trainData.stations.map((station: Station, index: number) => (
                    <div key={station.code} className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(station.status)}
                        {index < trainData.stations.length - 1 && (
                          <div className={`w-0.5 h-8 mt-2 ${
                            station.status === "completed" ? "bg-green-500" : "bg-gray-300"
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
                        <div>
                          <div className={`font-medium ${getStatusColor(station.status)}`}>
                            {station.name}
                          </div>
                          <div className="text-sm text-gray-500">{station.code}</div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="text-gray-600">Arrival</div>
                          <div className={getStatusColor(station.status)}>{station.arrival}</div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="text-gray-600">Departure</div>
                          <div className={getStatusColor(station.status)}>{station.departure}</div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="text-gray-600">Distance</div>
                          <div className={getStatusColor(station.status)}>{station.distance}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainStatus;
