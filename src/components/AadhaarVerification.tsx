
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Shield, Upload } from "lucide-react";

interface AadhaarVerificationProps {
  onVerificationSuccess: () => void;
  onCancel: () => void;
}

const AadhaarVerification = ({ onVerificationSuccess, onCancel }: AadhaarVerificationProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendOtp = () => {
    if (aadhaarNumber.length === 12) {
      setOtpSent(true);
      // Simulate OTP sending
      console.log("OTP sent to registered mobile number");
    }
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        onVerificationSuccess();
      }, 1500);
    }, 2000);
  };

  if (isVerified) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Verification Successful!</h3>
          <p className="text-gray-600">Your Aadhaar has been verified successfully.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span>Aadhaar Verification</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Tatkal booking requires Aadhaar verification as per IRCTC guidelines
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!otpSent ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  maxLength={12}
                />
                <p className="text-xs text-gray-500">
                  OTP will be sent to your registered mobile number
                </p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Or upload E-Aadhaar PDF</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleSendOtp} 
                  disabled={aadhaarNumber.length !== 12}
                  className="flex-1"
                >
                  Send OTP
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  OTP sent to registered mobile number ending with ***{aadhaarNumber.slice(-2)}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleVerifyOtp} 
                  disabled={otp.length !== 6 || isVerifying}
                  className="flex-1"
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button variant="outline" onClick={() => setOtpSent(false)}>
                  Back
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AadhaarVerification;
