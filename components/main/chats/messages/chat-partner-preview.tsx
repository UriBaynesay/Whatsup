import { getChatPartners } from "@/app/(main)/chats/db"
import Image from "next/image"
import { redirect } from "next/navigation"

const ChatPartnerPreview = async ({ chatId }: { chatId: string }) => {
  const partners = await getChatPartners(chatId)
  if (!partners) redirect("/chats")
  return (
    <div className="flex items-center py-5 bg-gray-100 px-2 rounded-t-md shadow-md">
      <Image alt="Profile Image" src={partners.profile?.profile_image!} height={36} width={36}
       className="rounded-full me-3"/>
      <h2>{partners.profile?.name}</h2>
    </div>
  )
}

export default ChatPartnerPreview
