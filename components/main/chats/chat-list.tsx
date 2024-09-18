"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "../../ui/scroll-area"
import { getUserChatsAction } from "@/app/(main)/chats/actions"
import Link from "next/link"
import ChatListPreview from "./chat-list-preview"

export interface ChatIdAndProfile {
        chat_id: string
        profile: {
          created_at: string
          email: string | null
          id: string
          name: string
          profile_image: string | null
        } | null
}

const ChatsList = () => {
  const [chats, setChats] = useState<
    | ChatIdAndProfile[]
    | null
  >()

  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = async () => {
    const fetchedChats = await getUserChatsAction()
    setChats(fetchedChats)
  }
  return (
    <section>
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        {chats && (
          <ul>
            <h3 className="text-lg font-semibold mb-6">Chats</h3>
            {chats.map((chat) => {
              return (
                <ChatListPreview key={chat.chat_id} chat={chat}/>
              )
            })}
          </ul>
        )}
      </ScrollArea>
      <Link href={"/chats/create"}>Create Chat</Link>
    </section>
  )
}

export default ChatsList
