import { Division } from "@/types/tournaments";
import { randomUUID } from "crypto";

export const DIVISIONS: Division[] = [
  {
    id: "1",
    name: "CONST 4s BB",
    format: "Quads",
    surface: "Sand",
    gender: "Coed",
    skillLevel: "Intermediate",
  },
  {
    id: "2",
    name: "CONST 6s Rec",
    format: "Sixes",
    surface: "Sand",
    gender: "Coed",
    skillLevel: "Beginner",
  },
  {
    id: "3",
    name: "CONST Doubles Open",
    format: "Doubles",
    surface: "Sand",
    gender: "Men",
    skillLevel: "Advanced",
  },
];

// export type Division = {
//   id: string;
//   name: string;
//   type: "Doubles" | "Quads" | "Sixes";
//   surface: "Sand" | "Grass" | "Indoor";
//   gender: "Coed" | "Men" | "Women" | "Open";
//   skillLevel: "Beginner" | "Intermediate" | "Advanced";
//   maxTeams?: number;
// };
