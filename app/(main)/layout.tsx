import { Button } from "@/components/ui/button"
import { signOutAction } from "../auth/actions"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="main-layout h-full flex flex-col px-12">
      <header className="flex justify-between items-center pt-6">
        <h1>Whatsup</h1>
        <form action={signOutAction}>
          <Button>Signout</Button>
        </form>
      </header>
      {children}
    </div>
  )
}
