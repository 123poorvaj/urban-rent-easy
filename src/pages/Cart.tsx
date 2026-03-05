import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const { items, removeItem, updateTenure, totalMonthly, totalDeposit, itemCount } = useCart();
  const navigate = useNavigate();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-32 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h1 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Start adding items to rent</p>
          <Button className="mt-6" onClick={() => navigate("/products")}>Browse Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold">Your Cart</h1>
        <p className="mt-1 text-muted-foreground">{itemCount} item{itemCount > 1 ? "s" : ""}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => {
              const opt = item.product.tenureOptions.find((t) => t.months === item.tenure);
              const price = item.product.monthlyPrice * (1 - (opt?.discount || 0) / 100);
              return (
                <div key={item.product.id} className="flex gap-4 rounded-lg border bg-card p-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{Math.round(price).toLocaleString()}/mo · Deposit: ₹{item.product.deposit.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Tenure:</span>
                      {item.product.tenureOptions.map((t) => (
                        <button
                          key={t.months}
                          className={`rounded px-2 py-0.5 text-xs font-medium ${
                            item.tenure === t.months
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                          onClick={() => updateTenure(item.product.id, t.months)}
                        >
                          {t.months}M
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Rent</span>
                <span className="font-medium">₹{Math.round(totalMonthly).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Security Deposit</span>
                <span className="font-medium">₹{totalDeposit.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Due Today</span>
                  <span className="font-bold text-primary">
                    ₹{(Math.round(totalMonthly) + totalDeposit).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  (1st month rent + deposit)
                </p>
              </div>
            </div>
            <Button className="mt-6 w-full gap-2" size="lg" onClick={() => navigate("/checkout")}>
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
