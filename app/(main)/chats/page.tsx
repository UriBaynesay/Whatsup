import { redirect } from "next/navigation"
import { getProfile } from "../profile/db"

const ChatsPage = async () => {
  const profile = await getProfile()
  if (!profile) redirect("/sign-in")
  return (
    <section className="grow">
      <h2>Hello {profile?.name}</h2>
    </section>
  )
}

export default ChatsPage
