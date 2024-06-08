import { NextRequest, NextResponse } from 'next/server';
import { getEmails } from '../../lib/fetchEmails';
import { getServerSession } from 'next-auth';
import { getToken } from "next-auth/jwt"

export async function GET(req: NextRequest, res: NextResponse) {
  try{
    const session = await getServerSession();
    const token = await getToken({ req });
    const { searchParams } = new URL(req.url);
    const count = parseInt(searchParams.get('count') || '5');
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' });
    }
    const emails = await getEmails(token?.accessToken as string, count);
    return NextResponse.json(emails);
  }catch(err){
    console.error('error fetching email', err);
    return NextResponse.json({ message: 'Error fetching emails' }, { status: 500 });
  }
//   console.log(JSON.stringify(session));
//   res.status(200).json(emails);
};