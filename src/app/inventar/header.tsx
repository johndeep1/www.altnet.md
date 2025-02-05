"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function InventarHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Force a hard navigation to /login
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="pt-24">
      <div className="container mx-auto px-12 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sistem de Inventar</h1>
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Deconectare
        </button>
      </div>
    </header>
  );
}
