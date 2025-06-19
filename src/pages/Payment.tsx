import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CreditCard, Shield, Clock, QrCode } from "lucide-react";
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
  const { 
    searchData, 
    passengerDetails, 
    selectedTrain, 
    seatClass, 
    price 
  } = location.state || { 
    searchData: {}, 
    passengerDetails: [],
    selectedTrain: {},
    seatClass: "",
    price: 0
  };

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [upiId, setUpiId] = useState("");

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      navigate(`/seat-selection/${trainId}`, { 
        state: { 
          searchData,
          passengerDetails,
          selectedTrain,
          seatClass,
          price,
          paymentConfirmed: true
        } 
      });
    }, 2000);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Details</h1>
          <p className="text-gray-600">
            Complete your payment for {selectedTrain?.name} • {searchData?.from} → {searchData?.to}
          </p>
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

                {paymentMethod === "upi" && (
                  <div className="mt-6 space-y-6">
                    <div>
                      <Label htmlFor="upiId">UPI ID (Optional)</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-block p-4 bg-white border-2 border-gray-300 rounded-lg">
                        <QrCode className="h-32 w-32 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600 mt-2">Scan QR Code to Pay</p>
                        <p className="text-xs text-gray-500">₹{Math.round(price * 1.1).toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-4">
                        Use any UPI app to scan and pay
                      </p>
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
                    <p className="text-sm text-gray-600">{selectedTrain?.name} ({selectedTrain?.number})</p>
                    <p className="text-sm text-gray-600">{searchData?.from} → {searchData?.to}</p>
                    <p className="text-sm text-gray-600">{getSeatClassName(seatClass)}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Passengers</h4>
                    <div className="mt-2 space-y-1">
                      {passengerDetails?.map((passenger: any, index: number) => (
                        <div key={index} className="text-sm text-gray-600">
                          {passenger.name}, {passenger.age} years
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Base Fare (per seat)</span>
                      <span>₹{price?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Total ({searchData?.passengers} seat{parseInt(searchData?.passengers || "1") > 1 ? 's' : ''})</span>
                      <span>₹{(price * parseInt(searchData?.passengers || "1"))?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes & Fees</span>
                      <span>₹{Math.round(price * parseInt(searchData?.passengers || "1") * 0.1)?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total Amount</span>
                      <span>₹{Math.round(price * parseInt(searchData?.passengers || "1") * 1.1)?.toLocaleString()}</span>
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
                    Pay & Select Seats
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
