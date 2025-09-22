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

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const plan = await prisma.packagePlan.findUnique({
      where: { id: params.id },
    });

    if (!plan) {
      return NextResponse.json({ error: "Pachetul nu a fost găsit" }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Failed to fetch package", error);
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const existingPlan = await prisma.packagePlan.findUnique({
      where: { id: params.id },
    });

    if (!existingPlan) {
      return NextResponse.json({ error: "Pachetul nu există" }, { status: 404 });
    }

    if (typeof title !== "undefined") {
      if (typeof title !== "string" || !title.trim().length) {
        return NextResponse.json({ error: "Titlul trebuie să fie un text valid" }, { status: 400 });
      }
    }

    if (typeof slug !== "undefined") {
      if (typeof slug !== "string" || !slug.trim().length) {
        return NextResponse.json({ error: "Slug-ul trebuie să fie un text valid" }, { status: 400 });
      }
    }

    if (typeof speed !== "undefined") {
      if (typeof speed !== "string" || !speed.trim().length) {
        return NextResponse.json({ error: "Viteza trebuie să fie un text valid" }, { status: 400 });
      }
    }

    let priceValue: Prisma.Decimal | undefined;
    if (typeof price !== "undefined") {
      const parsedPrice = Number(price);
      if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
        return NextResponse.json({ error: "Prețul trebuie să fie un număr pozitiv" }, { status: 400 });
      }
      priceValue = new Prisma.Decimal(parsedPrice);
    }

    if (slug) {
      const slugOwner = await prisma.packagePlan.findUnique({ where: { slug: slug.trim().toLowerCase() } });
      if (slugOwner && slugOwner.id !== params.id) {
        return NextResponse.json({ error: "Slug-ul este deja folosit" }, { status: 400 });
      }
    }

    const sanitizedFeatures =
      typeof features === "undefined" ? undefined : normalizeFeatures(features);
    const sanitizedPopularFeatures =
      typeof popularFeatures === "undefined"
        ? undefined
        : normalizePopularFeatures(popularFeatures);

    const data: Prisma.PackagePlanUpdateInput = {};

    if (typeof title !== "undefined") {
      data.title = title.trim();
    }

    if (typeof slug !== "undefined") {
      data.slug = slug.trim().toLowerCase();
    }

    if (typeof subtitle !== "undefined") {
      if (subtitle === null) {
        data.subtitle = null;
      } else if (typeof subtitle === "string" && subtitle.trim().length) {
        data.subtitle = subtitle.trim();
      } else {
        data.subtitle = null;
      }
    }

    if (typeof speed !== "undefined") {
      data.speed = speed.trim();
    }

    if (typeof gradient !== "undefined") {
      if (typeof gradient === "string" && gradient.trim().length) {
        data.gradient = gradient.trim();
      } else {
        data.gradient = "from-primary via-primary-dark to-primary";
      }
    }

    if (priceValue) {
      data.price = priceValue;
    }

    if (typeof sanitizedFeatures !== "undefined") {
      data.features = sanitizedFeatures;
    }

    if (typeof sanitizedPopularFeatures !== "undefined") {
      data.popularFeatures = sanitizedPopularFeatures;
    }

    if (typeof isPopular === "boolean") {
      data.isPopular = isPopular;
    }

    const result = await prisma.$transaction(async (tx) => {
      if (data.isPopular === true) {
        await tx.packagePlan.updateMany({
          where: { isPopular: true, NOT: { id: params.id } },
          data: { isPopular: false },
        });
      }

      const updated = await tx.packagePlan.update({
        where: { id: params.id },
        data,
      });

      if (data.isPopular === true) {
        return updated;
      }

      // Ensure there is still a popular plan. If we unset the popular flag, check if another exists
      if (data.isPopular === false) {
        const popularExists = await tx.packagePlan.findFirst({ where: { isPopular: true } });
        if (!popularExists) {
          // Reassign the cheapest plan as popular by default
          const fallback = await tx.packagePlan.findFirst({
            orderBy: { price: "asc" },
          });
          if (fallback) {
            await tx.packagePlan.update({ where: { id: fallback.id }, data: { isPopular: true } });
          }
        }
      }

      return updated;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to update package", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingPlan = await prisma.packagePlan.findUnique({
      where: { id: params.id },
    });

    if (!existingPlan) {
      return NextResponse.json({ error: "Pachetul nu există" }, { status: 404 });
    }

    await prisma.packagePlan.delete({ where: { id: params.id } });

    // Ensure at least one plan remains popular after deletion
    const popularPlan = await prisma.packagePlan.findFirst({ where: { isPopular: true } });
    if (!popularPlan) {
      const fallback = await prisma.packagePlan.findFirst({ orderBy: { price: "asc" } });
      if (fallback) {
        await prisma.packagePlan.update({ where: { id: fallback.id }, data: { isPopular: true } });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete package", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
