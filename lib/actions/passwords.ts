"use server";

import { db } from "@/lib/db";
import { passwords } from "@/lib/db/schema/passwords";
import { eq, desc } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { PasswordFormValues } from "@/lib/validations/password";
import { Password } from "@/types/password";

async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
  return user;
}

export async function getPasswords(): Promise<Password[]> {
  const user = await getAuthUser();

  const rows = await db
    .select()
    .from(passwords)
    .where(eq(passwords.userId, user.id))
    .orderBy(desc(passwords.createdAt));

  return rows.map((row) => ({
    id: row.id,
    user_id: row.userId,
    platform: row.platform,
    link: row.link,
    user_email: row.userEmail,
    password: row.password,
    created_at: row.createdAt.toISOString(),
  }));
}

export async function createPassword(
  values: PasswordFormValues,
): Promise<void> {
  const user = await getAuthUser();

  await db.insert(passwords).values({
    userId: user.id,
    platform: values.platform,
    link: values.link ?? "",
    userEmail: values.user_email ?? "",
    password: values.password,
  });
}

export async function updatePassword(
  id: string,
  values: PasswordFormValues,
): Promise<void> {
  await getAuthUser();

  await db
    .update(passwords)
    .set({
      platform: values.platform,
      link: values.link ?? "",
      userEmail: values.user_email ?? "",
      password: values.password,
    })
    .where(eq(passwords.id, id));
}

export async function deletePassword(id: string): Promise<void> {
  await getAuthUser();

  await db.delete(passwords).where(eq(passwords.id, id));
}
