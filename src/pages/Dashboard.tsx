import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Clock, Wrench, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";
import { products } from "@/data/products";

const mockRentals = [
  { id: "R001", product: products[0], tenure: 6, startDate: "2026-01-15", status: "active" as const },
  { id: "R002", product: products[3], tenure: 12, startDate: "2025-09-01", status: "active" as const },
  { id: "R003", product: products[2], tenure: 3, startDate: "2025-06-01", status: "completed" as const },
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [maintenanceDesc, setMaintenanceDesc] = useState("");
  const [maintenanceProduct, setMaintenanceProduct] = useState("");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const activeRentals = mockRentals.filter((r) => r.status === "active");
  const pastRentals = mockRentals.filter((r) => r.status === "completed");

  const handleMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintenanceProduct || !maintenanceDesc) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Maintenance request submitted!");
    setMaintenanceDesc("");
    setMaintenanceProduct("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active" className="gap-1"><Package className="h-4 w-4" /> Active Rentals</TabsTrigger>
            <TabsTrigger value="history" className="gap-1"><Clock className="h-4 w-4" /> History</TabsTrigger>
            <TabsTrigger value="maintenance" className="gap-1"><Wrench className="h-4 w-4" /> Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeRentals.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">No active rentals</div>
            ) : (
              <div className="space-y-4">
                {activeRentals.map((r) => (
                  <div key={r.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                    <img src={r.product.image} alt={r.product.name} className="h-20 w-20 rounded-md object-cover" />
                    <div className="flex-1">
                      <h3 className="font-display font-semibold">{r.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {r.tenure} months · Started {r.startDate}
                      </p>
                      <p className="text-sm font-medium">₹{r.product.monthlyPrice.toLocaleString()}/mo</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {pastRentals.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">No past rentals</div>
            ) : (
              <div className="space-y-4">
                {pastRentals.map((r) => (
                  <div key={r.id} className="flex items-center gap-4 rounded-lg border bg-card p-4 opacity-70">
                    <img src={r.product.image} alt={r.product.name} className="h-20 w-20 rounded-md object-cover" />
                    <div className="flex-1">
                      <h3 className="font-display font-semibold">{r.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {r.tenure} months · Started {r.startDate}
                      </p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="maintenance">
            <form onSubmit={handleMaintenance} className="max-w-lg space-y-4 rounded-lg border bg-card p-6">
              <h2 className="font-display text-lg font-bold">Submit Maintenance Request</h2>
              <div>
                <Label>Select Product</Label>
                <select
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={maintenanceProduct}
                  onChange={(e) => setMaintenanceProduct(e.target.value)}
                >
                  <option value="">Choose a product...</option>
                  {activeRentals.map((r) => (
                    <option key={r.id} value={r.id}>{r.product.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="desc">Describe the Issue</Label>
                <Textarea
                  id="desc"
                  value={maintenanceDesc}
                  onChange={(e) => setMaintenanceDesc(e.target.value)}
                  placeholder="e.g., The washing machine is making a loud noise during spin cycle"
                  rows={4}
                />
              </div>
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" /> Submit Request
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
