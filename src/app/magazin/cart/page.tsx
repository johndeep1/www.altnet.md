"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { formatPrice, getImageUrl } from "../lib/utils";
import { useCart } from "../lib/cart";
import { toast } from "sonner";

interface ProductStock {
  id: string;
  stock: number;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [stockLevels, setStockLevels] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "+373",
  });

  useEffect(() => {
    const fetchStockLevels = async () => {
      try {
        const response = await fetch("/magazin/api/products/stock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productIds: items.map((item) => item.id),
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch stock levels");

        const data = await response.json();

        // Ensure data is an array before using reduce
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format from stock API");
        }

        const stockMap = data.reduce(
          (acc, { id, stock }) => ({
            ...acc,
            [id]: stock,
          }),
          {}
        );

        setStockLevels(stockMap);

        // Update quantities if they exceed current stock
        items.forEach((item) => {
          if (item.quantity > stockMap[item.id]) {
            updateQuantity(item.id, stockMap[item.id]);
          }
        });
      } catch (error) {
        console.error("Error fetching stock levels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (items.length > 0) {
      fetchStockLevels();
    } else {
      setIsLoading(false);
    }
  }, [items.map((item) => item.id).join(",")]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const maxStock = stockLevels[id] || 0;
    if (newQuantity > maxStock) {
      updateQuantity(id, maxStock);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `ORD-${timestamp}${random}`;
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    const orderNumber = generateOrderNumber();

    try {
      // First, create the order
      const orderResponse = await fetch("/magazin/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber,
          customerName: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.text();
        throw new Error(error);
      }

      toast.success(
        "Comanda a fost plasată cu succes! Veți primi un email de confirmare în curând."
      );
      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "A apărut o eroare la plasarea comenzii. Vă rugăm să încercați din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container px-4 md:px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Coșul tău este gol</h1>
          <p className="text-muted-foreground mb-8">
            Nu ai adăugat încă niciun produs în coș.
          </p>
          <Link href="/magazin">
            <Button>Continuă cumpărăturile</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container px-4 md:px-6 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="h-[200px] bg-muted rounded" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-[400px] bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Coșul meu</h1>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <Card>
            <div className="p-6 space-y-6">
              {items.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <Separator className="my-6" />}
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/magazin/products/${item.id}`}
                        className="text-lg font-semibold hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {formatPrice(item.price)} MDL
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={
                              item.quantity >= (stockLevels[item.id] || 0)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-white"
                        >
                          <Trash2 className="h-4 w-4 " />
                        </Button>
                      </div>
                      {stockLevels[item.id] < item.quantity && (
                        <p className="mt-2 text-sm text-destructive">
                          Doar {stockLevels[item.id]} produse disponibile în
                          stoc.
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatPrice(item.price * item.quantity)} MDL
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Sumar comandă</h2>
                <div className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nume și Prenume</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Ion Creangă"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="ion.creanga@mail.md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+373 69 123 456"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Price Summary */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(total)} MDL</span>
                    </div>

                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatPrice(total)} MDL</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleSubmitOrder}
                      disabled={
                        !customerInfo.name ||
                        !customerInfo.email ||
                        !customerInfo.phone ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Se procesează...
                        </>
                      ) : (
                        "Finalizează comanda"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearCart}
                      disabled={isSubmitting}
                    >
                      Golește coșul
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
