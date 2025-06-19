import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Train, Users, Clock, Euro, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Header from "@/components/Header";

interface TrainResult {
  id: string;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  seats: {
    "1st-ac": number;
    "2nd-ac": number;
    "3rd-ac": number;
    sleeper: number;
    general: number;
  };
}

const trainData: TrainResult[] = [
  {
    id: "1",
    name: "Rajdhani Express",
    number: "12345",
    departure: "06:00",
    arrival: "14:00",
    duration: "8h",
    seats: {
      "1st-ac": 10,
      "2nd-ac": 20,
      "3rd-ac": 30,
      sleeper: 50,
      general: 100,
    },
  },
  {
    id: "2",
    name: "Shatabdi Express",
    number: "23456",
    departure: "08:00",
    arrival: "15:00",
    duration: "7h",
    seats: {
      "1st-ac": 5,
      "2nd-ac": 15,
      "3rd-ac": 25,
      sleeper: 40,
      general: 80,
    },
  },
  {
    id: "3",
    name: "Duronto Express",
    number: "34567",
    departure: "10:00",
    arrival: "18:00",
    duration: "8h",
    seats: {
      "1st-ac": 8,
      "2nd-ac": 18,
      "3rd-ac": 28,
      sleeper: 45,
      general: 90,
    },
  },
];

const seatClassPrices = {
  "1st-ac": 3000,
  "2nd-ac": 2000,
  "3rd-ac": 1500,
  sleeper: 1000,
  general: 500,
};

const TrainResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchData, passengerDetails } = location.state || {
    searchData: {
      from: "",
      to: "",
      date: new Date(),
      passengers: "1",
    },
    passengerDetails: [],
  };

  const [selectedTrain, setSelectedTrain] = useState<TrainResult | null>(null);
  const [selectedSeatClass, setSelectedSeatClass] = useState<string | null>(null);
  const [isSeatClassOpen, setIsSeatClassOpen] = useState(false);

  const seatClasses = [
    { value: "1st-ac", label: "1st AC" },
    { value: "2nd-ac", label: "2nd AC" },
    { value: "3rd-ac", label: "3rd AC" },
    { value: "sleeper", label: "Sleeper" },
    { value: "general", label: "General" },
  ];

  const handleBookTrain = (train: any, seatClass: string, price: number) => {
    navigate(`/payment/${train.id}`, { 
      state: { 
        searchData,
        passengerDetails,
        selectedTrain: train,
        seatClass,
        price
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Trains
          </h1>
          <p className="text-gray-600">
            {searchData?.from} → {searchData?.to} • {format(new Date(searchData?.date), 'PPP')} • {searchData?.passengers} Passengers
          </p>
        </div>

        {trainData.map((train) => (
          <Card key={train.id} className="mb-4">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {train.name} ({train.number})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Departure</p>
                  <p className="text-lg">{train.departure}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Arrival</p>
                  <p className="text-lg">{train.arrival}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-lg">{train.duration}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Available Seats</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {Object.entries(train.seats).map(([seatClass, count]) => (
                    <div key={seatClass} className="flex items-center space-x-2">
                      <span className="capitalize">{seatClass.replace("-", " ")}:</span>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Popover open={isSeatClassOpen} onOpenChange={setIsSeatClassOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isSeatClassOpen}
                      className="w-[200px] justify-between"
                    >
                      {selectedSeatClass
                        ? seatClasses.find((seatClass) => seatClass.value === selectedSeatClass)?.label
                        : "Select Seat Class"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No seat class found.</CommandEmpty>
                        <CommandGroup>
                          {seatClasses.map((seatClass) => (
                            <CommandItem
                              key={seatClass.value}
                              value={seatClass.value}
                              onSelect={() => {
                                setSelectedSeatClass(seatClass.value);
                                setIsSeatClassOpen(false);
                              }}
                            >
                              {seatClass.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={() => handleBookTrain(train, selectedSeatClass || "general", seatClassPrices[selectedSeatClass || "general"])}
                  className="ml-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  disabled={!selectedSeatClass}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainResults;
