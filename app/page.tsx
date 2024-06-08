import { Appbar } from "@/components/Appbar";
import EmailServer from "@/components/EmailServer";
import Emails from "@/components/Emails";
import { OpenAI } from "@/components/OpenAi";
import { Signin } from "@/components/Signin";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="flex items-center justify-center p-24 h-screen">
      {session==null?<div>
        <Signin/>
        </div>:
      <div className="h-screen w-screen">
        <Emails/>
      </div>}
    </main>
  );
}
