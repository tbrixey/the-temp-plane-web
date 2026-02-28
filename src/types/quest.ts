import { Item } from "./items";

export interface Quest {
  _id: string;
  title: string;
  description: string;
  type: "intro" | "fetch" | "explore" | "kill";
  active?: boolean;
  goto?: string;
  acquire?: Item;
  location?: string;
  target?: string;
  count?: number;
  rewards?: {
    gold?: number;
    xp?: number;
    items?: { item: Item; count: number }[];
  };
}
