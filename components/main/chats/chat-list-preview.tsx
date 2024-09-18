import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { ChatIdAndProfile } from "./chat-list"

const ChatListPreview = ({ chat }: { chat: ChatIdAndProfile }) => {
  return (
    <li>
      <Link href={`/chats/${chat.chat_id}`} className="flex items-center mb-3">
        <Image
          className="rounded-full mr-2"
          src={chat.profile?.profile_image!}
          height={42}
          width={42}
          alt="Profile Image"
        />
        {chat.profile?.name}
      </Link>
      <Separator />
    </li>
  )
}

export default ChatListPreview
