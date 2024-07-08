import { createClient } from "./server";
import UserType from "../types/user";

const addUser = async (data: UserType) => {
    const supabase = createClient();
    const { data: user } = await supabase.from("users").insert(data);
    return user
}

export default addUser