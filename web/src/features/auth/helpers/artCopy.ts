import type { StaticImageData } from "next/image";
import coastCliffs from "@/assets/auth/coast-cliffs.webp";

export interface AuthArt {
  /** Wide artwork pinned to the bottom of the panel. Its top edge must be a flat `background` colour. */
  image: StaticImageData;
  /** Matches the image's top edge so the art melts into the panel. */
  background: string;
  quote: string;
  attribution: string;
  /** Smaller quotes under the divider. */
  quotes: string[];
}

export const authArt: AuthArt = {
  image: coastCliffs,
  background: "#fdebd6",
  quote:
    "Built because every notepad I tried was either not Notion-like, complex, or required auth. This one is simple and does what I actually needed.",
  attribution: "The creator, honestly",
  // Placeholders until real quotes are in.
  quotes: [
    "Opened it, started typing, never looked back.",
    "Finally a notes app that doesn't ask me to set anything up first.",
  ],
};
