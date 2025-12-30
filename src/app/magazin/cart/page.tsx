"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, Loader2, ShoppingCart, AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { formatPrice, getImageUrl } from "../lib/utils";
import { useCart, CartItem } from "../lib/cart";
import { toast } from "sonner";
import { ProductImage } from "../components/ui/product-image";

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
    address: "",
    paymentMethod: "cash",
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

        const stockMap = data.reduce<Record<string, number>>(
          (acc, { id, stock }: ProductStock) => ({
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
  }, [items, updateQuantity]);

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
      // Create the order and send emails
      const orderResponse = await fetch("/api/magazin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber,
          customerName: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          deliveryAddress: customerInfo.address,
          paymentMethod: customerInfo.paymentMethod,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          total,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || "An error occurred while processing your order");
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
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
            <ShoppingCart className="w-16 h-16 mx-auto text-primary/40" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Coșul tău este gol</h1>
          <p className="text-muted-foreground mb-8">
            Nu ai adăugat încă niciun produs în coș. Explorează magazinul nostru pentru a găsi produsele perfecte pentru tine.
          </p>
          <Link href="/magazin">
            <Button size="lg" className="px-8">
              Continuă cumpărăturile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container px-4 md:px-6 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-100 rounded-lg w-1/4" />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="h-[200px] bg-gray-100 rounded-xl" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-[400px] bg-gray-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Coșul meu</h1>
          <Button
            variant="ghost"
            onClick={clearCart}
            disabled={isSubmitting}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Golește coșul
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href={`/magazin/products/${item.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Preț unitar: {formatPrice(item.price)} MDL
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= (stockLevels[item.id] || 0)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="font-semibold text-lg text-gray-900">
                          {formatPrice(item.price * item.quantity)} MDL
                        </div>
                      </div>
                      {stockLevels[item.id] < item.quantity && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Doar {stockLevels[item.id]} produse disponibile în stoc.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Sumar comandă</h2>

                  {/* Customer Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Nume și Prenume
                      </Label>
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
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
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
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Telefon
                      </Label>
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
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Adresă livrare
                      </Label>
                      <Input
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Strada, număr, localitate"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">
                        Metodă de plată
                      </Label>
                      <select
                        id="paymentMethod"
                        value={customerInfo.paymentMethod}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            paymentMethod: e.target.value,
                          }))
                        }
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="cash">Numerar</option>
                        <option value="card">Card</option>
                        <option value="bank_transfer">Transfer bancar</option>
                      </select>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Price Summary */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-gray-900">{formatPrice(total)} MDL</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(total)} MDL</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-4">
                    <Button
                      className="w-full h-11 text-base"
                      onClick={handleSubmitOrder}
                      disabled={
                        !customerInfo.name ||
                        !customerInfo.email ||
                        !customerInfo.phone ||
                        !customerInfo.address ||
                        !customerInfo.paymentMethod ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Se procesează...
                        </>
                      ) : (
                        "Finalizează comanda"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
