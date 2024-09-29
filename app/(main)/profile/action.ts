"use server"

import { editProfile, getProfile } from "./db"
import { redirect } from "next/navigation"
import z from "zod"
import { revalidatePath } from "next/cache"

const ProfileSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  name: z.string({ invalid_type_error: "Please enter a valid name" }),
  profile_image: z.any(),
  email: z.string(),
})

const ProfileEditSchema = ProfileSchema.omit({
  id: true,
  created_at: true,
  email: true,
})
export const editProfileAction = async (formData: FormData) => {
  const profile = await getProfile()
  if (!profile) redirect("/sign-in")
  const validateForm = ProfileEditSchema.safeParse({
    name: formData.get("name"),
    profile_image: formData.get("profile_image"),
  })
  if (validateForm.error) return validateForm.error.flatten().fieldErrors
  const result = await editProfile(
    profile.id,
    validateForm.data.name,
    validateForm.data.profile_image
  )
  if (!result) return { message: "Unable to edit profile" }
  revalidatePath("/profile/edit")
}
