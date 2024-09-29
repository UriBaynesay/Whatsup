import { getProfile } from "@/app/(main)/profile/db"
import Image from "next/image"
import Link from "next/link"

const ProfilePreview = async () => {
  const user = await getProfile()
  return (
    <Link className="flex mb-2" href={"/profile/edit"}>
      <Image
        className="rounded-full"
        src={user?.profile_image as string}
        width={36}
        height={36}
        alt="Profile Image"
      />
      <h1 className="ml-2">{user?.name}</h1>
    </Link>
  )
}

export default ProfilePreview
