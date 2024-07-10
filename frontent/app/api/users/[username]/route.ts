import { NextResponse, NextRequest } from "next/server";
import { get_id_user } from "@/app/database/get_user";

export async function GET(request: NextRequest) {
    const urls = request.url.split('/');
    const id = urls[urls.length - 1];
    const data = await get_id_user(id);
    if (!data) {
        return NextResponse.json({ message: `Brak użytkownika o nazwie: ${id}` }, { status: 404 });
    } else {
        return NextResponse.json(data, { status: 200 });
    }
}
