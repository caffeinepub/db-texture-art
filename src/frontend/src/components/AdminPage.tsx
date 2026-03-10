import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, STATIC_PRODUCTS, formatPrice } from "@/data/products";
import { useActor } from "@/hooks/useActor";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminPage() {
  const { actor } = useActor();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Abstract",
    imageUrl: "",
    featured: false,
    stock: "1",
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Not connected");
      return;
    }
    setAdding(true);
    try {
      await actor.addProduct({
        name: form.name,
        description: form.description,
        price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
        category: form.category,
        imageUrl: form.imageUrl,
        featured: form.featured,
        stock: BigInt(form.stock),
        variants: [
          { size: "12x12 inch" },
          { size: "18x18 inch" },
          { size: "24x24 inch" },
        ],
      });
      toast.success("Product added!");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "Abstract",
        imageUrl: "",
        featured: false,
        stock: "1",
      });
    } catch {
      toast.error("Failed to add product");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div data-ocid="admin.page" className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Add product */}
      <div className="bg-card border border-border rounded-sm p-6 mb-10">
        <h2 className="font-serif text-xl font-semibold mb-6">
          Add New Product
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Name</Label>
              <Input
                data-ocid="admin.product_name.input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea
                data-ocid="admin.product_desc.textarea"
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-1 resize-none"
                rows={3}
              />
            </div>
            <div>
              <Label>Price (USD)</Label>
              <Input
                data-ocid="admin.product_price.input"
                required
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="mt-1"
                placeholder="280"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger
                  data-ocid="admin.product_category.select"
                  className="mt-1"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Image URL</Label>
              <Input
                data-ocid="admin.product_image.input"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="mt-1"
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                data-ocid="admin.product_featured.switch"
                checked={form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: v })}
              />
              <Label>Featured</Label>
            </div>
          </div>
          <Button
            data-ocid="admin.add_product.submit_button"
            type="submit"
            disabled={adding}
            className="bg-primary text-primary-foreground gap-2"
          >
            {adding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add Product
          </Button>
        </form>
      </div>

      {/* Existing products */}
      <div>
        <h2 className="font-serif text-xl font-semibold mb-4">
          Current Products ({STATIC_PRODUCTS.length})
        </h2>
        <div className="space-y-3">
          {STATIC_PRODUCTS.map((p, i) => (
            <div
              key={p.id.toString()}
              data-ocid={`admin.product.item.${i + 1}`}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-sm"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-14 h-14 object-cover rounded-sm"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.category} · {formatPrice(p.price)}
                </p>
              </div>
              <Button
                data-ocid={`admin.delete_product.delete_button.${i + 1}`}
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
                onClick={async () => {
                  if (!actor) return;
                  try {
                    await actor.deleteProduct(p.id);
                    toast.success("Deleted");
                  } catch {
                    toast.error("Failed");
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
