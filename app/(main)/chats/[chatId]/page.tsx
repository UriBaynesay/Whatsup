
import ChatHeaderPreview from "@/components/main/chats/messages/chat-header-preview"
import CreateMessageForm from "@/components/main/chats/messages/create-message-form"
import MessageList from "@/components/main/chats/messages/message-list"

const ChatPage = ({params:{chatId}}:{params:{chatId:string}}) => {
  return (
    <section className="grow flex flex-col mx-14">
      <ChatHeaderPreview chatId={chatId}/>
      <MessageList chatId={chatId} />
      <CreateMessageForm chatId={chatId} />
    </section>
  )
}

export default ChatPage
