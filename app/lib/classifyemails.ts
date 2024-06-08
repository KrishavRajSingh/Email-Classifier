import { GoogleGenerativeAI } from '@google/generative-ai';

import axios from 'axios';
export async function classifyEmails(apiKey: string, emails: any[]) {

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = emails.map((email, index) => (
      `Email ${index + 1}:\nfrom: ${email.from}\nSubject: ${email.subject}\nSnippet: ${email.snippet}\nCategory:`
    )).join('\n\n');
    console.log('prompt');
    // Send a single request to OpenAI API
    try {
      const result = await model.generateContent("Classify emails into important, Promotional, social, marketing, and spam categories and return a array of categories containing category only"+prompt);
      
      const resultText = result.response.text();
      console.log(resultText, 'resultText');
      const categoryLines = resultText.split('\n').filter(line => line.includes('Category:'));
      console.log('category, ', categoryLines);
  
        const classifiedEmails = emails.map((email, index) => ({
          ...email,
          category: categoryLines[index] ? categoryLines[index].split('**')[3] : 'Unknown',
        }));
        console.log(classifiedEmails, 'hy');
        
        return classifiedEmails;
    } catch (error) {
      console.error('Error:', error);
    }
}
