import { createClient } from "@/utils/supabase/server";

export default async function Teams() {
  const supabase = await createClient();
  const { data: teams } = await supabase.from("teams").select();

  return <pre>{JSON.stringify(teams, null, 2)}</pre>;
}
