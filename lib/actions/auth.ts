import { createClient } from "@/lib/supabase/client";
import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";

export async function loginWithEmail(values: LoginFormValues) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
  if (error) throw new Error(error.message);
}

export async function registerWithEmail(values: RegisterFormValues) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: { full_name: values.name },
    },
  });
  if (error) throw new Error(error.message);
}

export async function logoutUser() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
