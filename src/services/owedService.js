import { supabase } from '../utils/supabase'

export const owedService = {
  getOwedForUser: async (userId) => {
    const { data, error } = await supabase
      .from('owed')
      .select('*')
      .or(`owed_by.eq.${userId},owed_to.eq.${userId}`)
      .order('expense_date', { ascending: false })
      
    if (error) {
      console.error("Error fetching owed items:", error)
      return []
    }
    return data
  },

  addOwed: async (expenseText, rate, expenseDate, owedBy, owedTo) => {
    const { data, error } = await supabase
      .from('owed')
      .insert([
        {
          expense_text: expenseText,
          rate,
          expense_date: expenseDate,
          owed_by: owedBy,
          owed_to: owedTo,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error("Error adding owed item:", error)
      throw error
    }
    return data
  },

  updateOwedStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('owed')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error("Error updating owed status:", error)
      throw error
    }
    return data
  },

  updateOwed: async (id, updates) => {
    const { data, error } = await supabase
      .from('owed')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error("Error updating owed item:", error)
      throw error
    }
    return data
  },

  deleteOwed: async (id) => {
    const { error } = await supabase
      .from('owed')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Error deleting owed item:", error)
      throw error
    }
  }
}
