import SideBar from "@/components/main/side-bar"

const ChatPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full flex">
      <SideBar />
      {children}
    </main>
  )
}

export default ChatPageLayout
