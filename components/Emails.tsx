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
    const [apiKey, setApiKey] = useState<String | null>(null);
    const [emailCount, setEmailCount] = useState<number>(5);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    
    const fetchEmails = async () => {
        if (session) {
          setLoading(true);
          const res = await axios.get<Email[]>(`/api/emails?count=${emailCount}`);
          localStorage.setItem("emails", JSON.stringify(res.data));
          setEmails(res.data);
          setLoading(false);
        }
    };
    
    const classifyEmails = async () => {
        setLoading(true);
        const res = await axios.post<Email[]>('/api/classify', { apiKey, emails });
        console.log(res.data, 'emails se');     
        setEmails(res.data);
        setLoading(false);
    };
    
    useEffect(() => {
        const storedKey = localStorage.getItem("ApiKey");
        const getemail = async() =>{
          const email = localStorage.getItem("emails");
          if(!email){
            const res = await axios.get(`/api/emails?count=${emailCount}`);
            localStorage.setItem("emails", JSON.stringify(res.data));
            setEmails(res.data);
          }else{
            setEmails(JSON.parse(email));
          }
          setLoading(false);
        }
        getemail();
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);

    const img = session?.user?.image;
    return (
      <>
      <div className="flex justify-end mt-6">
        <button className="p-2 border-red-500 border-2 text-red-300 rounded" onClick={() => signOut()}>Sign out</button>
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
                    <div className="flex items-center">
                      <button onClick={fetchEmails} className="p-2 border-2 bg-dark-200 border-blue-500 text-blue-300 rounded">Fetch Emails</button>
                      <select 
                        className="ml-4 p-2 border text-black rounded"
                        value={emailCount} 
                        onChange={(e) => setEmailCount(Number(e.target.value))}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                      </select>
                    </div>
                    <button onClick={classifyEmails} className="mt-4 p-2 border-2 border-green-500 text-green-300 rounded">Classify Emails</button>
                  </div>
                  <div className="mt-4 h-[32rem] overflow-y-auto">
                    {emails.map((email) => (
                      <div key={email.id} onClick={() => setSelectedEmail(email)} className="p-2 cursor-pointer rounded-lg m-2 border-2 border-cyan-300">
                        <div className="flex justify-between">
                          <h2>From: {email.from}</h2>
                          { email.category?<p className="text-sm border-dashed border-orange-500 border-2 p-2 rounded-full text-purple-400">{email.category}</p>:<></>}                
                        </div>
                        <h3>Subject: {email.subject}</h3>
                        <p>{email.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                {selectedEmail && 
                <div className="fr py-4 border-l text-wrap w-full">
                  <div className="flex justify-between items-center">
                  { 
                  selectedEmail.category?<p className="text-sm border-dashed border-orange-500 border-2 h-6 flex items-center m-3 p-2 rounded-full text-purple-400">{selectedEmail.category}</p>
                  :<></>
                  }
                    <button className="bg-red-500 w-4 m-2 p-2 w-8 text-center" onClick={() => setSelectedEmail(null)}>X</button>
                  </div>
                  <EmailDetail email={selectedEmail}/>  
                </div>
                }
                </div>
              </div>
            ):
          <div className="flex justify-center items-center"> 
            <div className="animate-pulse">
              loading</div>
          </div>
          }
      </>
    )
}

export default Emails