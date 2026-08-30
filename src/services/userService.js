import { supabase } from "../utils/supabase";

export async function addBalance(amount) {
  const { data, error } = await supabase.rpc("add_balance", {
    p_amount: Number(amount),
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getCurrentUserProfile() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, username, email, created_at, balance")
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
