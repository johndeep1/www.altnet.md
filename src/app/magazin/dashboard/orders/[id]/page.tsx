"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  createdAt: string;
  status: string;
  items: OrderItem[];
}

const orderStatuses = {
  PENDING: "În așteptare",
  CONFIRMED: "Confirmat",
  PROCESSING: "Completat",
  CANCELLED: "Anulat",
};

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("dashboard_auth") === "true";
    if (!isAuth) {
      router.push("/dashboard");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${resolvedParams.id}`);
        if (!response.ok) throw new Error("Failed to fetch order");
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Nu s-au putut încărca detaliile comenzii");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [resolvedParams.id, router]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update order status");
      
      const updatedOrder = await response.json();
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Nu s-a putut actualiza statusul comenzii");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="p-6 text-center">
          <p className="text-red-500 mb-4">{error || "Comanda nu a fost găsită"}</p>
          <Button onClick={() => router.push("/dashboard")}>
            Înapoi la Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Detalii Comandă #{order.orderNumber}</h1>
        <Button onClick={() => router.push("/dashboard")} variant="outline">
          Înapoi la Dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informații Client</h2>
          <div className="space-y-2">
            <p><strong>Nume:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Telefon:</strong> {order.phone}</p>
            <p><strong>Data comenzii:</strong> {new Date(order.createdAt).toLocaleString("ro-MD")}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Sumar Comandă</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <p><strong>Număr produse:</strong> {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
              <p><strong>Total comandă:</strong> {formatPrice(order.total)} MDL</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status Comandă</label>
              <Select
                defaultValue={order.status}
                onValueChange={handleStatusChange}
                disabled={updating}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selectează status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(orderStatuses).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Produse Comandate</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produs</TableHead>
              <TableHead className="text-right">Preț unitar</TableHead>
              <TableHead className="text-right">Cantitate</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{formatPrice(item.price)} MDL</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{formatPrice(item.price * item.quantity)} MDL</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 