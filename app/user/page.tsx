import { getServerSession } from "next-auth"

export default async function User() {
    const session = await getServerSession();
    return <div>
        Server
        {JSON.stringify(session)}
    </div>
}