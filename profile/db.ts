import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const createProfile = async (profile: {
  email?: string
  id?: string
}) => {
  const { data: profileData } = await supabase
    .from("profile")
    .select()
    .eq("id", profile.id)
    .single()
  if (profileData) return
  const { error } = await supabase
    .from("profile")
    .insert({ ...profile, name: profile.email })
    .select()
  return
}

export const getProfile = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) return null
  const { data: profileData, error: profileError } = await supabase
    .from("profile")
    .select()
    .eq("id", userData.user.id)
    .single()
  if (profileError) return null
  return profileData
}
