
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [seats] = useState<Seat[]>([
    // Row 1
    { id: "1A", number: "1A", type: "window", status: "available", price: 1250 },
    { id: "1B", number: "1B", type: "middle", status: "available", price: 1250 },
    { id: "1C", number: "1C", type: "aisle", status: "occupied", price: 1250 },
    { id: "1D", number: "1D", type: "aisle", status: "available", price: 1250 },
    { id: "1E", number: "1E", type: "middle", status: "available", price: 1250 },
    { id: "1F", number: "1F", type: "window", status: "available", price: 1250 },
    // Row 2
    { id: "2A", number: "2A", type: "window", status: "available", price: 1250 },
    { id: "2B", number: "2B", type: "middle", status: "occupied", price: 1250 },
    { id: "2C", number: "2C", type: "aisle", status: "available", price: 1250 },
    { id: "2D", number: "2D", type: "aisle", status: "available", price: 1250 },
    { id: "2E", number: "2E", type: "middle", status: "available", price: 1250 },
    { id: "2F", number: "2F", type: "window", status: "occupied", price: 1250 },
    // Row 3
    { id: "3A", number: "3A", type: "window", status: "available", price: 1250 },
    { id: "3B", number: "3B", type: "middle", status: "available", price: 1250 },
    { id: "3C", number: "3C", type: "aisle", status: "available", price: 1250 },
    { id: "3D", number: "3D", type: "aisle", status: "available", price: 1250 },
    { id: "3E", number: "3E", type: "middle", status: "available", price: 1250 },
    { id: "3F", number: "3F", type: "window", status: "available", price: 1250 },
  ]);

  const handleSeatClick = (seatId: string, status: string) => {
    if (status === "occupied") return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < 3) {
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
    return selectedSeats.length * 1250;
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length > 0) {
      navigate(`/payment/${trainId}`, { state: { selectedSeats, totalPrice: getTotalPrice() } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Seats</h1>
          <p className="text-gray-600">Rajdhani Express • Coach A1 • AC 2-Tier</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Coach Layout</CardTitle>
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
                    <h4 className="font-medium text-gray-900">Selected Seats</h4>
                    <div className="mt-2">
                      {selectedSeats.length > 0 ? (
                        <div className="space-y-1">
                          {selectedSeats.map((seatId) => (
                            <div key={seatId} className="flex justify-between text-sm">
                              <span>Seat {seatId}</span>
                              <span>₹1,250</span>
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
                  </div>

                  <Button 
                    onClick={handleConfirmSeats}
                    disabled={selectedSeats.length === 0}
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
