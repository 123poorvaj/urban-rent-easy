import sofaImg from "@/assets/products/sofa.jpg";
import bedImg from "@/assets/products/bed.jpg";
import tableImg from "@/assets/products/table.jpg";
import fridgeImg from "@/assets/products/fridge.jpg";
import washingMachineImg from "@/assets/products/washing-machine.jpg";
import tvImg from "@/assets/products/tv.jpg";

export type Category = "furniture" | "appliances";
export type SubCategory = "bed" | "sofa" | "table" | "fridge" | "washing-machine" | "tv";

export interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory: SubCategory;
  image: string;
  monthlyPrice: number;
  deposit: number;
  description: string;
  features: string[];
  tenureOptions: { months: number; discount: number }[];
  available: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "sofa-001",
    name: "Oslo 3-Seater Fabric Sofa",
    category: "furniture",
    subCategory: "sofa",
    image: sofaImg,
    monthlyPrice: 1299,
    deposit: 3000,
    description: "Sink into the plush comfort of our Oslo sofa. Featuring premium grey upholstery and sleek chrome legs, it's designed for modern urban living.",
    features: ["Premium fabric upholstery", "Chrome-plated legs", "High-density foam cushions", "Stain-resistant coating"],
    tenureOptions: [
      { months: 1, discount: 0 },
      { months: 3, discount: 5 },
      { months: 6, discount: 10 },
      { months: 12, discount: 20 },
    ],
    available: true,
    rating: 4.7,
    reviews: 124,
  },
  {
    id: "bed-001",
    name: "Nordic Solid Wood Queen Bed",
    category: "furniture",
    subCategory: "bed",
    image: bedImg,
    monthlyPrice: 1599,
    deposit: 4000,
    description: "Crafted from solid oak, this Scandinavian-inspired queen bed brings warmth and elegance to your bedroom.",
    features: ["Solid oak construction", "Integrated headboard", "Under-bed storage option", "Fits standard queen mattress"],
    tenureOptions: [
      { months: 1, discount: 0 },
      { months: 3, discount: 5 },
      { months: 6, discount: 10 },
      { months: 12, discount: 20 },
    ],
    available: true,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "table-001",
    name: "Artisan Crossleg Dining Table",
    category: "furniture",
    subCategory: "table",
    image: tableImg,
    monthlyPrice: 899,
    deposit: 2500,
    description: "A stunning handcrafted dining table with a bold crossleg design. Seats up to 6 comfortably.",
    features: ["Solid wood construction", "Seats 6 people", "Scratch-resistant finish", "Easy assembly"],
    tenureOptions: [
      { months: 1, discount: 0 },
      { months: 3, discount: 5 },
      { months: 6, discount: 10 },
      { months: 12, discount: 20 },
    ],
    available: true,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: "fridge-001",
    name: "CoolTech Double-Door Refrigerator",
    category: "appliances",
    subCategory: "fridge",
    image: fridgeImg,
    monthlyPrice: 1199,
    deposit: 3500,
    description: "A spacious 500L double-door refrigerator with advanced cooling technology and energy-efficient design.",
    features: ["500L capacity", "Inverter compressor", "Frost-free technology", "Energy Star rated"],
    tenureOptions: [
      { months: 1, discount: 0 },
      { months: 3, discount: 5 },
      { months: 6, discount: 10 },
      { months: 12, discount: 20 },
    ],
    available: true,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: "washer-001",
    name: "SpinMaster Front-Load Washer",
    category: "appliances",
    subCategory: "washing-machine",
    image: washingMachineImg,
    monthlyPrice: 999,
    deposit: 3000,
    description: "8kg capacity front-loading washing machine with multiple wash programs and eco-friendly operation.",
    features: ["8kg capacity", "15 wash programs", "Quick wash cycle", "Anti-vibration design"],
    tenureOptions: [
      { months: 1, discount: 0 },
      { months: 3, discount: 5 },
      { months: 6, discount: 10 },
      { months: 12, discount: 20 },
    ],
    available: true,
    rating: 4.4,
    reviews: 156,
  },
  {
    id: "tv-001",
    name: '55" UltraView Smart TV',
    category: "appliances",
    subCategory: "tv",
    image: tvImg,
    monthlyPrice: 1499,
    deposit: 4000,
    description: "Immersive 55-inch 4K Smart TV with HDR support, built-in streaming apps, and crystal-clear picture quality.",
    features: ["4K UHD resolution", "HDR10+ support", "Built-in streaming apps", "Dolby Audio"],
    tenureOptions: [
      { months: 1, discount: 0 },
      { months: 3, discount: 5 },
      { months: 6, discount: 10 },
      { months: 12, discount: 20 },
    ],
    available: true,
    rating: 4.7,
    reviews: 312,
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductsByCategory = (category: Category) => products.filter((p) => p.category === category);
export const getProductsBySubCategory = (sub: SubCategory) => products.filter((p) => p.subCategory === sub);
