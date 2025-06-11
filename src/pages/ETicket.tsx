
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message with Enhanced Animations */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 animate-bounce-soft shadow-lg">
            <CheckCircle className="h-10 w-10 text-white animate-scale-in" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Booking Confirmed!
          </h1>
          <div className="inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg text-gray-700 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              Your train ticket has been booked successfully
            </p>
          </div>
          
          {/* Animated confetti-like elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-float opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-32 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60" style={{ animationDelay: '0.7s' }}></div>
            <div className="absolute top-28 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60" style={{ animationDelay: '0.9s' }}></div>
          </div>
        </div>

        {/* E-Ticket with Enhanced Animations */}
        <Card className="mb-8 animate-scale-in shadow-2xl bg-white/90 backdrop-blur-sm border-0 overflow-hidden" style={{ animationDelay: '0.6s' }}>
          <CardHeader className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 animate-pulse"></div>
            <CardTitle className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-2">
                <Train className="h-6 w-6 animate-bounce-soft" />
                <span>E-Ticket</span>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">PNR</div>
                <div className="text-xl font-bold animate-glow">{pnr}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Booking Details with Staggered Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Booking Details</span>
                </h3>
                <div className="space-y-2 text-sm bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200/50">
                  <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-all duration-200">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{bookingId}</span>
                  </div>
                  <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-all duration-200">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Confirmed</span>
                    </span>
                  </div>
                  <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-all duration-200">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">₹{Math.round(totalPrice * 1.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-all duration-200">
                    <span className="text-gray-600">Booking Type:</span>
                    <span className="font-medium">{searchData.bookingType === 'tatkal' ? 'Tatkal' : 'Regular'}</span>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Passenger Details</span>
                </h3>
                <div className="space-y-2 text-sm bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200/50">
                  {passengerDetails.length > 0 ? (
                    passengerDetails.map((passenger: any, index: number) => (
                      <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0 hover:bg-white/50 p-2 rounded transition-all duration-200 animate-fade-in" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
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
                      <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-all duration-200">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">John Doe</span>
                      </div>
                      <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-all duration-200">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-all duration-200">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">Male</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Journey Details with Animation */}
            <div className="border-t pt-6 mb-6 animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Journey Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 hover:bg-white/50 p-3 rounded transition-all duration-200 hover-scale">
                    <Train className="h-5 w-5 text-blue-600 animate-bounce-soft" />
                    <div>
                      <div className="font-medium">{journeyDetails.trainName}</div>
                      <div className="text-sm text-gray-600">#{journeyDetails.trainNumber}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 hover:bg-white/50 p-3 rounded transition-all duration-200 hover-scale">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{journeyDetails.date}</div>
                      <div className="text-sm text-gray-600">Travel Date</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 hover:bg-white/50 p-3 rounded transition-all duration-200 hover-scale">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{journeyDetails.departure} - {journeyDetails.arrival}</div>
                      <div className="text-sm text-gray-600">Duration: {journeyDetails.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 hover:bg-white/50 p-3 rounded transition-all duration-200 hover-scale">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{journeyDetails.from}</div>
                      <div className="text-sm text-gray-600">to {journeyDetails.to}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Details with Animation */}
            <div className="border-t pt-6 animate-fade-in" style={{ animationDelay: '1.6s' }}>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span>Seat Details</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((seatId: string, index: number) => (
                    <div key={seatId} className="text-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-blue-200/50 hover-scale animate-fade-in shadow-lg" style={{ animationDelay: `${1.8 + index * 0.1}s` }}>
                      <div className="font-bold text-blue-600 text-lg animate-glow">{seatId}</div>
                      <div className="text-sm text-gray-600">{journeyDetails.class}</div>
                      <div className="text-sm text-gray-600">Coach {journeyDetails.coach}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border border-blue-200/50 hover-scale shadow-lg">
                    <div className="font-bold text-blue-600 text-lg animate-glow">1A</div>
                    <div className="text-sm text-gray-600">{journeyDetails.class}</div>
                    <div className="text-sm text-gray-600">Coach {journeyDetails.coach}</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons with Animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '2.0s' }}>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale shadow-lg">
            <Download className="h-4 w-4 mr-2" />
            Download Ticket
          </Button>
          <Button variant="outline" className="hover-scale border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50">
            <Share className="h-4 w-4 mr-2" />
            Share Ticket
          </Button>
        </div>

        {/* Important Instructions with Animation */}
        <Card className="mt-8 animate-fade-in shadow-lg bg-white/90 backdrop-blur-sm" style={{ animationDelay: '2.2s' }}>
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span>Important Instructions</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2 hover:bg-gray-50 p-2 rounded transition-all duration-200">
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                <span>Carry a valid photo ID proof during travel</span>
              </li>
              <li className="flex items-start space-x-2 hover:bg-gray-50 p-2 rounded transition-all duration-200">
                <div className="w-1 h-1 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                <span>Report at the station at least 30 minutes before departure</span>
              </li>
              <li className="flex items-start space-x-2 hover:bg-gray-50 p-2 rounded transition-all duration-200">
                <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
                <span>This ticket is non-transferable and non-refundable</span>
              </li>
              <li className="flex items-start space-x-2 hover:bg-gray-50 p-2 rounded transition-all duration-200">
                <div className="w-1 h-1 bg-pink-500 rounded-full mt-2 animate-pulse"></div>
                <span>For any queries, contact customer support</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ETicket;
