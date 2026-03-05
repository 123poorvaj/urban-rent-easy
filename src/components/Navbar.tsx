import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="UrbanRentals" className="h-9 w-9" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Urban<span className="text-gradient">Rentals</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Browse
          </Link>
          <Link to="/products?category=furniture" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Furniture
          </Link>
          <Link to="/products?category=appliances" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Appliances
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              {user?.isAdmin && (
                <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                  <LayoutDashboard className="mr-1 h-4 w-4" /> Admin
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                <User className="mr-1 h-4 w-4" /> {user?.name}
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/products" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Browse All</Link>
            <Link to="/products?category=furniture" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Furniture</Link>
            <Link to="/products?category=appliances" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Appliances</Link>
            <Link to="/cart" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Cart ({itemCount})</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                {user?.isAdmin && <Link to="/admin" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Admin</Link>}
                <button className="text-left text-sm font-medium text-destructive" onClick={() => { logout(); setMobileOpen(false); }}>Sign Out</button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
