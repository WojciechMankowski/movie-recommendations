import { NextResponse } from 'next/server';

import fetchData from '@/app/database/get_movies';
export async function GET() {
    const data = await fetchData()
    return NextResponse.json({'data': data});
}
