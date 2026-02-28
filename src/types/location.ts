export interface Location {
  _id: string;
  name: string;
  description?: string;
  type: "city" | "town" | "village" | "outpost" | "poi" | string;
  x: number;
  y: number;
  population: number;
}
