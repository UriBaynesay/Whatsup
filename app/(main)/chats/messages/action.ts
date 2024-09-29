"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createMessage, getMessagesOfChat } from "./db"
import { revalidatePath } from "next/cache"

interface State {
  message:
    | {
        chatId?: string[] | undefined
        userId?: string[] | undefined
        content?: string[] | undefined
      }
    | { message: string }
    | undefined
}

const MessageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  chatId: z.string(),
  content: z.string(),
  created_at: z.string(),
})

const CreateMessageSchema = MessageSchema.omit({ id: true, created_at: true })
export const createMessageAction = async (
  chatId: string,
  prevState: State,
  formData: FormData
): Promise<State> => {
  const supabase = createClient()
  const { data: user, error: userError } = await supabase.auth.getUser()
  if (userError || !user) redirect("/sign-in")
  const validateInput = CreateMessageSchema.safeParse({
    userId: user.user.id,
    chatId,
    content: formData.get("content"),
  })
  if (validateInput.error) {
    return { message: validateInput.error.flatten().fieldErrors }
  }
  const { userId, content } = validateInput.data
  try {
    await createMessage(chatId, userId, content)
  } catch (error) {
    return { message: { message: "Can't send message at the moment" } }
  }
  return { message: {} }
}

export const getMessagesOfChatAction = (chatId: string) => {
  return getMessagesOfChat(chatId)
}
