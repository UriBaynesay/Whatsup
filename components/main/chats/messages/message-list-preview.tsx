"use client"

import Image from "next/image"
import { Message } from "./message-list"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

const MessageListPreview = ({ message }: { message: Message }) => {
  const [userId, setUserId] = useState<string>()
  const supabase = createClient()
  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) redirect("/sign-in")
    setUserId(data.user.id)
  }
  return (
    <li
      className={`flex ${userId != message.profile?.id && "flex-row-reverse"}`}
    >
      <Image
        src={message.profile?.profile_image as string}
        alt="Profile image"
        height={36}
        width={36}
        className="rounded-full self-end shadow-md"
      />
      <div className="mx-3 bg-white rounded-lg p-4 shadow-md">
        <span className="text-lg font-semibold">{message.profile?.name}</span>
        <p className="font-medium">{message.content}</p>
        <small className="text-gray-700">
          {new Date(message.created_at).toLocaleTimeString()}
        </small>
      </div>
    </li>
  )
}

export default MessageListPreview
