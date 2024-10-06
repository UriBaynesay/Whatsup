import { createClient } from "@/utils/supabase/server"
import { getProfileByEmail } from "../profile/db"

const CHAT_TABLE = "chat"
const CHAT_PROFILE = "chat_profile"

export interface ChatDetailsForList {
  chat: {
    type: string
    title: string | null
    group_chat_image: string | null
    id: string
  } | null
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

export const getUserChats = async (userId?: string) => {
  const supabase = createClient()
  const { data: chatIdsData, error: chatIdsError } = await supabase
    .from(CHAT_PROFILE)
    .select("chat_id")
    .eq("profile_id", userId!)
  if (chatIdsError) return null
  const chatIds = chatIdsData.map((chatId) => chatId.chat_id)
  const { data: chatData, error: chatError } = await supabase
    .from(CHAT_PROFILE)
    .select("chat(type,title,id,group_chat_image), profile(*)")
    .in("chat_id", chatIds)
  if (chatError) return null
  const { data: latestMessages, error: latestMessagesError } = await supabase
    .from("message")
    .select("created_at,content,profile_id,chat_id")
    .order("created_at", { ascending: false })
    .in("chat_id", chatIds)
  if (latestMessagesError) return null
  const result = chatData.filter(
    (chat) => chat.profile?.id !== userId
  ) as ChatDetailsForList[]
  result.forEach((chat) => {
    const currChatLatestMessage = latestMessages.find(
      (message) => message.chat_id === chat.chat?.id
    )
    chat.latestMessage = currChatLatestMessage
  })

  return result
}

export const createChat = async (userId: string, partnerId: string) => {
  const supabase = createClient()
  const userChatPartners = await getUserChats(userId)
  if (userChatPartners?.some((chat) => chat.profile?.id === partnerId))
    return null
  const { data: chat, error: chaterror } = await supabase
    .from(CHAT_TABLE)
    .insert({ type: "direct" })
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
  if (partnersError) return null
  return partners
}

export const createGroupChat = async (
  userId: string,
  title: string,
  partnerEmail: string
) => {
  const supabase = createClient()
  const { data: chat, error: chaterror } = await supabase
    .from(CHAT_TABLE)
    .insert({
      title,
      type: "group",
      group_chat_image:
        "https://rskqekvnpfrkjgyztscg.supabase.co/storage/v1/object/public/profile_images/group-of-people.png",
    })
    .select()
    .single()
  if (chaterror) return null
  const partnerProfile = await getProfileByEmail(partnerEmail)
  const { statusText, error: chatProfileError } = await supabase
    .from(CHAT_PROFILE)
    .insert([
      { chat_id: chat.id, profile_id: userId, admin: true },
      { chat_id: chat.id, profile_id: partnerProfile?.id, admin: false },
    ])
  if (chatProfileError) return null
  return chat
}

export const getChatTitleAndImage = async (chatId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(CHAT_TABLE)
    .select("title, group_chat_image")
    .eq("id", chatId)
    .single()
  if (error) return null
  return data
}

export const isUserAdmin = async (chatId: string, userId: string) => {
  const supabase = createClient()
  const { data: isAdmin, error: isAdminError } = await supabase
    .from(CHAT_PROFILE)
    .select()
    .eq("chat_id", chatId)
    .eq("profile_id", userId)
    .eq("admin", true)
    .single()
    if(isAdmin) return true
    return false
}

export const addMemberToGroupChat = async (chatId:string, profileId:string)=>{
  const supabase = createClient()
  return await supabase.from(CHAT_PROFILE).insert({profile_id:profileId, admin:false, chat_id:chatId})
}