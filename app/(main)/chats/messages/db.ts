import { createClient } from "@/utils/supabase/server"

export const createMessage = async (
  chatId: string,
  userId: string,
  content: string
) => {
  const supabase = createClient()
  const { error } = await supabase
    .from("message")
    .insert({ chat_id: chatId, content, profile_id: userId })
  if (error) {
    console.log(error)
    throw error
  }
}

export const getMessagesOfChat = async (chatId: string) => {
  const supabase = createClient()
  const { data: messagesOfChat, error: messagesOfChatError } = await supabase
    .from("message")
    .select("created_at,content, profile(id, name, profile_image)")
    .eq("chat_id", chatId)
  if (messagesOfChatError) return null
  return messagesOfChat
}
