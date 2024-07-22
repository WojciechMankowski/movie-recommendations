import fetchBooksData from "@/app/database/books/get_books";
import { NextResponse } from 'next/server';

export const GET = async () => {
    const data = await fetchBooksData()
    return NextResponse.json({'data': data});
}