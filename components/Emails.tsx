'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import Image from "next/image";
import EmailDetail from "./EmailDetail";

interface Email {
  id: string;
  snippet: string;
  category?: string;
  subject: string;
  from: string;
}

function Emails() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [emails, setEmails] = useState<Email[]>([]);
    const [openAIKey, setOpenAIKey] = useState<String | null>(null);
    const [emailCount, setEmailCount] = useState<number>(5);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    
    const fetchEmails = async () => {
        if (session) {
          console.log(emailCount, 'ema');
          
          const res = await axios.get<Email[]>(`/api/emails?count=${emailCount}`);
          setEmails(res.data);
        }
    };
    
    const classifyEmails = async () => {
        const res = await axios.post<Email[]>('/api/classify', { openAIKey, emails });
        console.log(res.data, 'emails se');
        
        // setEmails(res.data);
    };

    useEffect(() => {
        const storedKey = localStorage.getItem("OPENAI");
        const getemail = async() =>{
          const res = await axios.get(`/api/emails?count=${emailCount}`);
          localStorage.setItem("emails", res.data);
          setEmails(res.data);
          setLoading(false);
        }
        getemail();
        if (storedKey) {
            setOpenAIKey(storedKey);
        }
    }, []);

    const img = session?.user?.image;
    return (
      <>
      <div className="flex justify-end mt-6">
        <button className="p-2 bg-red-500 text-white rounded" onClick={() => signOut()}>Sign out</button>
      </div>
      {session && !loading? (
              <div className="flex">
                <div className="container mx-auto p-4">
                  {/* <button onClick={() => signOut()}>Sign out</button> */}
                  <div className="flex">
                    {img && (
                            <div className="mb-4">
                                <Image src={img} alt="User Image" width={50} height={50} className="rounded-full" />
                            </div>
                    )}
                    <div className="ml-6">
                      <div className="text-2xl">{session.user?.name}</div>
                      <div>{session.user?.email}</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    {/* <button onClick={fetchEmails} className="mt-4 p-2 bg-blue-500 text-white rounded">Fetch Emails</button> */}
                    <div className="flex items-center">
                      <button onClick={fetchEmails} className="p-2 bg-blue-500 text-white rounded">Fetch Emails</button>
                      <select 
                        className="ml-4 p-2 border text-black rounded"
                        value={emailCount} 
                        onChange={(e) => setEmailCount(Number(e.target.value))}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <button onClick={classifyEmails} className="mt-4 p-2 bg-green-500 text-white rounded">Classify Emails</button>
                  </div>
                  <div className="mt-4 h-[32rem] overflow-y-auto">
                    {emails.map((email) => (
                      <div key={email.id} onClick={() => setSelectedEmail(email)} className="p-2 rounded-lg m-2 border-2 border-cyan-300">
                        <h2>From: {email.from}</h2>
                        <h3>Subject: {email.subject}</h3>
                        <p>{email.snippet}</p>
                        { email.category?<p className="text-sm text-gray-600">Category: {email.category}</p>:<></>}                
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                {selectedEmail && 
                <div className="fr py-4 border-l text-wrap w-full">
                  <EmailDetail email={selectedEmail}/>  
                </div>
                }
                </div>
              </div>
            ):
          <div> loading {loading}</div>}
      </>
    )
}

export default Emails