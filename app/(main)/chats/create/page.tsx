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
import { createChatAction } from "../actions"

const CreateChatPage = () => {
  return (
    <section className="grow flex justify-center items-start">
      <Card>
        <CardHeader>
          <CardTitle>Create chat</CardTitle>
          <CardDescription>
            Start a new conversation with your friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col min-w-64 items-center"
            action={createChatAction}
          >
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="Contacts email" required />
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default CreateChatPage
