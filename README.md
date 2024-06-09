# Email-Classifier
Email Classifier is a web application that categorizes emails into predefined categories such as Important, Promotional, Social, Marketing, and Spam using Gemini API. The application uses Google OAuth for authentication and the Gmail API to fetch emails.

# Features
- User authentication with Google OAuth.
- Fetch emails from Gmail using the Gmail API.
- Classify emails into categories: Important, Promotional, Social, Marketing, and Spam and Generral using Gemini API.
- Refresh access tokens using refresh tokens for continued access.
- Display categorized emails in a user-friendly interface.

# Installation

Clone the repository

```bash
git clone https://github.com/KrishavRajSingh/Email-Classifier.git
cd Email-Classifier
```

Install the pakages
```bash
npm i
```
Install next
```bash
npm i next
```

Copy .env.example into .env
```bash
cp .env.example .env
```

Fill your secrets
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
```

Run the application
```bash
npm run dev
```

