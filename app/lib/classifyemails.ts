import { GoogleGenerativeAI } from '@google/generative-ai';

import axios from 'axios';
export async function classifyEmails(apiKey: string, emails: any[]) {

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = emails.map((email, index) => (
      `Email ${index + 1}:\nfrom: ${email.from}\nSubject: ${email.subject}\nSnippet: ${email.snippet}\nCategory:`
    )).join('\n\n');
    console.log('prompt');
    const completePrompt = `
      Classify the following emails into the categories: Important, Promotional, Social, Marketing, and Spam.
      Return an array of categories with only the category name for each email.

      ${prompt}
    `;
    // Send a single request to OpenAI API
      const result = await model.generateContent(`Classify the following emails into the categories: Important, Promotional, Social, Marketing, and Spam. 
        Important: Emails that are personal or work-related and require immediate attention.
        Promotions: Emails related to sales, discounts, and marketing campaigns.
        Social: Emails from social networks, friends, and family.
        Marketing: Emails related to marketing, newsletters, and notifications.
        Spam: Unwanted or unsolicited emails.
        `+prompt);
      
      const resultText = result.response.text();
      console.log(resultText, 'resultText');
      const categoryLines = resultText.split('\n').filter(line => line.includes('**'));
      console.log('category, ', categoryLines);
      const categories = ['Important', 'Promotional', 'Social', 'Marketing', 'Spam'];

        // Extract categories by checking the presence of each defined category
        const extractedCategories = categoryLines.map(line => {
            for (const category of categories) {
                if (line.includes(category)) {
                    return category;
                }
            }
            return 'General';
        });
        console.log(extractedCategories);
        
      const classifiedEmails = emails.map((email, index) => ({
        ...email,
        category: extractedCategories[index] || 'General',
      }));
      // console.log(classifiedEmails, 'hy');
        
      return classifiedEmails;
    } catch (error) {
      console.error('Error:', error);
    }
}
