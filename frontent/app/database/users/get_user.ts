import { createClient } from "../server";

export default async function User() {
  const supabase = createClient();
  const { data: users } = await supabase.from("users").select();

  return users
}

export async function get_id_user(username: string) {
  const supabase = createClient();
  const { data: users } = await supabase.from("users").select().eq('username', username);

  return users
}