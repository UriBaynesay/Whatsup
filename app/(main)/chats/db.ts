import { createClient } from "@/utils/supabase/server"

const CHAT_TABLE = "chat"
const CHAT_PROFILE = "chat_profile"

export const getUserChatsPartners = async (userId?: string) => {
  const supabase = createClient()
  const { data: chatIdsData, error: chatIdsError } = await supabase
    .from(CHAT_PROFILE)
    .select("chat_id")
    .eq("profile_id", userId!)
  if (chatIdsError) return null
  const chatIds = chatIdsData.map(chatId=>chatId.chat_id)
  const { data: chatData, error: chatError } = await supabase
    .from(CHAT_PROFILE)
    .select("chat_id, profile(*)")
    .in("chat_id", chatIds)
  if (chatError) return null
  return chatData.filter((chat) => chat.profile?.id !== userId)
}

export const createChat = async (userId: string, partnerId: string) => {
  const supabase = createClient()
  const userChatPartners = await getUserChatsPartners(userId)
  if (userChatPartners?.some((chat) => chat.profile?.id === partnerId))
    return null
  const { data:chat,error: chaterror } = await supabase
    .from(CHAT_TABLE)
    .insert({}).select().single()
  if (chaterror) return null
  const { statusText, error: chatProfileError } = await supabase
    .from(CHAT_PROFILE)
    .insert([
      { chat_id: chat.id, profile_id: userId },
      { chat_id: chat?.id, profile_id: partnerId },
    ])
  if(chatProfileError) return null
  return chat
}
