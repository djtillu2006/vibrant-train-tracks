
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { User, Plus, Trash2 } from "lucide-react";

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
  
  // If no search data, redirect to home
  if (!searchData) {
    navigate("/");
    return null;
  }

  const passengerCount = parseInt(searchData.passengers || "1");
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

    navigate("/train-results", {
      state: {
        searchData,
        passengerDetails: validPassengers
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Passenger Details</h1>
          <p className="text-gray-600">
            {searchData.from} → {searchData.to} • {searchData.date} • {searchData.passengers} Passenger{parseInt(searchData.passengers) > 1 ? 's' : ''}
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6 text-blue-600" />
              <span>Add Passengers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {passengers.map((passenger, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 animate-scale-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900">Passenger {index + 1}</h3>
                  {passengers.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePassenger(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Full Name *</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="Enter full name"
                      value={passenger.name}
                      onChange={(e) => updatePassenger(index, "name", e.target.value)}
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`age-${index}`}>Age *</Label>
                    <Input
                      id={`age-${index}`}
                      type="number"
                      placeholder="Enter age"
                      value={passenger.age}
                      onChange={(e) => updatePassenger(index, "age", e.target.value)}
                      min="1"
                      max="120"
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`gender-${index}`}>Gender *</Label>
                    <Select onValueChange={(value) => updatePassenger(index, "gender", value)}>
                      <SelectTrigger className="transition-all duration-200 focus:scale-105">
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
                    <Label htmlFor={`idProof-${index}`}>ID Proof *</Label>
                    <Input
                      id={`idProof-${index}`}
                      placeholder="Aadhaar/PAN/Passport"
                      value={passenger.idProof}
                      onChange={(e) => updatePassenger(index, "idProof", e.target.value)}
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={addPassenger}
              className="w-full border-dashed hover-scale"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Passenger
            </Button>
            
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Search
              </Button>
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Continue to Train Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PassengerDetails;
