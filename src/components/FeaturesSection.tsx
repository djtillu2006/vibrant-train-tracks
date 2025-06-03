
import { Shield, Clock, CreditCard, Phone, Zap, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Book your tickets in seconds with our lightning-fast booking system",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your transactions are protected with bank-level security",
    color: "from-green-400 to-blue-500"
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Get live updates on train schedules and platform changes",
    color: "from-blue-400 to-purple-500"
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    description: "Compare prices and get the best deals on train tickets",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs",
    color: "from-pink-400 to-red-500"
  },
  {
    icon: Award,
    title: "Trusted Platform",
    description: "Join millions of satisfied customers who travel with us",
    color: "from-indigo-400 to-cyan-500"
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose RailBooker?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of train travel booking with our innovative features and unmatched service quality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
