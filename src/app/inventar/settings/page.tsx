"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Settings = {
  lowStockThreshold: number;
  automaticStockAlerts: boolean;
  defaultStockLevel: number;
  currency: string;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    lowStockThreshold: 5,
    automaticStockAlerts: true,
    defaultStockLevel: 1,
    currency: "Lei",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch settings from an API
    // For now, we'll use default values
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // In a real app, we would save to an API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSaveMessage("Setările au fost salvate cu succes!");
    } catch (error) {
      setSaveMessage("Eroare la salvarea setărilor!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <Link
          href="/inventar"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la Panou
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Setări</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Se salvează..." : "Salvează Setările"}
        </button>
      </div>

      {saveMessage && (
        <div
          className={`p-4 mb-6 rounded-md ${
            saveMessage.includes("succes")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {saveMessage}
        </div>
      )}

      <div className="space-y-12">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Setări Inventar</h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="lowStockThreshold"
                className="block text-sm font-medium mb-2"
              >
                Prag Stoc Minim
              </label>
              <input
                type="number"
                id="lowStockThreshold"
                min="0"
                value={settings.lowStockThreshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    lowStockThreshold: parseInt(e.target.value) || 0,
                  })
                }
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Produsele cu stoc sub această valoare vor fi marcate cu galben
              </p>
            </div>

            <div>
              <label
                htmlFor="defaultStockLevel"
                className="block text-sm font-medium mb-2"
              >
                Stoc Implicit pentru Produse Noi
              </label>
              <input
                type="number"
                id="defaultStockLevel"
                min="0"
                value={settings.defaultStockLevel}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultStockLevel: parseInt(e.target.value) || 0,
                  })
                }
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Valoarea implicită pentru stoc la adăugarea unui produs nou
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Alerte Automate pentru Stoc
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="automaticStockAlerts"
                  checked={settings.automaticStockAlerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      automaticStockAlerts: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="automaticStockAlerts"
                  className="text-sm text-muted-foreground"
                >
                  Activează alertele automate când stocul scade sub pragul minim
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Setări Generale</h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium mb-2"
              >
                Monedă
              </label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Lei">Lei (MDL)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dolar (USD)</option>
              </select>
              <p className="text-sm text-muted-foreground mt-1">
                Moneda folosită în aplicație
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
