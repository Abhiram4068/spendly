import { supabase } from '../utils/supabase'

export const authService = {
  signUp: async (email, password, username) => {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    })
  },

  signIn: async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password })
  },

  signOut: async () => {
    return supabase.auth.signOut()
  },

  getSession: async () => {
    return supabase.auth.getSession()
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  },

  getAllUsers: async () => {
    const { data, error } = await supabase.from('users').select('id, username')
    if (error) {
      console.error("Error fetching users:", error)
      return []
    }
    return data
  }
}
