import { classifyEmails } from '../../lib/classifyemails';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const { openAIKey, emails } = body;
    console.log(openAIKey, 'sjsjjs');
    
    const classifiedEmails = await classifyEmails(openAIKey, emails);
    // console.log(classifiedEmails, 'classy');
    
    return NextResponse.json({mess: 'hibebe'});
};
