// components/EmailDetail.tsx
import sanitizeHtml from 'sanitize-html';

interface EmailDetailProps {
    email: any;
  }
  
  function EmailDetail({ email }: EmailDetailProps) {
    const clean = sanitizeHtml(email.body, {
        allowedAttributes: {},
        allowedTags: []
      });
    console.log(clean, 'hi', email.body);
    
    return (
      <div className="p-4 border-l border-gray-200 text-wrap">
        <h2 className="text-xl font-bold mb-2">Subject: {email.subject}</h2>
        <p className="text-gray-400 mb-4">From: {email.from}</p>
        <div className="w-[30rem] h-[30rem] overflow-y-auto text-ellipsis overflow-hidden text-wrap">
          {email.body}
          {/* Assuming the full body is the snippet for now. You might want to fetch the full body separately. */}
        </div>
      </div>
    );
  }
  
  export default EmailDetail;
  