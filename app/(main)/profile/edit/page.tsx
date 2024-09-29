import { getProfile } from "@/app/(main)/profile/db"
import { SubmitButton } from "@/components/auth/submit-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editProfileAction } from "../action"
import { FormMessage, Message } from "@/components/auth/form-message"

const ProfileEdit = async ({ searchParams }: { searchParams: Message }) => {
  const profile = await getProfile()
  return (
    <main className="flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Edit your profile presentation</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col min-w-64 items-center ">
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={profile?.name}
                required
              />
              <Label htmlFor="profile_image">Name</Label>
              <Input
                type="file"
                id="profile_image"
                name="profile_image"
                accept="image"
              />
              <SubmitButton
                formAction={editProfileAction}
                pendingText="Editing"
              >
                Edit
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default ProfileEdit
