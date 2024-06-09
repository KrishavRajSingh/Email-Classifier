import Emails from "@/components/Emails";
import { Signin } from "@/components/Signin";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  
  return (
    <main className="flex items-center justify-center p-24 h-screen ">
      {session==null?<div>
        <Signin/>
        </div>:
      <div className="h-screen w-screen">
        <Emails/>
      </div>}
    </main>
  );
}
