import { supabase } from '../utils/supabase'

export const expenseService = {
  getExpensesByUserId: async (userId) => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      
    if (error) {
      console.error("Error fetching expenses:", error)
      return []
    }
    return data
  },

  addExpense: async (expenseText, rate, date, userId) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          expense_text: expenseText,
          rate,
          date,
          user_id: userId
        }
      ])
      .select()
      .single()

    if (error) {
      console.error("Error adding expense:", error)
      throw error
    }
    return data
  },

  updateExpense: async (id, updates) => {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error("Error updating expense:", error)
      throw error
    }
    return data
  },

  deleteExpense: async (id) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Error deleting expense:", error)
      throw error
    }
  }
}
