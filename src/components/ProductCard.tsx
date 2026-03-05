import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.product.id === product.id);

  return (
    <div className="group overflow-hidden rounded-lg border bg-card shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute left-3 top-3 capitalize" variant="secondary">
            {product.subCategory.replace("-", " ")}
          </Badge>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-base font-semibold leading-snug text-card-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">₹{product.monthlyPrice.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
          <Button
            size="sm"
            variant={inCart ? "secondary" : "default"}
            onClick={() => !inCart && addItem(product, 3)}
            disabled={inCart}
          >
            <ShoppingCart className="mr-1 h-3.5 w-3.5" />
            {inCart ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
