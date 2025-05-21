"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";

import { cn } from "@/lib/utils";

type Player = {
  id: string;
  name: string;
  email?: string;
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("players").select("*");
    if (error) console.error("Error fetching players:", error);
    else setPlayers(data);
  }

  async function addPlayer() {
    if (!newPlayerName) return;
    const supabase = await createClient();

    const { error } = await supabase
      .from("players")
      .insert([{ name: newPlayerName }]);
    if (error) console.error("Error adding player:", error);
    else {
      setNewPlayerName("");
      fetchPlayers();
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Players</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <Button onClick={addPlayer}>Add Player</Button>
      </div>

      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className={cn("border p-3 rounded", "bg-gray-50 dark:bg-gray-800")}
          >
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
}
