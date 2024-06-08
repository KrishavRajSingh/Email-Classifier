"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export const Appbar = () => {
    const session = useSession();
    return <div>
        <button onClick={() => {
            signIn()
        }}>
            signin
        </button>
        <button onClick={() => {
            signOut()
        }}>
            signout
        </button>
        {/* {JSON.stringify(session)} */}
    </div>
}