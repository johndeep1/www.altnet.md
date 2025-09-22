import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/app/magazin/lib/prisma";

const normalizeFeatures = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const text = typeof record.text === "string" ? record.text.trim() : "";
      if (!text) return null;

      return {
        text,
        included: Boolean(record.included),
        highlight: Boolean(record.highlight),
      };
    })
    .filter(Boolean);
};

const normalizePopularFeatures = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
};

export async function GET() {
  try {
    const plans = await prisma.packagePlan.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error("Failed to fetch packages", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      subtitle,
      price,
      speed,
      gradient,
      features,
      popularFeatures,
      isPopular,
    } = body ?? {};

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Titlul este obligatoriu" }, { status: 400 });
    }

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug-ul este obligatoriu" }, { status: 400 });
    }

    if (!speed || typeof speed !== "string") {
      return NextResponse.json({ error: "Viteza este obligatorie" }, { status: 400 });
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json({ error: "Prețul trebuie să fie un număr pozitiv" }, { status: 400 });
    }

    const planCount = await prisma.packagePlan.count();
    if (planCount >= 3) {
      return NextResponse.json({ error: "Poți avea cel mult 3 pachete active" }, { status: 400 });
    }

    const existingSlug = await prisma.packagePlan.findUnique({ where: { slug } });
    if (existingSlug) {
      return NextResponse.json({ error: "Slug-ul trebuie să fie unic" }, { status: 400 });
    }

    const sanitizedFeatures = normalizeFeatures(features);
    const sanitizedPopularFeatures = normalizePopularFeatures(popularFeatures);

    const data = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      subtitle:
        typeof subtitle === "string" && subtitle.trim().length
          ? subtitle.trim()
          : null,
      price: new Prisma.Decimal(parsedPrice),
      speed: speed.trim(),
      gradient:
        typeof gradient === "string" && gradient.trim().length
          ? gradient.trim()
          : "from-primary via-primary-dark to-primary",
      features: sanitizedFeatures,
      popularFeatures: sanitizedPopularFeatures,
      isPopular: Boolean(isPopular),
    } satisfies Prisma.PackagePlanCreateInput;

    const result = await prisma.$transaction(async (tx) => {
      if (data.isPopular) {
        await tx.packagePlan.updateMany({
          where: { isPopular: true },
          data: { isPopular: false },
        });
      }

      return tx.packagePlan.create({ data });
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to create package", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
