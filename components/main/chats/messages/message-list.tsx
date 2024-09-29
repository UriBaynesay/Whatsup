"use client"

import { getMessagesOfChatAction } from "@/app/(main)/chats/messages/action"
import { useEffect, useState } from "react"
import MessageListPreview from "./message-list-preview"
import { createClient } from "@/utils/supabase/client"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface Message {
  created_at: string
  content: string
  profile: {
    id: string
    name: string
    profile_image: string | null
  } | null
}

const MessageList = ({ chatId }: { chatId: string }) => {
  const [messages, setMessage] = useState<Message[]>([])
  const supabase = createClient()

  useEffect(() => {
    const updatesChannel = supabase
      .channel(chatId)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
        },
        ({ errors, new: newMessage }) => {
          if (!errors) loadMessages()
        }
      )
      .subscribe()
    loadMessages()
    return () => {
      updatesChannel.unsubscribe()
    }
  }, [])

  const loadMessages = async () => {
    try {
      const fetchedMessage = await getMessagesOfChatAction(chatId)
      if (fetchedMessage) setMessage(fetchedMessage)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="grow h-full bg-chat-background rounded-b-md shadow-md">
      {!!messages.length && (
        <ScrollArea>
          <ul className="p-2">
            {messages.map((message) => (
              <MessageListPreview key={message.created_at} message={message} />
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  )
}

export default MessageList
