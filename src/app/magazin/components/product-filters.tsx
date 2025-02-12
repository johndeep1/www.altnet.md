"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { formatPrice } from "../lib/utils";

interface ProductFiltersProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  onSortChange: (value: string) => void;
  onStockChange: (value: string) => void;
}

export function ProductFilters({
  minPrice,
  maxPrice,
  onPriceChange,
  onSortChange,
  onStockChange,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    onPriceChange(range);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filtrare după preț</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[minPrice, maxPrice]}
            max={maxPrice}
            min={minPrice}
            step={1}
            onValueChange={handlePriceChange}
          />
          <div className="flex items-center justify-between text-sm">
            <span>{formatPrice(priceRange[0])} MDL</span>
            <span>{formatPrice(priceRange[1])} MDL</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Sortare</h3>
        <Select onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selectează ordinea" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Preț: Crescător</SelectItem>
            <SelectItem value="price-desc">Preț: Descrescător</SelectItem>
            <SelectItem value="name-asc">Nume: A-Z</SelectItem>
            <SelectItem value="name-desc">Nume: Z-A</SelectItem>
            <SelectItem value="newest">Cele mai noi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Disponibilitate</h3>
        <Select onValueChange={onStockChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrează după stoc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate produsele</SelectItem>
            <SelectItem value="in-stock">În stoc</SelectItem>
            <SelectItem value="out-of-stock">Stoc epuizat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPriceRange([minPrice, maxPrice]);
          onPriceChange([minPrice, maxPrice]);
          onSortChange("newest");
          onStockChange("all");
        }}
      >
        Resetează filtrele
      </Button>
    </div>
  );
}
