import { createClient } from "@/utils/supabase/server";

export default async function TeamPlayers() {
  const supabase = await createClient();
  const { data: players } = await supabase.from("team_players").select();

  return <pre>{JSON.stringify(players, null, 2)}</pre>;
}
