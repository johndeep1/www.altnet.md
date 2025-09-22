const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

// Function to hash password
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { username: "altet-admin" },
    update: {},
    create: {
      username: "altet-admin",
      password: hashPassword("Admin101!"), // This will create a hashed version of 'admin123'
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", adminUser);

  const packages = [
    {
      title: "TV",
      slug: "tv",
      subtitle: "Televiziune digitală",
      price: 79,
      speed: "200+ canale",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      isPopular: false,
      features: [
        { text: "Canale HD incluse", included: true },
        { text: "Acces TV pe mobil", included: true },
        { text: "Instalare gratuită", included: true },
        { text: "Internet", included: false },
      ],
      popularFeatures: ["200+ canale TV", "Canale HD incluse"],
    },
    {
      title: "Popular",
      slug: "popular",
      subtitle: "Cel mai ales",
      price: 130,
      speed: "600 Mbps",
      gradient: "from-primary via-primary-dark to-violet-600",
      isPopular: true,
      features: [
        { text: "Internet de mare viteză", included: true },
        { text: "Router WiFi 6", included: true },
        { text: "Instalare gratuită", included: true },
        { text: "TV Digital HD", included: true },
      ],
      popularFeatures: ["TV pe mobil inclus", "Gaming optimizat"],
    },
    {
      title: "Premium",
      slug: "premium",
      subtitle: "Pentru pretențioși",
      price: 295,
      speed: "1000 Mbps",
      gradient: "from-violet-500 via-purple-600 to-purple-700",
      isPopular: false,
      features: [
        { text: "Internet Gigabit", included: true },
        { text: "Router WiFi 6E", included: true },
        { text: "Cadou Televizor 45 inch", included: true, highlight: true },
        { text: "Instalare prioritară", included: true },
      ],
      popularFeatures: ["TV Premium inclus", "IP Static inclus"],
    },
  ];

  for (const plan of packages) {
    const result = await prisma.packagePlan.upsert({
      where: { slug: plan.slug },
      update: {
        title: plan.title,
        subtitle: plan.subtitle,
        price: plan.price,
        speed: plan.speed,
        gradient: plan.gradient,
        features: plan.features,
        popularFeatures: plan.popularFeatures,
        isPopular: plan.isPopular,
      },
      create: plan,
    });

    console.log(`Package plan ensured: ${result.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
