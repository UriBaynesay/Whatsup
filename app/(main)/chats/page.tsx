import { getProfile } from "../profile/db"

const ChatsPage = async () => {
  const profile = await getProfile()
  return (
    <section className="grow">
      <h2>Hello {profile?.name}</h2>
    </section>
  )
}

export default ChatsPage
