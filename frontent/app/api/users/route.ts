import { NextResponse, NextRequest } from "next/server";
import User from "@/app/database/get_user";
import addUser from "@/app/database/add_user";

export async function GET(request: NextRequest) {
  const data = await User();
  return NextResponse.json({ message: data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const response = await addUser(data);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Nie udało się dodać użytkownika" }, { status: 500 });
  }
}
