import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const TrainSearch = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1"
  });

  const handleSearch = () => {
    console.log("Searching trains with:", searchData);
    navigate("/train-results");
  };

  return (
    <div className="relative -mt-10 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">From</label>
                <div className="relative">
                  <Input
                    placeholder="Departure city"
                    value={searchData.from}
                    onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <div className="relative">
                  <Input
                    placeholder="Destination city"
                    value={searchData.to}
                    onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Passengers</label>
                <div className="relative">
                  <select
                    value={searchData.passengers}
                    onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-md px-3 transition-colors appearance-none bg-white"
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4+ Passengers</option>
                  </select>
                  <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-3 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Trains
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainSearch;
