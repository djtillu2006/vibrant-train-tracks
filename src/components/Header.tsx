
import { Train, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Train className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RailBooker
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Book Tickets
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              PNR Status
            </a>
            <Link to="/train-status" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Train Status
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Help
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Sign Up
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
