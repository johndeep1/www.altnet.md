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
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Sistem de Inventar</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-10 px-4 shadow-sm transition-colors duration-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Deconectare
          </button>
        </div>
      </div>
    </div>
  );
}
