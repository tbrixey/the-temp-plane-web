import { Item } from "./items";

export interface User {
  _id: string;
  apiKey: string;
  playerName: string;
  level: number;
  levelPointsToUse?: number;
  hitpoints: number;
  maxHitpoints: number;
  xpToNextLevel?: number;
  gold: number;
  quests: string[];
  location?: {
    _id: string;
    name: string;
    description?: string;
    type: string;
    x: number;
    y: number;
    population: number;
  };
  startingLocation?: string | { _id: string };
  bag: {
    item: Item;
    count: number;
  }[];
  race?: string;
  class?: string;
  skills: {
    mining: number;
    woodcutting: number;
    fishing: number;
    thievery: number;
    cooking: number;
    alchemy: number;
    agility: number;
    farming: number;
    smithing: number;
    slaying: number;
  };
  stats: {
    str?: number;
    con?: number;
    dex?: number;
    int?: number;
    luck?: number;
    [key: string]: number | undefined;
  };
  speed: number;
  weight: number;
  arrivalTime?: Date;
  finishTime?: Date;
  bonusStats?: {
    stats?: { [key: string]: number };
    time?: Date;
  };
  killCounts?: Record<string, number>;
}
