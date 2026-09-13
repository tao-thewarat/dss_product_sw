const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find the highest current customer_id to avoid conflicts
  const maxCustomer = await prisma.customers.findFirst({
    orderBy: { customer_id: 'desc' }
  });
  const startId = (maxCustomer ? maxCustomer.customer_id : 0) + 1;

  const newCustomers = Array.from({ length: 10 }).map((_, i) => ({
    customer_id: startId + i,
    name: `Supabase User ${i + 1}`,
    email: `supa_user${i + 1}_${Date.now()}@example.com`,
    password_hash: `mockhash12345`
  }));

  console.log("Attempting to insert 10 customers to Supabase...");
  const result = await prisma.customers.createMany({
    data: newCustomers
  });
  
  console.log(`✅ Successfully inserted ${result.count} customers!`);
}

main()
  .catch(e => {
    console.error("❌ Failed to insert data:");
    console.error(e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
