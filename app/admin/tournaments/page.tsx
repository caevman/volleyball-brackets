"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Tournament = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  format?: string;
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [openTournamentDetailsModal, setOpenTournamentDetailsModal] =
    useState(false);
  const router = useRouter();

  const fetchTournaments = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("tournaments").select();
    if (error) console.error("Error fetching tournaments:", error);
    else setTournaments(data);
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="space-y-6 justify-center w-full">
      <div className="relative w-full flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">Tournaments</h1>

        <Button
          className="absolute right-0"
          onClick={() => router.push("/admin/tournaments/new")}
        >
          Create Tournament
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          className="flex flex-col items-center justify-center space-y-2"
          value="upcoming"
        >
          {/* <div className="flex flex-col justify-center space-y-2 max-w-[300px]"> */}
          {tournaments.map((tournament) => (
            <Button
              key={tournament.id}
              onClick={() => router.push(`/admin/tournaments/${tournament.id}`)}
              // className={cn("border p-3 rounded", "bg-gray-50 dark:bg-gray-800")}
              className={"min-w-[200px]"}
            >
              {tournament.name}
            </Button>
          ))}
          {/* </div> */}
        </TabsContent>
        <TabsContent value="past">No Past Tournaments</TabsContent>
      </Tabs>
    </div>
  );
}
