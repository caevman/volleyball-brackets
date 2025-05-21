export type Tournament = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate?: string;
  divisions: Division[];
};

export type Division = {
  id: string;
  name: string;
  format: "Doubles" | "Quads" | "Sixes";
  surface: "Sand" | "Grass" | "Indoor";
  gender: "Coed" | "Men" | "Women" | "Open";
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  maxTeams?: number;
};
