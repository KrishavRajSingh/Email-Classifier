import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

interface Email {
  id: string;
  snippet: string;
  subject: string;
  body: string;
  category?: string;
}

interface HomePageProps {
  session: any;
  emails: Email[];
}

const EmailServer = ({ session, emails }: HomePageProps) => {
  if (!session) {
    return (
      <div className="container mx-auto p-4">
        {/* <button onClick={() => signIn("google")}>Sign in with Google</button> */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* <button onClick={() => signOut()}>Sign out</button> */}
      <h1 className="text-2xl">Welcome {session.user?.email}</h1>
      <div className="mt-4">
        {emails.map((email) => (
          <div key={email.id} className="p-2 border-b">
            <p>{email.snippet}</p>
            <p className="text-sm text-gray-600">Category: {email.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const res = await axios.get<Email[]>(`${process.env.NEXTAUTH_URL}/api/emails`, {
    headers: {
      Cookie: context.req.headers.cookie || '',
    },
  });

  return {
    props: {
      session,
      emails: res.data,
    },
  };
};

export default EmailServer;
