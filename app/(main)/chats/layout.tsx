import ChatsList from "@/components/main/chats/chat-list"

const ChatPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full flex">
      <ChatsList />
      {children}
    </main>
  )
}

export default ChatPageLayout
