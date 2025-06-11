
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";

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
    if (selectedSeats.includes(seat.id)) return "bg-green-500 text-white border-green-500 shadow-lg";
    if (seat.status === "occupied") return "bg-red-500 text-white border-red-500 cursor-not-allowed";
    return "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer";
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Seats</h1>
          <p className="text-gray-600">
            {selectedTrain?.name} ({selectedTrain?.number}) • {getSeatClassName(seatClass)} • 
            {searchData?.from} → {searchData?.to}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Coach Layout - {getSeatClassName(seatClass)}</span>
                  <Badge variant="outline">Coach A1</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Seat Legend</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded flex items-center justify-center text-xs">A1</div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center text-xs">A1</div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center text-xs">A1</div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🪟</span>
                      <span>Window</span>
                    </div>
                  </div>
                </div>

                {/* Seat Layout */}
                <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg border-2 border-blue-100">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      ← Front of Train
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((row) => (
                      <div key={row} className="flex items-center justify-center space-x-2">
                        <span className="w-8 text-center font-bold text-blue-600 text-lg">{row}</span>
                        
                        {/* Left side seats */}
                        <div className="flex space-x-1">
                          {seats
                            .filter(seat => seat.number.startsWith(row.toString()))
                            .slice(0, 3)
                            .map((seat) => (
                              <div key={seat.id} className="relative">
                                <button
                                  onClick={() => handleSeatClick(seat.id, seat.status)}
                                  className={`w-12 h-12 border-2 rounded-lg font-bold text-sm transition-all duration-200 transform hover:scale-105 ${getSeatColor(seat)}`}
                                  disabled={seat.status === "occupied"}
                                  title={`Seat ${seat.number} - ${seat.type}`}
                                >
                                  {seat.number.charAt(1)}
                                </button>
                                <div className="absolute -top-1 -right-1 text-xs">
                                  {getSeatIcon(seat.type)}
                                </div>
                              </div>
                            ))}
                        </div>
                        
                        {/* Aisle */}
                        <div className="w-12 border-l-4 border-r-4 border-blue-200 h-12 mx-4 flex items-center justify-center">
                          <span className="text-blue-400 text-xs font-medium">AISLE</span>
                        </div>
                        
                        {/* Right side seats */}
                        <div className="flex space-x-1">
                          {seats
                            .filter(seat => seat.number.startsWith(row.toString()))
                            .slice(3, 6)
                            .map((seat) => (
                              <div key={seat.id} className="relative">
                                <button
                                  onClick={() => handleSeatClick(seat.id, seat.status)}
                                  className={`w-12 h-12 border-2 rounded-lg font-bold text-sm transition-all duration-200 transform hover:scale-105 ${getSeatColor(seat)}`}
                                  disabled={seat.status === "occupied"}
                                  title={`Seat ${seat.number} - ${seat.type}`}
                                >
                                  {seat.number.charAt(1)}
                                </button>
                                <div className="absolute -top-1 -right-1 text-xs">
                                  {getSeatIcon(seat.type)}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-6">
                    <div className="inline-block bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Back of Train →
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="xl:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Journey Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{searchData?.from} → {searchData?.to}</p>
                      <p>{searchData?.date}</p>
                      <p>{getSeatClassName(seatClass)}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Selected Seats</h4>
                    <div className="mt-2">
                      {selectedSeats.length > 0 ? (
                        <div className="space-y-2">
                          {selectedSeats.map((seatId) => (
                            <div key={seatId} className="flex justify-between items-center text-sm bg-green-50 px-3 py-2 rounded">
                              <span className="font-medium">Seat {seatId}</span>
                              <span>₹{price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No seats selected</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-xl text-green-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedSeats.length} of {parseInt(searchData?.passengers || "1")} seat{parseInt(searchData?.passengers || "1") > 1 ? 's' : ''} selected
                    </p>
                  </div>

                  <Button 
                    onClick={handleConfirmSeats}
                    disabled={selectedSeats.length !== parseInt(searchData?.passengers || "1")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
