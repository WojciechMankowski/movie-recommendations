import { NextResponse } from 'next/server';
import User from '@/app/database/get_user';

export async function GET() {
    const data = await User()
    return NextResponse.json({'data': data});
}
