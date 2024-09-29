import { Button } from "@/components/ui/button"
import { signOutAction } from "../(auth-pages)/auth/actions"
import Link from "next/link"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full flex flex-col px-12 z-10 bg-white">
      <header className="flex justify-between items-center pt-6 mb-4">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">Whats up</h1>
        </Link>
        <form action={signOutAction}>
          <Button>Sign out</Button>
        </form>
      </header>
      {children}
    </div>
  )
}
