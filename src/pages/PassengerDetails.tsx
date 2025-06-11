
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import AadhaarVerification from "@/components/AadhaarVerification";
import { User, Plus, Trash2, Shield, Sparkles } from "lucide-react";

interface Passenger {
  name: string;
  age: string;
  gender: string;
  idProof: string;
}

const PassengerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchData } = location.state || {};
  const [showAadhaarVerification, setShowAadhaarVerification] = useState(false);
  
  // If no search data, redirect to home
  if (!searchData) {
    navigate("/");
    return null;
  }

  const passengerCount = parseInt(searchData.passengers || "1");
  const isTatkal = searchData.bookingType === "tatkal";
  
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengerCount }, () => ({ 
      name: "", 
      age: "", 
      gender: "", 
      idProof: "" 
    }))
  );

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "", idProof: "" }]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleContinue = () => {
    const validPassengers = passengers.filter(p => p.name && p.age && p.gender && p.idProof);
    if (validPassengers.length === 0) {
      alert("Please fill in at least one passenger's details completely.");
      return;
    }

    if (isTatkal) {
      setShowAadhaarVerification(true);
      return;
    }

    navigate("/train-results", {
      state: {
        searchData,
        passengerDetails: validPassengers
      }
    });
  };

  const handleAadhaarVerificationSuccess = () => {
    setShowAadhaarVerification(false);
    const validPassengers = passengers.filter(p => p.name && p.age && p.gender && p.idProof);
    navigate("/train-results", {
      state: {
        searchData,
        passengerDetails: validPassengers
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Passenger Details
            </h1>
            <Sparkles className="h-8 w-8 text-pink-600 animate-pulse" />
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg border border-white/20">
            <p className="text-gray-700 font-medium">
              {searchData.from} → {searchData.to} • {searchData.date} • {searchData.passengers} Passenger{parseInt(searchData.passengers) > 1 ? 's' : ''}
            </p>
          </div>
          {isTatkal && (
            <div className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
              <Shield className="h-5 w-5" />
              <span className="font-bold">TATKAL BOOKING</span>
            </div>
          )}
        </div>

        <Card className="animate-scale-in shadow-2xl bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <User className="h-6 w-6" />
              <span>Add Passengers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {passengers.map((passenger, index) => (
              <div key={index} className="border-2 border-transparent bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-6 animate-fade-in hover:shadow-xl transition-all duration-300 transform hover:scale-102" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span>Passenger {index + 1}</span>
                  </h3>
                  {passengers.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePassenger(index)}
                      className="text-red-600 hover:text-white hover:bg-red-500 border-red-300 hover:border-red-500 transition-all duration-200 transform hover:scale-105"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`} className="text-gray-700 font-medium">Full Name *</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="Enter full name"
                      value={passenger.name}
                      onChange={(e) => updatePassenger(index, "name", e.target.value)}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 border-gray-200 focus:border-blue-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`age-${index}`} className="text-gray-700 font-medium">Age *</Label>
                    <Input
                      id={`age-${index}`}
                      type="number"
                      placeholder="Enter age"
                      value={passenger.age}
                      onChange={(e) => updatePassenger(index, "age", e.target.value)}
                      min="1"
                      max="120"
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 border-gray-200 focus:border-purple-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`gender-${index}`} className="text-gray-700 font-medium">Gender *</Label>
                    <Select onValueChange={(value) => updatePassenger(index, "gender", value)}>
                      <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 border-gray-200 focus:border-pink-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`idProof-${index}`} className="text-gray-700 font-medium">ID Proof *</Label>
                    <Input
                      id={`idProof-${index}`}
                      placeholder="Aadhaar/PAN/Passport"
                      value={passenger.idProof}
                      onChange={(e) => updatePassenger(index, "idProof", e.target.value)}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg border-2 border-gray-200 focus:border-green-400"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={addPassenger}
              className="w-full border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 py-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Passenger
            </Button>
            
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => navigate("/")} className="hover:scale-105 transition-transform duration-200">
                Back to Search
              </Button>
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isTatkal ? "Verify & Continue" : "Continue to Train Selection"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAadhaarVerification && (
        <AadhaarVerification
          onVerificationSuccess={handleAadhaarVerificationSuccess}
          onCancel={() => setShowAadhaarVerification(false)}
        />
      )}
    </div>
  );
};

export default PassengerDetails;
