"use client";

import { useState, FormEvent } from "react";
import { Mail, MapPin, Phone, Loader2, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { toast } from "sonner";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/magazin/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Mesajul a fost trimis cu succes!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("A apărut o eroare. Vă rugăm să încercați din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Contactează-ne
              </h1>
              <p className="text-muted-foreground mt-2">
                Completează formularul și te vom contacta în cel mai scurt timp
                posibil.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nume</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Numele dvs."
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@exemplu.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Numărul dvs. de telefon"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mesaj</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Scrieți mesajul dvs. aici..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  "Trimite mesajul"
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Program de lucru</h2>
                <div className="flex items-start space-x-3 text-muted-foreground">
                  <Clock className="h-5 w-5 mt-0.5" />
                  <div>
                    <p>Luni - Vineri: 9:00 - 18:00</p>
                    <p>Sâmbătă: 10:00 - 14:00</p>
                    <p>Duminică: Închis</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Informații de contact</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-0.5" />
                    <div>
                      <p>Strada Principală, Nr. 123</p>
                      <p>Chișinău, Moldova</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5" />
                    <p>+373 22 123 456</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <p>contact@altnet.md</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map */}
            <Card className="p-0 overflow-hidden aspect-[16/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.2288461561387!2d28.83783207680086!3d47.02144052805736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x37d1d6305749dd3c!2zQ2hpyJlpbsSDdQ!5e0!3m2!1sro!2s!4v1707728391143!5m2!1sro!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
