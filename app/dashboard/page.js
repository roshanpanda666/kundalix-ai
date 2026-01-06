import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "./logoutbutton";



export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
            <div className="min-h-screen  text-white flex justify-center items-center flex-col bg-gradient-to-br from-[#020617] via-blue-950 to-[#020617]">
        
        <h1 className="text-2xl">
          Welcome, {session.user.username} 🚀
        </h1>
  
        <LogoutButton />
      </div>
    </>
    
  );
}
