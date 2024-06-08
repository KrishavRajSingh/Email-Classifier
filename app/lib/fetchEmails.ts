import { google } from 'googleapis';

export async function getEmails(authToken: string, count: number) {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: authToken });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const res = await gmail.users.messages.list({ userId: 'me', maxResults: count });
  const messages = res.data.messages || [];

  const emailPromises = messages.map(async (message) => {
    const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });

    const snippet = msg.data.snippet || '';
    const payload = msg.data.payload || {};
    const headers = payload.headers || [];
    const fromHeader = headers.find((header: any) => header.name === 'From');
    const from = fromHeader ? parseSenderName(fromHeader.value) : '';
    const subjectHeader = headers.find((header: any) => header.name === 'Subject');
    const subject = subjectHeader ? subjectHeader.value : '';
    const bodyParts = payload.parts || [];
    const bodyPart = bodyParts.find((part: any) => part.mimeType === 'text/plain');
    const body = bodyPart ? Buffer.from(bodyPart.body.data, 'base64').toString() : '';

    return {
      id: message.id,
      snippet: snippet,
      subject: subject,
      from: from,
      body: body,
    };
  });

  return Promise.all(emailPromises);
}

function parseSenderName(fromHeader: string): string {
  // Extract sender's name from the "From" header
  const match = fromHeader.match(/"([^"]+)"/);
  return match ? match[1] : fromHeader.split('<')[0].trim(); // Extracted name without surrounding quotes or use the email itself
}