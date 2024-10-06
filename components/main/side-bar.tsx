import Link from "next/link"
import ChatsList from "./chats/chat-list"
import ProfilePreview from "./profile/profile-preview"

const SideBar = async () => {
  return (
    <section className="flex flex-col">
      <ProfilePreview />
      <ChatsList />
      <Link className="mt-12 pb-4" href={"/chats/create"}>
        Create Chat
      </Link>
      <Link className="pb-4" href={"/chats/group-chat/create"}>
        Create Group Chat
      </Link>
    </section>
  )
}

export default SideBar
