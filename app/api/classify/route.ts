import { classifyEmails } from '../../lib/classifyemails';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const { apiKey, emails } = body;
    console.log(apiKey, 'sjsjjs');
    
    const classifiedEmails = await classifyEmails(apiKey, emails);
    // console.log(classifiedEmails, 'classy');
    
    return NextResponse.json(classifiedEmails);
};
