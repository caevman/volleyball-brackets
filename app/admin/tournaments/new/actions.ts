"use server";

import { Division } from "@/types/tournaments";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

export const createTournament = async ({
  name,
  location,
  startDate,
  tournamentDivisions,
}) => {
  const tournamentId = randomUUID();
  const foramttedStartDate = startDate?.toISOString();
  const supabaseClient = await createClient();

  const { error } = await supabaseClient.from("tournaments").insert({
    id: tournamentId,
    name: name,
    location: location,
    start_date: foramttedStartDate,
  });

  console.error(error);

  let divisionsErrors = "";
  tournamentDivisions.forEach(async (division: Division) => {
    console.log("TOURNAMENT DIV INSERT");
    const { error } = await supabaseClient.from("divisions").insert({
      id: randomUUID(),
      name: division.name,
      tournament_id: tournamentId,
      format: division.format,
      surface: division.surface,
      skill_level: division.skillLevel,
      gender: division.gender,
    });
    console.error(error);
  });
};
