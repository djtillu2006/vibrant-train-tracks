
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CreditCard, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trainId } = useParams();
  const { selectedSeats, totalPrice } = location.state || { selectedSeats: [], totalPrice: 0 };

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      navigate(`/e-ticket/${trainId}`, { 
        state: { 
          selectedSeats, 
          totalPrice,
          bookingId: "TKT" + Date.now(),
          pnr: "PNR" + Math.random().toString().substr(2, 6)
        } 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Details</h1>
          <p className="text-gray-600">Complete your booking for Rajdhani Express</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                      <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">VISA</div>
                        <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center">MC</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1">UPI Payment</Label>
                      <div className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</div>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex-1">Net Banking</Label>
                      <div className="text-sm text-gray-500">All major banks</div>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
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
                    <h4 className="font-medium text-gray-900">Train Details</h4>
                    <p className="text-sm text-gray-600">Rajdhani Express (12001)</p>
                    <p className="text-sm text-gray-600">New Delhi → Mumbai</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Selected Seats</h4>
                    <div className="mt-2 space-y-1">
                      {selectedSeats.map((seatId: string) => (
                        <div key={seatId} className="flex justify-between text-sm">
                          <span>Seat {seatId}</span>
                          <span>₹1,250</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Base Fare</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes & Fees</span>
                      <span>₹{Math.round(totalPrice * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total Amount</span>
                      <span>₹{Math.round(totalPrice * 1.1).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Payment expires in 15:00 minutes</span>
                  </div>

                  <Button 
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    Pay ₹{Math.round(totalPrice * 1.1).toLocaleString()}
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

export default Payment;
