import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Train, MapPin, Calendar, Users, CreditCard } from "lucide-react";

interface Seat {
  id: string;
  number: string;
  type: "window" | "middle" | "aisle";
  status: "available" | "occupied" | "selected";
  price: number;
}

const SeatSelection = () => {
  const navigate = useNavigate();
  const { trainId } = useParams();
  const location = useLocation();
  const { searchData, passengerDetails, selectedTrain, seatClass, price } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [seats] = useState<Seat[]>([
    // Row 1
    { id: "1A", number: "1A", type: "window", status: "available", price },
    { id: "1B", number: "1B", type: "middle", status: "available", price },
    { id: "1C", number: "1C", type: "aisle", status: "occupied", price },
    { id: "1D", number: "1D", type: "aisle", status: "available", price },
    { id: "1E", number: "1E", type: "middle", status: "available", price },
    { id: "1F", number: "1F", type: "window", status: "available", price },
    // Row 2
    { id: "2A", number: "2A", type: "window", status: "available", price },
    { id: "2B", number: "2B", type: "middle", status: "occupied", price },
    { id: "2C", number: "2C", type: "aisle", status: "available", price },
    { id: "2D", number: "2D", type: "aisle", status: "available", price },
    { id: "2E", number: "2E", type: "middle", status: "available", price },
    { id: "2F", number: "2F", type: "window", status: "occupied", price },
    // Row 3
    { id: "3A", number: "3A", type: "window", status: "available", price },
    { id: "3B", number: "3B", type: "middle", status: "available", price },
    { id: "3C", number: "3C", type: "aisle", status: "available", price },
    { id: "3D", number: "3D", type: "aisle", status: "available", price },
    { id: "3E", number: "3E", type: "middle", status: "available", price },
    { id: "3F", number: "3F", type: "window", status: "available", price },
    // Row 4
    { id: "4A", number: "4A", type: "window", status: "available", price },
    { id: "4B", number: "4B", type: "middle", status: "available", price },
    { id: "4C", number: "4C", type: "aisle", status: "available", price },
    { id: "4D", number: "4D", type: "aisle", status: "available", price },
    { id: "4E", number: "4E", type: "middle", status: "occupied", price },
    { id: "4F", number: "4F", type: "window", status: "available", price },
    // Row 5
    { id: "5A", number: "5A", type: "window", status: "available", price },
    { id: "5B", number: "5B", type: "middle", status: "available", price },
    { id: "5C", number: "5C", type: "aisle", status: "available", price },
    { id: "5D", number: "5D", type: "aisle", status: "available", price },
    { id: "5E", number: "5E", type: "middle", status: "available", price },
    { id: "5F", number: "5F", type: "window", status: "available", price },
  ]);

  const handleSeatClick = (seatId: string, status: string) => {
    if (status === "occupied") return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      const maxSeats = parseInt(searchData?.passengers || "1");
      if (selectedSeats.length < maxSeats) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) return "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-xl animate-pulse";
    if (seat.status === "occupied") return "bg-gradient-to-r from-red-400 to-red-600 text-white border-red-500 cursor-not-allowed opacity-75";
    return "bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border-gray-300 hover:from-blue-100 hover:to-purple-100 hover:border-blue-400 hover:shadow-lg cursor-pointer transform hover:scale-110 transition-all duration-200";
  };

  const getSeatIcon = (type: string) => {
    switch (type) {
      case "window": return "🪟";
      case "aisle": return "🚶";
      default: return "";
    }
  };

  const getTotalPrice = () => {
    return selectedSeats.length * price;
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

  const handleConfirmSeats = () => {
    if (selectedSeats.length > 0) {
      navigate(`/payment/${trainId}`, { 
        state: { 
          searchData,
          passengerDetails,
          selectedTrain,
          seatClass,
          selectedSeats, 
          totalPrice: getTotalPrice(),
          price
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Sparkles className="h-8 w-8 text-blue-600 animate-spin" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Select Your Seats
            </h1>
            <Sparkles className="h-8 w-8 text-purple-600 animate-spin" />
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block shadow-xl border border-white/30">
            <div className="flex items-center space-x-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <Train className="h-5 w-5 text-blue-600" />
                <span className="font-bold">{selectedTrain?.name} ({selectedTrain?.number})</span>
              </div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  {getSeatClassName(seatClass)}
                </Badge>
              </div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>{searchData?.from} → {searchData?.to}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="xl:col-span-3">
            <Card className="animate-scale-in shadow-2xl bg-white/90 backdrop-blur-sm border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-xl">
                  <span className="flex items-center space-x-2">
                    <Train className="h-6 w-6" />
                    <span>Coach Layout - {getSeatClassName(seatClass)}</span>
                  </span>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">Coach A1</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* Legend */}
                <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-2 border-blue-100">
                  <h4 className="font-bold mb-4 text-gray-800 flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <span>Seat Legend</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xs font-bold">A1</div>
                      <span className="font-medium">Available</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">A1</div>
                      <span className="font-medium">Occupied</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg flex items-center justify-center text-xs font-bold animate-pulse">A1</div>
                      <span className="font-medium">Selected</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">🪟</span>
                      <span className="font-medium">Window</span>
                    </div>
                  </div>
                </div>

                {/* Seat Layout */}
                <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 p-8 rounded-2xl border-4 border-blue-200 shadow-inner">
                  <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      ← Front of Train
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((row) => (
                      <div key={row} className="flex items-center justify-center space-x-3" style={{ animationDelay: `${row * 0.1}s` }}>
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {row}
                        </div>
                        
                        {/* Left side seats */}
                        <div className="flex space-x-2">
                          {seats
                            .filter(seat => seat.number.startsWith(row.toString()))
                            .slice(0, 3)
                            .map((seat) => (
                              <div key={seat.id} className="relative animate-fade-in">
                                <button
                                  onClick={() => handleSeatClick(seat.id, seat.status)}
                                  className={`w-14 h-14 border-2 rounded-xl font-bold text-sm ${getSeatColor(seat)}`}
                                  disabled={seat.status === "occupied"}
                                  title={`Seat ${seat.number} - ${seat.type}`}
                                >
                                  {seat.number.charAt(1)}
                                </button>
                                <div className="absolute -top-1 -right-1 text-lg">
                                  {getSeatIcon(seat.type)}
                                </div>
                              </div>
                            ))}
                        </div>
                        
                        {/* Aisle */}
                        <div className="w-16 border-l-4 border-r-4 border-blue-300 h-14 mx-6 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                          <span className="text-blue-600 text-xs font-bold">AISLE</span>
                        </div>
                        
                        {/* Right side seats */}
                        <div className="flex space-x-2">
                          {seats
                            .filter(seat => seat.number.startsWith(row.toString()))
                            .slice(3, 6)
                            .map((seat) => (
                              <div key={seat.id} className="relative animate-fade-in">
                                <button
                                  onClick={() => handleSeatClick(seat.id, seat.status)}
                                  className={`w-14 h-14 border-2 rounded-xl font-bold text-sm ${getSeatColor(seat)}`}
                                  disabled={seat.status === "occupied"}
                                  title={`Seat ${seat.number} - ${seat.type}`}
                                >
                                  {seat.number.charAt(1)}
                                </button>
                                <div className="absolute -top-1 -right-1 text-lg">
                                  {getSeatIcon(seat.type)}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <div className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                      Back of Train →
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="xl:col-span-1">
            <Card className="sticky top-8 animate-scale-in shadow-2xl bg-white/90 backdrop-blur-sm border-0" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>Journey Details</span>
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span>{searchData?.from} → {searchData?.to}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{searchData?.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Train className="h-4 w-4 text-purple-600" />
                        <span>{getSeatClassName(seatClass)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span>Selected Seats</span>
                    </h4>
                    <div className="mt-2">
                      {selectedSeats.length > 0 ? (
                        <div className="space-y-2">
                          {selectedSeats.map((seatId) => (
                            <div key={seatId} className="flex justify-between items-center text-sm bg-white px-3 py-2 rounded-lg shadow-sm animate-fade-in">
                              <span className="font-bold text-green-700">Seat {seatId}</span>
                              <span className="font-bold text-green-600">₹{price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm text-center py-4">No seats selected</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ₹{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-center bg-gray-50 p-2 rounded-lg">
                      {selectedSeats.length} of {parseInt(searchData?.passengers || "1")} seat{parseInt(searchData?.passengers || "1") > 1 ? 's' : ''} selected
                    </p>
                  </div>

                  <Button 
                    onClick={handleConfirmSeats}
                    disabled={selectedSeats.length !== parseInt(searchData?.passengers || "1")}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl py-3 text-lg font-bold"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
