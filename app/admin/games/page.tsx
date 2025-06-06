import { createClient } from "@/utils/supabase/server";

export default async function Games() {
  const supabase = await createClient();
  const { data: players } = await supabase.from("games").select();

  return <pre>{JSON.stringify(players, null, 2)}</pre>;
}
