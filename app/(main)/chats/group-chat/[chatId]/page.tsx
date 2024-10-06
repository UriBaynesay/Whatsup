import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getChatTitleAndImage } from "../../db"
import { addMemberToGroupChatAction } from "../../actions"

const AddMembersPage = async ({params}:{params:{chatId:string}}) => {
  const chatDetails = await getChatTitleAndImage(params.chatId)
  return (
    <section className="grow flex justify-center items-start">
      <Card>
        <CardHeader>
          <CardTitle>Add members</CardTitle>
          <CardDescription>
            Add members to <span className="font-bold">{chatDetails?.title}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col min-w-64 items-center" action={addMemberToGroupChatAction}>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <input type="text" hidden defaultValue={params.chatId} name="id"/>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Contacts email"
                required
              />
              <Button type="submit">Add</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default AddMembersPage
