import { Button } from "@/components/ui/button"
import { signOutAction } from "../(auth-pages)/auth/actions"
import ChatsList from "@/components/main/chats/chat-list"
import { redirect } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="main-layout h-full flex flex-col px-12 z-10 bg-white">
      <header className="flex justify-between items-center pt-6 mb-6">
        <h1 className="text-3xl font-bold">Whats up</h1>
        <form action={signOutAction}>
          <Button>Sign out</Button>
        </form>
      </header>
      {children}
    </div>
  )
}
