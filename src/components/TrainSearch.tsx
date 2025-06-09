import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Calendar, Users, Clock, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AadhaarVerification from "./AadhaarVerification";

const TrainSearch = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
    bookingType: "regular"
  });

  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "male", idProof: "", idNumber: "" }
  ]);

  const [showAadhaarVerification, setShowAadhaarVerification] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  const handlePassengerCountChange = (count: string) => {
    const numPassengers = parseInt(count);
    const newPassengers = [...passengerDetails];
    
    if (numPassengers > passengerDetails.length) {
      for (let i = passengerDetails.length; i < numPassengers; i++) {
        newPassengers.push({ name: "", age: "", gender: "male", idProof: "", idNumber: "" });
      }
    } else {
      newPassengers.splice(numPassengers);
    }
    
    setPassengerDetails(newPassengers);
    setSearchData({...searchData, passengers: count});
  };

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const newPassengers = [...passengerDetails];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengerDetails(newPassengers);
  };

  const handleSearch = () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      alert("Please fill in all travel details");
      return;
    }

    const hasIncompletePassenger = passengerDetails.some(p => !p.name || !p.age || !p.idProof || !p.idNumber);
    if (hasIncompletePassenger) {
      alert("Please fill in all passenger details");
      return;
    }

    // Check if Tatkal booking requires Aadhaar verification
    if (searchData.bookingType === "tatkal" && !aadhaarVerified) {
      setShowAadhaarVerification(true);
      return;
    }

    console.log("Searching trains with:", { searchData, passengerDetails });
    navigate("/train-results", { state: { searchData, passengerDetails } });
  };

  const handleAadhaarVerificationSuccess = () => {
    setAadhaarVerified(true);
    setShowAadhaarVerification(false);
    // Proceed with search after verification
    navigate("/train-results", { state: { searchData, passengerDetails } });
  };

  return (
    <div className="relative -mt-10 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <CardContent className="p-8">
            {/* Travel Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    onChange={(e) => handlePassengerCountChange(e.target.value)}
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-md px-3 transition-colors appearance-none bg-white"
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                  </select>
                  <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Booking Type */}
            <div className="mb-8">
              <Label className="text-lg font-semibold text-gray-900 mb-4 block">Booking Type</Label>
              <RadioGroup value={searchData.bookingType} onValueChange={(value) => setSearchData({...searchData, bookingType: value})}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular">Regular Booking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tatkal" id="tatkal" />
                    <Label htmlFor="tatkal" className="text-orange-600 font-medium">Tatkal Booking</Label>
                  </div>
                </div>
              </RadioGroup>
              
              {searchData.bookingType === "tatkal" && (
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">Tatkal Booking Times:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span><strong>AC Classes:</strong> 10:00 AM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span><strong>Non-AC Classes:</strong> 11:00 AM</span>
                        </div>
                      </div>
                      <p className="text-xs text-orange-600">
                        * Aadhaar verification required for Tatkal bookings
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Passenger Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Passenger Details
              </h3>
              
              {passengerDetails.map((passenger, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-base">Passenger {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Full Name</Label>
                        <Input
                          id={`name-${index}`}
                          placeholder="Enter full name"
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`age-${index}`}>Age</Label>
                        <Input
                          id={`age-${index}`}
                          type="number"
                          placeholder="Age"
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`gender-${index}`}>Gender</Label>
                        <select
                          id={`gender-${index}`}
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                          className="w-full h-10 border border-gray-300 rounded-md px-3 bg-white"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`idProof-${index}`}>ID Proof Type</Label>
                        <select
                          id={`idProof-${index}`}
                          value={passenger.idProof}
                          onChange={(e) => handlePassengerChange(index, "idProof", e.target.value)}
                          className="w-full h-10 border border-gray-300 rounded-md px-3 bg-white"
                        >
                          <option value="">Select ID Proof</option>
                          <option value="aadhar">Aadhar Card</option>
                          <option value="pan">PAN Card</option>
                          <option value="passport">Passport</option>
                          <option value="driving-license">Driving License</option>
                          <option value="voter-id">Voter ID</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`idNumber-${index}`}>ID Number</Label>
                        <Input
                          id={`idNumber-${index}`}
                          placeholder="Enter ID number"
                          value={passenger.idNumber}
                          onChange={(e) => handlePassengerChange(index, "idNumber", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
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
      
      {/* Aadhaar Verification Modal */}
      {showAadhaarVerification && (
        <AadhaarVerification 
          onVerificationSuccess={handleAadhaarVerificationSuccess}
          onCancel={() => setShowAadhaarVerification(false)}
        />
      )}
    </div>
  );
};

export default TrainSearch;
