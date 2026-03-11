import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowRight, Truck, Shield, Wrench, Clock, Star, Send } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImg from "@/assets/hero-living-room.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "Delivered & assembled at your doorstep" },
  { icon: Shield, title: "Damage Waiver", desc: "We cover normal wear and tear" },
  { icon: Wrench, title: "Free Maintenance", desc: "24/7 support for all repairs" },
  { icon: Clock, title: "Flexible Tenure", desc: "Rent from 1 month to 12 months" },
];

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container relative z-10 flex flex-col items-center gap-8 py-20 md:flex-row md:py-28">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Rent Furniture &<br />
              <span className="text-gradient">Appliances</span> for<br />
              Urban Living
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Premium quality. Zero commitment. From ₹499/mo — upgrade your space without the burden of ownership.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Link to="/products">
                <Button size="lg" className="gap-2">
                  Browse Collection <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products?category=appliances">
                <Button size="lg" variant="outline" className="gap-2">
                  Rent Appliances
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={heroImg}
              alt="Modern furnished living room"
              className="rounded-2xl shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-card py-12">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold">Popular Picks</h2>
              <p className="mt-1 text-muted-foreground">Most rented items this month</p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-dark py-16 text-center">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to Transform Your Space?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Join thousands of happy renters. No strings attached — cancel anytime.
          </p>
          <Link to="/products">
            <Button size="lg" className="mt-6 gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
