"use client"

import { createMessageAction } from "@/app/(main)/chats/messages/action"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"
import { useFormState } from "react-dom"

const CreateMessageForm = ({ chatId }: { chatId: string }) => {
  const formEl=useRef<HTMLFormElement|null>()
  const [state, formAction] = useFormState(
    createMessageAction.bind(null, chatId),
    { message: { message: "" } }
  )
  return (
    <div className="pb-12 flex flex-col items-center mt-4">
      <form
        ref={(el) => (formEl.current = el)}
        action={formAction}
        className="flex flex-col gap-3 items-start"
      >
        <Textarea
          className="w-[340px]"
          placeholder="Type your message here."
          id="content"
          name="content"
          required
        />
        <Button>Send</Button>
      </form>
    </div>
  )
}

export default CreateMessageForm
