
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { AlertTriangle, Search, Train, RefreshCw } from "lucide-react";

const Cancellation = () => {
  const [pnr, setPnr] = useState("");
  const [ticketData, setTicketData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const handlePNRCheck = () => {
    if (pnr.length !== 10) {
      alert("Please enter a valid 10-digit PNR number");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setTicketData({
        pnr: pnr,
        trainName: "Rajdhani Express",
        trainNumber: "12001",
        from: "New Delhi",
        to: "Mumbai Central",
        date: "15 Dec 2024",
        departure: "06:00",
        totalAmount: 4500,
        passengers: [
          { id: "1", name: "John Doe", age: 32, seat: "1A", refundAmount: 2250 },
          { id: "2", name: "Jane Doe", age: 28, seat: "2A", refundAmount: 2250 }
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  const handlePassengerSelection = (passengerId: string, checked: boolean) => {
    if (checked) {
      setSelectedPassengers([...selectedPassengers, passengerId]);
    } else {
      setSelectedPassengers(selectedPassengers.filter(id => id !== passengerId));
    }
  };

  const getTotalRefund = () => {
    if (!ticketData) return 0;
    return ticketData.passengers
      .filter((p: any) => selectedPassengers.includes(p.id))
      .reduce((total: number, p: any) => total + p.refundAmount, 0);
  };

  const handleCancellation = () => {
    if (selectedPassengers.length === 0) {
      alert("Please select at least one passenger to cancel");
      return;
    }
    if (!confirmCancel) {
      alert("Please confirm the cancellation by checking the confirmation box");
      return;
    }
    
    alert(`Cancellation successful! Refund of ₹${getTotalRefund().toLocaleString()} will be processed within 5-7 business days.`);
    setTicketData(null);
    setPnr("");
    setSelectedPassengers([]);
    setConfirmCancel(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancel Ticket</h1>
          <p className="text-gray-600">Cancel your train booking and get refund</p>
        </div>

        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6 text-blue-600" />
              <span>Enter PNR for Cancellation</span>
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
                {isLoading ? "Loading..." : "Get Ticket"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {ticketData && (
          <Card className="animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Ticket Cancellation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Train className="h-5 w-5 mr-2 text-blue-600" />
                  Journey Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Train</div>
                    <div className="font-medium">{ticketData.trainName}</div>
                    <div className="text-xs text-gray-500">#{ticketData.trainNumber}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Route</div>
                    <div className="font-medium">{ticketData.from}</div>
                    <div className="text-xs text-gray-500">to {ticketData.to}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Date</div>
                    <div className="font-medium">{ticketData.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Departure</div>
                    <div className="font-medium">{ticketData.departure}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Select Passengers to Cancel</h3>
                <div className="space-y-3">
                  {ticketData.passengers.map((passenger: any) => (
                    <div key={passenger.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedPassengers.includes(passenger.id)}
                          onCheckedChange={(checked) => handlePassengerSelection(passenger.id, checked === true)}
                        />
                        <div>
                          <div className="font-medium">{passenger.name}</div>
                          <div className="text-sm text-gray-600">Age: {passenger.age} | Seat: {passenger.seat}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          ₹{passenger.refundAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Refund Amount</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPassengers.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Cancellation Summary</h4>
                  <div className="flex justify-between items-center">
                    <span>Total Refund Amount:</span>
                    <span className="font-bold text-green-600 text-lg">
                      ₹{getTotalRefund().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-2">
                    * Refund will be processed to the original payment method within 5-7 business days
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2 mb-6">
                <Checkbox
                  checked={confirmCancel}
                  onCheckedChange={(checked) => setConfirmCancel(checked === true)}
                />
                <label className="text-sm text-gray-600">
                  I confirm that I want to cancel the selected tickets and understand the refund policy
                </label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTicketData(null)}>
                  Back
                </Button>
                <Button
                  onClick={handleCancellation}
                  disabled={selectedPassengers.length === 0 || !confirmCancel}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Cancel Selected Tickets
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cancellation;
