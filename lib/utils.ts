import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTalants(amount: number): string {
  return amount.toLocaleString("ro-RO");
}

export function getAgeRangeLabel(ageRange: string): string {
  const labels: Record<string, string> = {
    "1-2": "Clasele I-II",
    "3-4": "Clasele III-IV",
    "5-6": "Clasele V-VI",
    "7-8": "Clasele VII-VIII",
    all: "Toate vârstele",
  };
  return labels[ageRange] ?? ageRange;
}

export function getActivityTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    lesson: "Lecție",
    quiz: "Joc de întrebări",
    minigame: "Mini-joc",
    group_mission: "Misiune de grup",
    matching: "Potrivire",
  };
  return labels[type] ?? type;
}

export function getMapLocationLabel(location: string): string {
  const labels: Record<string, string> = {
    biserica: "Biserica",
    gradina: "Grădina",
    scriptoriu: "Scriptoriul",
    drumul_sfintilor: "Drumul Sfinților",
    clopotnita: "Clopotnița",
    fantana: "Fântâna",
    piata_parohiei: "Piața Parohiei",
  };
  return labels[location] ?? location;
}
