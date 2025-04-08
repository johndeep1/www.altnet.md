"use client";

import BaseHeader from "../../../components/layout/Header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const CartButton = dynamic(() => import("./cart-button"), { ssr: false });

export default function Header() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/magazin/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const magazinNavigation = [
    {
      name: "Produse",
      href: "/magazin",
    },
    {
      name: "Categorii",
      href: "/magazin/categories",
      submenu:
        categories.length > 0
          ? categories.map((cat) => ({
              name: cat.name,
              href: `/magazin/categories/${cat.id}`,
              description: cat.description,
            }))
          : [],
    },
  ];

  return (
    <BaseHeader
      cartButton={<CartButton />}
      customNavigation={magazinNavigation}
    />
  );
}
