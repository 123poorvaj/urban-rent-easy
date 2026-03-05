import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-display text-lg font-bold">UrbanRentals</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Premium furniture & appliance rentals for modern urban living.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Categories</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/products?category=furniture" className="hover:text-foreground">Furniture</Link>
            <Link to="/products?category=appliances" className="hover:text-foreground">Appliances</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>About Us</span>
            <span>Contact</span>
            <span>Careers</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Support</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>FAQ</span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © 2026 UrbanRentals. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
