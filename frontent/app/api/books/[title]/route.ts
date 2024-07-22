import { fetchBooksDataTitle } from '@/app/database/books/get_books';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { title: string } }) => {
    const data = await fetchBooksDataTitle(params.title)
    return NextResponse.json({'data': data});
}