import { createClient } from "./server";

export default async function User() {
  const supabase = createClient();
  const { data: users } = await supabase.from("users").select();

  return users
}