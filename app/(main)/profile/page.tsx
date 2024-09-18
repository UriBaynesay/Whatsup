import { getProfile } from "@/app/(main)/profile/db"

const ProfilePage = async () => {
    const profile = await getProfile()
  return (
    <main>
      <h2>Hello : {profile.name}</h2>
    </main>
  )
}

export default ProfilePage
