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
import { createGroupChatAction } from "../../actions"

const CreateGroupChatPage = () => {
  return (
    <section className="grow flex justify-center items-start">
      <Card>
        <CardHeader>
          <CardTitle>Create group chat</CardTitle>
          <CardDescription>
            Start a new conversation with your friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col min-w-64 items-center"
            action={createGroupChatAction}
          >
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Group chat title"
                required
              />
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="Contacts email" required />
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default CreateGroupChatPage
