import { createClient } from "@/utils/supabase/server"

const TABLE = "profile"

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
