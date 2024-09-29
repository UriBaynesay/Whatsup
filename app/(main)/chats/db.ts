import { createClient } from "@/utils/supabase/server"

const CHAT_TABLE = "chat"
const CHAT_PROFILE = "chat_profile"

interface ChatDetailsForList {
    chat_id: string
    profile: {
      created_at: string
      email: string | null
      id: string
      name: string
      profile_image: string | null
    } | null
    latestMessage:
      | {
          created_at: string
          content: string
          profile_id: string
          chat_id: string
        }
      | undefined
  }

export const getUserChatsPartners = async (userId?: string) => {
  const supabase = createClient()
  const { data: chatIdsData, error: chatIdsError } = await supabase
    .from(CHAT_PROFILE)
    .select("chat_id")
    .eq("profile_id", userId!)
  if (chatIdsError) return null
  const chatIds = chatIdsData.map((chatId) => chatId.chat_id)
  const { data: chatData, error: chatError } = await supabase
    .from(CHAT_PROFILE)
    .select("chat_id, profile(*)")
    .in("chat_id", chatIds)
  if (chatError) return null
  const { data: latestMessages, error: latestMessagesError } = await supabase
    .from("message")
    .select("created_at,content,profile_id,chat_id")
    .order("created_at", { ascending: false })
    .in("chat_id", chatIds)
  if (latestMessagesError) return null
  const result = chatData.filter((chat) => chat.profile?.id !== userId) as ChatDetailsForList[]
  result.forEach((chat) => {
    const currChatLatestMessage = latestMessages.find(
      (message) => message.chat_id === chat.chat_id
    )
    chat.latestMessage = currChatLatestMessage
    return chat
  })

  return result
}

export const createChat = async (userId: string, partnerId: string) => {
  const supabase = createClient()
  const userChatPartners = await getUserChatsPartners(userId)
  if (userChatPartners?.some((chat) => chat.profile?.id === partnerId))
    return null
  const { data: chat, error: chaterror } = await supabase
    .from(CHAT_TABLE)
    .insert({})
    .select()
    .single()
  if (chaterror) return null
  const { statusText, error: chatProfileError } = await supabase
    .from(CHAT_PROFILE)
    .insert([
      { chat_id: chat.id, profile_id: userId },
      { chat_id: chat?.id, profile_id: partnerId },
    ])
  if (chatProfileError) return null
  return chat
}

export const getChatPartners = async (chatId: string) => {
  const supabase = createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError) return null

  const { data: partners, error: partnersError } = await supabase
    .from(CHAT_PROFILE)
    .select("profile(*)")
    .eq("chat_id", chatId)
    .neq("profile_id", user?.id)
    .single()
  if (partnersError) return null
  return partners
}
