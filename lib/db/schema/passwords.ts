import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const passwords = pgTable("passwords", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  platform: text("platform").notNull(),
  link: text("link").default("").notNull(),
  userEmail: text("user_email").default("").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Password = typeof passwords.$inferSelect;
export type NewPassword = typeof passwords.$inferInsert;
