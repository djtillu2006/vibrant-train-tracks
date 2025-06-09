
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

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
    if (selectedSeats.includes(seat.id)) return "bg-green-500 text-white border-green-500";
    if (seat.status === "occupied") return "bg-red-500 text-white border-red-500";
    return "bg-white text-gray-700 border-gray-300 hover:border-blue-500";
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Seats</h1>
          <p className="text-gray-600">
            {selectedTrain?.name} ({selectedTrain?.number}) • {getSeatClassName(seatClass)} • 
            {searchData?.from} → {searchData?.to}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Coach Layout - {getSeatClassName(seatClass)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Selected</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((row) => (
                    <div key={row} className="flex items-center space-x-2">
                      <span className="w-8 text-center font-medium text-gray-600">{row}</span>
                      <div className="flex space-x-1">
                        {seats
                          .filter(seat => seat.number.startsWith(row.toString()))
                          .slice(0, 3)
                          .map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id, seat.status)}
                              className={`w-12 h-12 border-2 rounded-lg font-medium text-sm transition-colors ${getSeatColor(seat)}`}
                              disabled={seat.status === "occupied"}
                            >
                              {seat.number}
                            </button>
                          ))}
                      </div>
                      <div className="w-8 border-l-2 border-gray-300 h-12 mx-4"></div>
                      <div className="flex space-x-1">
                        {seats
                          .filter(seat => seat.number.startsWith(row.toString()))
                          .slice(3, 6)
                          .map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id, seat.status)}
                              className={`w-12 h-12 border-2 rounded-lg font-medium text-sm transition-colors ${getSeatColor(seat)}`}
                              disabled={seat.status === "occupied"}
                            >
                              {seat.number}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Journey Details</h4>
                    <p className="text-sm text-gray-600">{searchData?.from} → {searchData?.to}</p>
                    <p className="text-sm text-gray-600">{searchData?.date}</p>
                    <p className="text-sm text-gray-600">{getSeatClassName(seatClass)}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Selected Seats</h4>
                    <div className="mt-2">
                      {selectedSeats.length > 0 ? (
                        <div className="space-y-1">
                          {selectedSeats.map((seatId) => (
                            <div key={seatId} className="flex justify-between text-sm">
                              <span>Seat {seatId}</span>
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
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Select {parseInt(searchData?.passengers || "1")} seat{parseInt(searchData?.passengers || "1") > 1 ? 's' : ''}
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
