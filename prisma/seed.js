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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
