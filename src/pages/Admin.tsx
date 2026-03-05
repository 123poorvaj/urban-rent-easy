import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Package, DollarSign, Truck, Wrench, BarChart3,
  Plus, Pencil, Trash2, CheckCircle2, Clock, AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";

const mockOrders = [
  { id: "ORD-001", customer: "Priya Sharma", items: 2, date: "2026-03-01", status: "Scheduled", deliveryDate: "2026-03-05" },
  { id: "ORD-002", customer: "Rahul Mehta", items: 1, date: "2026-03-02", status: "Delivered", deliveryDate: "2026-03-04" },
  { id: "ORD-003", customer: "Anita Desai", items: 3, date: "2026-03-03", status: "Pending Pickup", deliveryDate: "2026-03-06" },
];

const mockMaintenanceReqs = [
  { id: "MR-001", customer: "Priya Sharma", product: "SpinMaster Front-Load Washer", issue: "Loud noise during spin cycle", status: "Open", date: "2026-03-02" },
  { id: "MR-002", customer: "Rahul Mehta", product: "Oslo 3-Seater Fabric Sofa", issue: "Stain on cushion", status: "In Progress", date: "2026-02-28" },
];

const kpis = [
  { label: "Active Rentals", value: "1,247", icon: Package, change: "+12%" },
  { label: "Monthly Revenue", value: "₹18.5L", icon: DollarSign, change: "+8%" },
  { label: "Deliveries This Week", value: "89", icon: Truck, change: "+15%" },
  { label: "Open Maintenance", value: "23", icon: Wrench, change: "-5%" },
];

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [inventoryProducts] = useState(products);

  if (!isAuthenticated || !user?.isAdmin) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your rental business</p>

        {/* KPIs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-lg border bg-card p-5">
              <div className="flex items-center justify-between">
                <kpi.icon className="h-5 w-5 text-muted-foreground" />
                <span className={`text-xs font-medium ${kpi.change.startsWith("+") ? "text-accent" : "text-destructive"}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="inventory" className="mt-8 space-y-6">
          <TabsList>
            <TabsTrigger value="inventory" className="gap-1"><Package className="h-4 w-4" /> Inventory</TabsTrigger>
            <TabsTrigger value="pricing" className="gap-1"><DollarSign className="h-4 w-4" /> Pricing</TabsTrigger>
            <TabsTrigger value="delivery" className="gap-1"><Truck className="h-4 w-4" /> Delivery</TabsTrigger>
            <TabsTrigger value="maintenance" className="gap-1"><Wrench className="h-4 w-4" /> Maintenance</TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1"><BarChart3 className="h-4 w-4" /> Analytics</TabsTrigger>
          </TabsList>

          {/* Inventory */}
          <TabsContent value="inventory">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">Product Inventory</h2>
              <Button size="sm" className="gap-1" onClick={() => toast.info("Product form would open here")}>
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Product</th>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-left font-medium">Price/mo</th>
                    <th className="px-4 py-3 text-left font-medium">Deposit</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {inventoryProducts.map((p) => (
                    <tr key={p.id} className="bg-card">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" />
                          <span className="font-medium">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize">{p.category}</td>
                      <td className="px-4 py-3">₹{p.monthlyPrice.toLocaleString()}</td>
                      <td className="px-4 py-3">₹{p.deposit.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <Badge variant={p.available ? "default" : "secondary"}>
                          {p.available ? "Available" : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => toast.info("Edit form")}><Pencil className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => toast.info("Delete confirmation")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing">
            <h2 className="font-display text-xl font-bold mb-4">Rental Pricing Setup</h2>
            <div className="space-y-4">
              {inventoryProducts.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-lg border bg-card p-4">
                  <h3 className="font-semibold">{p.name}</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-5">
                    <div>
                      <Label className="text-xs">Base Price</Label>
                      <Input defaultValue={p.monthlyPrice} type="number" className="mt-1" />
                    </div>
                    {p.tenureOptions.map((t) => (
                      <div key={t.months}>
                        <Label className="text-xs">{t.months}M Discount %</Label>
                        <Input defaultValue={t.discount} type="number" className="mt-1" />
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="mt-3" onClick={() => toast.success("Pricing updated!")}>Save</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Delivery */}
          <TabsContent value="delivery">
            <h2 className="font-display text-xl font-bold mb-4">Delivery & Pickup Scheduling</h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Order ID</th>
                    <th className="px-4 py-3 text-left font-medium">Customer</th>
                    <th className="px-4 py-3 text-left font-medium">Items</th>
                    <th className="px-4 py-3 text-left font-medium">Delivery Date</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockOrders.map((o) => (
                    <tr key={o.id} className="bg-card">
                      <td className="px-4 py-3 font-medium">{o.id}</td>
                      <td className="px-4 py-3">{o.customer}</td>
                      <td className="px-4 py-3">{o.items}</td>
                      <td className="px-4 py-3">{o.deliveryDate}</td>
                      <td className="px-4 py-3">
                        <Badge variant={o.status === "Delivered" ? "default" : "secondary"}>
                          {o.status === "Delivered" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {o.status === "Scheduled" && <Clock className="mr-1 h-3 w-3" />}
                          {o.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline" onClick={() => toast.success("Status updated!")}>
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Maintenance */}
          <TabsContent value="maintenance">
            <h2 className="font-display text-xl font-bold mb-4">Maintenance Requests</h2>
            <div className="space-y-4">
              {mockMaintenanceReqs.map((m) => (
                <div key={m.id} className="flex items-start gap-4 rounded-lg border bg-card p-4">
                  <AlertTriangle className={`mt-1 h-5 w-5 ${m.status === "Open" ? "text-destructive" : "text-primary"}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{m.id}</h3>
                      <Badge variant={m.status === "Open" ? "destructive" : "default"}>{m.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm"><span className="text-muted-foreground">Customer:</span> {m.customer}</p>
                    <p className="text-sm"><span className="text-muted-foreground">Product:</span> {m.product}</p>
                    <p className="text-sm"><span className="text-muted-foreground">Issue:</span> {m.issue}</p>
                    <p className="text-xs text-muted-foreground mt-1">Reported: {m.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.success("Assigned technician")}>Assign</Button>
                    <Button size="sm" onClick={() => toast.success("Marked as resolved")}>Resolve</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <h2 className="font-display text-xl font-bold mb-4">Analytics Dashboard</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-muted-foreground">Revenue Trend</h3>
                <div className="mt-4 flex items-end gap-1">
                  {[65, 72, 80, 68, 85, 92, 88, 95, 78, 98, 105, 110].map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-primary/80"
                      style={{ height: `${v}px` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Jan</span><span>Jun</span><span>Dec</span>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-muted-foreground">Category Distribution</h3>
                <div className="mt-6 space-y-4">
                  {[
                    { label: "Sofa", pct: 35 },
                    { label: "Bed", pct: 25 },
                    { label: "Fridge", pct: 20 },
                    { label: "TV", pct: 12 },
                    { label: "Others", pct: 8 },
                  ].map((c) => (
                    <div key={c.label}>
                      <div className="flex justify-between text-sm">
                        <span>{c.label}</span>
                        <span className="font-medium">{c.pct}%</span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-muted-foreground">Customer Satisfaction</h3>
                <p className="mt-4 text-5xl font-bold text-gradient">4.6</p>
                <p className="mt-1 text-sm text-muted-foreground">Average rating from 1,847 reviews</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-muted-foreground">Quick Stats</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Avg Rental Duration</span><span className="font-medium">5.2 months</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Customer Retention</span><span className="font-medium">78%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Deposit Recovery Rate</span><span className="font-medium">94%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Active Cities</span><span className="font-medium">12</span></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
