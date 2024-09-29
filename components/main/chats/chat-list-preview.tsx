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
        <div>
          <h1>{chat.profile?.name}</h1>
          <div className="flex justify-between">
            <p>{chat.latestMessage?.content}</p>
            <small className="text-gray-400">
              {chat.latestMessage?.created_at &&
                new Date(
                  chat.latestMessage?.created_at as string
                ).toLocaleTimeString()}
            </small>
          </div>
        </div>
      </Link>
      <Separator />
    </li>
  )
}

export default ChatListPreview
