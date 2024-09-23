import Link from "next/link"
import ChatsList from "./chats/chat-list"

const SideBar = () => {
  return (
    <section className="flex flex-col">
      <ChatsList />
      <Link className="mt-12 pb-4" href={"/chats/create"}>Create Chat</Link>
    </section>
  )
}

export default SideBar