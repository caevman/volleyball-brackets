import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";

type PageProps = {
  params: { id: string };
};

export default async function TournamentPage({ params }: PageProps) {
  const supabase = await createClient();
  const { id } = await params;

  // Fetch tournament
  const { data: tournament } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();

  if (!tournament) return notFound();

  // Fetch teams in the tournament
  const { data: teams } = await supabase
    .from("teams")
    .select("id, name")
    .eq("tournament_id", await id);

  // Fetch divisions in the tournament
  const { data: divisions } = await supabase
    .from("divisions")
    .select("*")
    .eq("tournament_id", await id);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{tournament.name}</h1>
        <p className="text-muted-foreground">{tournament.format}</p>
        <p>📍 {tournament.location}</p>
        <p>
          🗓{" "}
          {tournament.start_date &&
            format(new Date(tournament.start_date), "PPP")}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Divisions</h2>
        <ul className="space-y-2">
          {divisions?.length ? (
            divisions.map((division) => (
              <li
                key={division.id}
                className="border p-3 rounded bg-gray-50 dark:bg-gray-800"
              >
                {division.name}
              </li>
            ))
          ) : (
            <p className="text-muted-foreground">
              No divisions created for this tournament.
            </p>
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Signed-Up Teams</h2>
        <ul className="space-y-2">
          {teams?.length ? (
            teams.map((team) => (
              <li
                key={team.id}
                className="border p-3 rounded bg-gray-50 dark:bg-gray-800"
              >
                {team.name}
              </li>
            ))
          ) : (
            <p className="text-muted-foreground">No teams registered yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
