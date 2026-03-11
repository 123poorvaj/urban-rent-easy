import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, CheckCircle2, CreditCard, Smartphone, Banknote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when items arrive" },
] as const;

const Checkout = () => {
  const { items, totalMonthly, totalDeposit, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "success">("details");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex flex-col items-center py-32 text-center">
          <h1 className="font-display text-2xl font-bold">Please sign in to checkout</h1>
          <Button className="mt-4" onClick={() => navigate("/login")}>Sign In</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0 && step !== "success") {
    navigate("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !city || !pincode || !deliveryDate || !paymentMethod) {
      toast.error("Please fill all fields and select a payment method");
      return;
    }
    clearCart();
    setStep("success");
    toast.success("Order placed successfully!");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex flex-col items-center py-32 text-center">
          <CheckCircle2 className="h-20 w-20 text-accent" />
          <h1 className="mt-6 font-display text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            Your rental items will be delivered on {deliveryDate}. You can track your order in the dashboard.
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => navigate("/products")}>Continue Browsing</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold">Checkout</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <MapPin className="h-5 w-5 text-primary" /> Delivery Address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/Flat No., Street" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai" />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="400001" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Calendar className="h-5 w-5 text-primary" /> Delivery Date
              </h2>
              <div className="mt-4">
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <CreditCard className="h-5 w-5 text-primary" /> Payment Method
              </h2>
              <div className="mt-4 grid gap-3">
                {paymentMethods.map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-colors ${
                      paymentMethod === pm.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={pm.id}
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                      className="sr-only"
                    />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <pm.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{pm.label}</p>
                      <p className="text-xs text-muted-foreground">{pm.desc}</p>
                    </div>
                    {paymentMethod === pm.id && (
                      <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
                    )}
                  </label>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <div className="mt-4">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input id="upi-id" placeholder="yourname@upi" />
                </div>
              )}
              {paymentMethod === "card" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" />
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              Place Order — ₹{(Math.round(totalMonthly) + totalDeposit).toLocaleString()}
            </Button>
          </form>

          {/* Summary */}
          <div className="rounded-lg border bg-card p-6 h-fit">
            <h2 className="font-display text-lg font-bold">Items ({items.length})</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{item.tenure} months</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly Rent</span><span>₹{Math.round(totalMonthly).toLocaleString()}</span></div>
              <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Deposit</span><span>₹{totalDeposit.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
