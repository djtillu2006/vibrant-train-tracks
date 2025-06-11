
import { useLocation, useParams } from "react-router-dom";
import { Download, Share, CheckCircle, Train, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

const ETicket = () => {
  const location = useLocation();
  const { trainId } = useParams();
  const { 
    selectedSeats = [], 
    totalPrice = 0, 
    bookingId = "TKT12345", 
    pnr = "PNR123456", 
    passengerDetails = [],
    searchData = {},
    selectedTrain = {},
    seatClass = ""
  } = location.state || {};

  // Use actual search data for journey details
  const journeyDetails = {
    trainName: selectedTrain.name || "Rajdhani Express",
    trainNumber: selectedTrain.number || "12001",
    from: searchData.from || "New Delhi (NDLS)",
    to: searchData.to || "Mumbai Central (BCT)",
    date: searchData.date || "15 Dec 2024",
    departure: selectedTrain.departure || "06:00",
    arrival: selectedTrain.arrival || "14:30",
    duration: selectedTrain.duration || "8h 30m",
    coach: "A1",
    class: getSeatClassName(seatClass)
  };

  function getSeatClassName(seatClass: string) {
    switch (seatClass) {
      case "1st-ac": return "1st AC";
      case "2nd-ac": return "2nd AC";
      case "3rd-ac": return "3rd AC";
      case "general": return "General";
      default: return "AC 2-Tier";
    }
  }

  // If no booking data, show default message
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Ticket Found</h1>
            <p className="text-gray-600">Please complete the booking process to view your e-ticket.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your train ticket has been booked successfully</p>
        </div>

        {/* E-Ticket */}
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Train className="h-6 w-6" />
                <span>E-Ticket</span>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">PNR</div>
                <div className="text-xl font-bold">{pnr}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">₹{Math.round(totalPrice * 1.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Type:</span>
                    <span className="font-medium">{searchData.bookingType === 'tatkal' ? 'Tatkal' : 'Regular'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Passenger Details</h3>
                <div className="space-y-2 text-sm">
                  {passengerDetails.length > 0 ? (
                    passengerDetails.map((passenger: any, index: number) => (
                      <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{passenger.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age/Gender:</span>
                          <span className="font-medium">{passenger.age}/{passenger.gender}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">John Doe</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">Male</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="border-t pt-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Journey Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Train className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{journeyDetails.trainName}</div>
                      <div className="text-sm text-gray-600">#{journeyDetails.trainNumber}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{journeyDetails.date}</div>
                      <div className="text-sm text-gray-600">Travel Date</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{journeyDetails.departure} - {journeyDetails.arrival}</div>
                      <div className="text-sm text-gray-600">Duration: {journeyDetails.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{journeyDetails.from}</div>
                      <div className="text-sm text-gray-600">to {journeyDetails.to}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Details */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-900 mb-4">Seat Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((seatId: string) => (
                    <div key={seatId} className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600 text-lg">{seatId}</div>
                      <div className="text-sm text-gray-600">{journeyDetails.class}</div>
                      <div className="text-sm text-gray-600">Coach {journeyDetails.coach}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-600 text-lg">1A</div>
                    <div className="text-sm text-gray-600">{journeyDetails.class}</div>
                    <div className="text-sm text-gray-600">Coach {journeyDetails.coach}</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download Ticket
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share Ticket
          </Button>
        </div>

        {/* Important Instructions */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Important Instructions</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Carry a valid photo ID proof during travel</li>
              <li>• Report at the station at least 30 minutes before departure</li>
              <li>• This ticket is non-transferable and non-refundable</li>
              <li>• For any queries, contact customer support</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ETicket;
