"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { createChat, getUserChatsPartners } from "./db"
import { getProfileByEmail } from "../profile/db"



export const getUserChatsAction = async () => {
  const supabase = createClient()
  const {
    data,
    error,
  } = await supabase.auth.getUser()
  if (error) redirect("/sign-in")
  return await getUserChatsPartners(data.user.id)
}

export const createChatAction = async (formData: FormData) => {
  const supabase = createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) redirect("/sign-in")
  const email = formData.get("email")?.toString()
  const partnerProfile = await getProfileByEmail(email)
  if (!partnerProfile) return
  const chat = await createChat(userData.user.id, partnerProfile.id)
  if (chat) redirect(`/chats/${chat.id}`)
  return null
}
