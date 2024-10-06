"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "../../ui/scroll-area"
import { getUserChatsAction } from "@/app/(main)/chats/actions"
import ChatListPreview from "./chat-list-preview"
import { ChatDetailsForList } from "@/app/(main)/chats/db"

const ChatsList = () => {
  const [chats, setChats] = useState<ChatDetailsForList[] | null>()

  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = async () => {
    const fetchedChats = await getUserChatsAction()
    setChats(fetchedChats)
  }
  return (
    <div className="grow">
      <ScrollArea className="h-full w-[350px]  p-4">
        {chats && (
          <ul>
            <h3 className="text-lg font-semibold mb-6">Chats</h3>
            {chats.map((chat) => {
              return <ChatListPreview key={chat?.chat?.id} chat={chat} />
            })}
          </ul>
        )}
      </ScrollArea>
    </div>
  )
}

export default ChatsList
