
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PassengerDetails from "./pages/PassengerDetails";
import TrainResults from "./pages/TrainResults";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import ETicket from "./pages/ETicket";
import TrainStatus from "./pages/TrainStatus";
import PNRStatus from "./pages/PNRStatus";
import Cancellation from "./pages/Cancellation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
          <Route path="/train-results" element={<TrainResults />} />
          <Route path="/seat-selection/:trainId" element={<SeatSelection />} />
          <Route path="/payment/:trainId" element={<Payment />} />
          <Route path="/e-ticket/:trainId" element={<ETicket />} />
          <Route path="/train-status" element={<TrainStatus />} />
          <Route path="/pnr-status" element={<PNRStatus />} />
          <Route path="/cancellation" element={<Cancellation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
