import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { passwords } from "./schema/passwords";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL!;
const seedUserId = process.env.SEED_USER_ID!;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}
if (!seedUserId) {
  throw new Error("SEED_USER_ID is not set in .env");
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

const seedData = [
  {
    userId: seedUserId,
    platform: "GitHub",
    link: "https://github.com",
    userEmail: "dev@example.com",
    password: "gh_p@ssw0rd_2024!",
  },
  {
    userId: seedUserId,
    platform: "Amazon Web Services",
    link: "https://aws.amazon.com",
    userEmail: "admin@example.com",
    password: "aws_S3cur3P@ss#99",
  },
  {
    userId: seedUserId,
    platform: "Vercel",
    link: "https://vercel.com",
    userEmail: "dev@example.com",
    password: "vrc_D3pl0y!Pass22",
  },
  {
    userId: seedUserId,
    platform: "Supabase",
    link: "https://supabase.com",
    userEmail: "db@example.com",
    password: "supa_Base!XyZ#44",
  },
  {
    userId: seedUserId,
    platform: "Figma",
    link: "https://figma.com",
    userEmail: "design@example.com",
    password: "figma_D3$ign2024",
  },
];

async function main() {
  console.log("🌱 Seeding passwords table...");

  await db.insert(passwords).values(seedData);

  console.log(
    `✅ Seeded ${seedData.length} password entries for user: ${seedUserId}`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
});
