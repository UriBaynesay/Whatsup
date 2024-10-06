import { createClient } from "@/utils/supabase/server"

const TABLE = "profile"

export interface Profile {
  profile: {
    created_at: string
    email: string | null
    id: string
    name: string
    profile_image: string | null
  } | null
}

export const createProfile = async (user: { email?: string; id?: string }) => {
  const supabase = createClient()
  const { data: profileData } = await supabase
    .from(TABLE)
    .select()
    .eq("id", user.id!)
    .single()
  if (profileData) return
  const { error } = await supabase
    .from(TABLE)
    .insert({ ...user, name: user.email })
    .select()
  return
}

export const getProfile = async () => {
  const supabase = createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) return null
  const { data: profileData, error: profileError } = await supabase
    .from(TABLE)
    .select()
    .eq("id", userData.user.id)
    .single()
  if (profileError) return null
  return profileData
}

export const editProfile = async (
  profile_id: string,
  name: string,
  profile_image?: File
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("profile")
    .update({ name })
    .eq("id", profile_id)
  if (profile_image?.size) {
    const { data: profileImageExits, error: profileImageExitsError } =
      await supabase.storage
        .from("profile_images")
        .exists(`${profile_id}_profile_image`)
    if (!profileImageExits) {
      const { data, error } = await supabase.storage
        .from("profile_images")
        .upload(`${profile_id}_profile_image`, profile_image)
      if (error) return null
      const { data: imageUrl } = supabase.storage
        .from("profile_images")
        .getPublicUrl(data.path)
      return await supabase
        .from("profile")
        .update({ profile_image: imageUrl.publicUrl })
        .eq("id", profile_id)
    }
    const { data, error } = await supabase.storage
      .from("profile_images")
      .update(`${profile_id}_profile_image`, profile_image)
    if (error) return null
    const { data: imageUrl } = supabase.storage
      .from("profile_images")
      .getPublicUrl(data.path)
    return await supabase
      .from("profile")
      .update({ profile_image: imageUrl.publicUrl })
      .eq("id", profile_id)
  }
  return data
}

export const getProfileByEmail = async (email?: string) => {
  const supabase = createClient()
  const { data: profile, error } = await supabase
    .from(TABLE)
    .select()
    .eq("email", email!)
    .single()
  if (error) return null
  return profile
}
