"use client";

import { DatePicker } from "@/components/DatePicker";
import DivisionMultiSelect from "@/components/DivisionMultiSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Division } from "@/types/tournaments";
import { useState } from "react";
import { createTournament } from "./actions";
import { useRouter } from "next/navigation";

export default function NewTournamentPage() {
  const [tournamentName, setTournamentName] = useState<string>("");
  const [tournamentLocation, setTournamentLocation] = useState<string>("");
  const [tournamentStartDate, setTournamentStartDate] = useState<Date>(); // not formatted
  const [selectedDivisions, setSelectedDivisions] = useState<Division[]>([]);

  const router = useRouter();

  console.log(tournamentStartDate);

  return (
    <div className="w-full">
      <h1>Create Tournament</h1>

      <div className="max-w-sm">
        <div className="pt-4">
          <Label>Name</Label>
          <Input
            type="text"
            onChange={(e) => setTournamentName(e.target.value)}
            placeholder="tournament name"
          />
        </div>

        <div className="pt-4">
          <Label>Location</Label>
          <Input
            type="text"
            onChange={(e) => setTournamentLocation(e.target.value)}
            placeholder="tournament location"
          />
        </div>

        <div className="pt-4">
          <Label>Start Date</Label>
          <div>
            {/* TODO: move state into this page and pass down to child component for setting */}
            <DatePicker
              date={tournamentStartDate}
              onChange={setTournamentStartDate}
            />
          </div>
        </div>

        <div className="pt-4">
          <Label>Divisions</Label>
          {/* TODO: move state into this page and pass down to child component for setting */}
          <DivisionMultiSelect
            selectedDivisions={selectedDivisions}
            setSelectedDivisions={setSelectedDivisions}
          />
        </div>

        <Button
          type="submit"
          className="mt-4"
          onClick={async () => {
            console.log(
              `${tournamentName} \n ${tournamentLocation} \n ${tournamentStartDate} \n`
            );
            console.log(selectedDivisions);
            await createTournament({
              name: tournamentName,
              location: tournamentLocation,
              startDate: tournamentStartDate,
              tournamentDivisions: selectedDivisions,
            });
            router.back();
          }}
        >
          {" "}
          Create Tournament
        </Button>
      </div>
    </div>
  );
}
