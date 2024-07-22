import { NextResponse } from 'next/server';
import fetchData from '@/app/database/movies/get_movies';

export async function GET() {
    const data = await fetchData()
    return NextResponse.json({'data': data});
}
