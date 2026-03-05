import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Login = () => {
  const { login, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (!email) { toast.error("Enter your email"); return; }
    if (mode === "register" && !name) { toast.error("Enter your name"); return; }
    setOtpSent(true);
    toast.success("OTP sent to " + email + " (use 1234)");
  };

  const handleVerify = () => {
    if (otp !== "1234") { toast.error("Invalid OTP. Try 1234"); return; }
    login(email, name);
    toast.success("Welcome!");
    navigate("/");
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Navbar />
      <div className="container flex items-center justify-center py-20">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-elevated">
          <div className="mb-6 flex flex-col items-center">
            <img src={logo} alt="UrbanRentals" className="h-14 w-14" />
            <h1 className="mt-3 font-display text-2xl font-bold">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login" ? "Sign in to manage your rentals" : "Start renting premium furniture"}
            </p>
          </div>

          <div className="space-y-4">
            {mode === "register" && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            </div>

            {otpSent && (
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="1234" maxLength={4} />
              </div>
            )}

            {!otpSent ? (
              <Button className="w-full" onClick={handleSendOtp}>Send OTP</Button>
            ) : (
              <Button className="w-full" onClick={handleVerify}>Verify & {mode === "login" ? "Sign In" : "Register"}</Button>
            )}

            <div className="text-center text-sm">
              {mode === "login" ? (
                <p className="text-muted-foreground">
                  New here?{" "}
                  <button className="font-medium text-primary hover:underline" onClick={() => { setMode("register"); setOtpSent(false); }}>
                    Create account
                  </button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button className="font-medium text-primary hover:underline" onClick={() => { setMode("login"); setOtpSent(false); }}>
                    Sign in
                  </button>
                </p>
              )}
            </div>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => { loginAsAdmin(); toast.success("Logged in as Admin"); navigate("/admin"); }}>
              Demo: Login as Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
