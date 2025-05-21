import { createClient } from "@/utils/supabase/server";

export default async function Tournaments() {
  const supabase = await createClient();
  const { data: players } = await supabase.from("tournaments").select();

  return <pre>{JSON.stringify(players, null, 2)}</pre>;
}
