import { getChatPartners, getChatTitleAndImage } from "@/app/(main)/chats/db"
import { Profile } from "@/app/(main)/profile/db"
import Image from "next/image"
import Link from "next/link"
import AddIcon from "@/app/public/add.png"

const ChatHeaderPreview = async ({ chatId }: { chatId: string }) => {
  const chatDetailsPromise = getChatTitleAndImage(chatId)
  const partnersPromise = getChatPartners(chatId)
  const [chatDetails, partners] = await Promise.all([
    chatDetailsPromise,
    partnersPromise as Promise<Profile[]>,
  ])
  return (
    <div className="flex items-center py-5 bg-gray-100 px-2 rounded-t-md shadow-md">
      {!chatDetails?.title ? (
        <>
          <Image
            alt="Profile Image"
            src={partners[0].profile?.profile_image as string}
            height={36}
            width={36}
            className="rounded-full me-3"
          />
          <h2>{partners[0].profile?.name}</h2>
        </>
      ) : (
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <Image
              alt="Chat Image"
              src={chatDetails?.group_chat_image as string}
              height={36}
              width={36}
              className="rounded-full me-3"
            />
            <h2>{chatDetails?.title}</h2>
          </div>

          <Link href={`/chats/group-chat/${chatId}`}>
            <Image src={AddIcon} alt="Add member" height={36} width={36} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default ChatHeaderPreview
