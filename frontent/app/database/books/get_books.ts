import { createClient } from "../server";
import Book from "@/app/types/book";

const fetchBooksData = async (): Promise<Book[]> => {
    const supabase = createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*");

  if (error) {
    console.error("Error fetching movies:", error);
    return [];
  }

  return data as Book[];
}

export const fetchBooksDataTitle = async (title: string): Promise<Book[]> => {
  const supabase = createClient();
const { data, error } = await supabase
  .from("books")
  .select("*").eq('title', title);

if (error) {
  console.error("Error fetching movies:", error);
  return [];
}

return data as Book[];
}


export default fetchBooksData
