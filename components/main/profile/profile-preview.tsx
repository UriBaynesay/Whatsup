import { getProfile } from "@/app/(main)/profile/db"
import Image from "next/image"
import Link from "next/link"

const ProfilePreview = async () => {
  const profile = await getProfile()
  return (
    <Link className="flex mb-2" href={"/profile/edit"}>
      <Image
        className="rounded-full self-center"
        src={profile?.profile_image as string}
        width={36}
        height={36}
        alt="Profile Image"
      />
      <div>
        <h1 className="ml-2">{profile?.name}</h1>
        <small className="text-gray-300">{`@${profile?.email}`}</small>
      </div>
    </Link>
  )
}

export default ProfilePreview
