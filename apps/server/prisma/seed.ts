import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash("admin12345", 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@jelez-beton.ru" },
    update: {},
    create: { email: "admin@jelez-beton.ru", passwordHash: adminHash }
  });

  const categories = [
    { name: "Бетонные кольца", slug: "betonnye-koltsa" },
    { name: "Крышки", slug: "kryshki" },
    { name: "ФБС блоки", slug: "fbs" },
    { name: "ЖБ столбы", slug: "stolby" }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }

  const ringCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "betonnye-koltsa" }
  });

  await prisma.product.upsert({
    where: { slug: "koltso-ks-10-9" },
    update: {},
    create: {
      title: "Кольцо КС 10-9",
      slug: "koltso-ks-10-9",
      description: "Универсальное железобетонное кольцо для колодцев.",
      price: "3200.00",
      categoryId: ringCategory.id,
      imageUrl: "/images/koltso-ks-10-9.jpg",
      specs: { diameter: "1000 мм", height: "900 мм", weight: "600 кг" }
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
