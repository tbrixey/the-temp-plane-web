import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      _id: string;
      apiKey: string;
      count: number;
      createdOn: Date;
      playerName: string;
      level: number;
      hitpoints: number;
      maxHitpoints: number;
      xpToNextLevel: number;
      gold: number;
      quests: {
        _id: string;
        title: string;
        description: string;
        type: "intro" | "fetch" | "explore" | "fight";
        goto?: string;
        acquire?: Item;
        location?: string;
        tasks?: string[];
        active: boolean;
        rewards: {
          gold: number;
          xp: number;
          items?: {
            item: {
              _id: any;
              id: number;
              name: string;
              description: string;
              effect?: {
                hitpoints?: number;
                speed?: number;
                weight?: number;
                time?: number;
                stats?: {
                  str?: number;
                  dex?: number;
                  con?: number;
                  int?: number;
                  luck?: number;
                };
              };
              type: "consumable" | "junk" | "equipment";
              value: number;
              weight: number;
            };
            count: number;
          }[];
        };
      }[];
      updatedOn: Date;
      location: {
        _id: string;
        name: string;
        type: string;
        x: number;
        y: number;
        population: number;
      };
      startingLocation: string;
      bag: {
        item: Item;
        count: number;
        _id: string;
      }[];
      race: string;
      skills: {
        mining: number;
        woodcutting: number;
        arcana: number;
        cooking: number;
        gathering: number;
      };
      class: string;
      speed: number;
      stats: {
        [key: string]: number;
      };
      weight: number;
      arrivalTime?: Date;
      finishTime?: Date;
      levelPointsToUse?: number;
      bonusStats?: {
        stats?: {
          [key: string]: number;
        };
        speed?: number;
        weight?: number;
        time?: Date;
      };
    };
  }
}
