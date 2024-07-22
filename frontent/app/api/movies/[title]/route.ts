import { NextResponse, NextRequest } from 'next/server';
import fetchMovieTitle from '@/app/database/movies/search_movie';

export async function GET(request: NextRequest, { params }: { params: { title: string } }) {
    const title = params.title
    const data = await fetchMovieTitle(title)
    return NextResponse.json({'data': data});
}
