import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Check, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const product = getProductById(id || "");
  const [selectedTenure, setSelectedTenure] = useState(3);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Button className="mt-4" onClick={() => navigate("/products")}>Browse Products</Button>
        </div>
      </div>
    );
  }

  const inCart = items.some((i) => i.product.id === product.id);
  const tenureOption = product.tenureOptions.find((t) => t.months === selectedTenure);
  const discountedPrice = product.monthlyPrice * (1 - (tenureOption?.discount || 0) / 100);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <Button variant="ghost" className="mb-6 gap-1" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-xl bg-secondary">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.category} · {product.subCategory.replace("-", " ")}
              </Badge>
              <h1 className="font-display text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Pricing */}
            <div className="rounded-lg border bg-secondary/50 p-5">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">₹{Math.round(discountedPrice).toLocaleString()}</span>
                <span className="mb-1 text-sm text-muted-foreground">/month</span>
                {tenureOption && tenureOption.discount > 0 && (
                  <Badge className="mb-1 ml-2">{tenureOption.discount}% off</Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Security deposit: ₹{product.deposit.toLocaleString()} (refundable)
              </p>
            </div>

            {/* Tenure */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">Select Rental Tenure</h3>
              <div className="flex flex-wrap gap-2">
                {product.tenureOptions.map((t) => (
                  <button
                    key={t.months}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      selectedTenure === t.months
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTenure(t.months)}
                  >
                    {t.months} {t.months === 1 ? "Month" : "Months"}
                    {t.discount > 0 && (
                      <span className="ml-1 text-xs opacity-75">(-{t.discount}%)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">Features</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2"
                disabled={inCart}
                onClick={() => addItem(product, selectedTenure)}
              >
                <ShoppingCart className="h-4 w-4" />
                {inCart ? "Already in Cart" : "Add to Cart"}
              </Button>
              {inCart && (
                <Button size="lg" variant="outline" onClick={() => navigate("/cart")}>
                  View Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
