import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { ChatDetailsForList } from "@/app/(main)/chats/db"

const ChatListPreview = ({ chat }: { chat: ChatDetailsForList }) => {
  return (
    <li>
      <Link href={`/chats/${chat.chat?.id}`} className="flex items-center my-3">
        <Image
          className="rounded-full mr-2"
          src={chat.chat?.type==="group"?chat.chat.group_chat_image as string:chat.profile?.profile_image as string}
          height={42}
          width={42}
          alt="Profile Image"
        />
        <div>
          <h1>{chat.chat?.type==="group"?chat.chat.title:chat.profile?.name}</h1>
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
