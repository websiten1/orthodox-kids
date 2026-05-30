export type AvatarConfig = {
  bodyColor: string;
  hairColor: string;
  clothingColor: string;
  avatarType: number; // 1-6
  accessories: string[];
};

export const AVATAR_COLORS = {
  skin: ["#F5CBA7", "#E59866", "#D4A574", "#A0522D", "#8B4513", "#2C1B0E"],
  hair: ["#2C1B0E", "#8B4513", "#DAA520", "#C0392B", "#1A1A2E", "#F5F5DC"],
  clothing: ["#8B1A1A", "#1B3A6B", "#2D5A1B", "#7B3F00", "#4A0E8F", "#1B6B6B"],
};

export const TEAM_NAMES = [
  "Apostolii",
  "Îngerii",
  "Mucenicii",
  "Proorocii",
  "Sfinții",
  "Drepții",
];

export const TALANTS_REWARDS = {
  COMPLETE_LESSON: 5,
  WIN_TEAM_GAME: 15,
  FIRST_IN_GROUP: 10,
  CORRECT_FIRST_TRY: 2,
  GROUP_MISSION_COMPLETE: 20,
  GOSPEL_ACTIVITY: 8,
} as const;

export type ActivityType =
  | "lesson"
  | "quiz"
  | "minigame"
  | "group_mission"
  | "matching";

export type MapLocation =
  | "biserica"
  | "gradina"
  | "scriptoriu"
  | "drumul_sfintilor"
  | "clopotnita"
  | "fantana"
  | "piata_parohiei";

export type AgeRange = "1-2" | "3-4" | "5-6" | "7-8" | "all";

export type QuizQuestion = {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type LessonContent = {
  sections: {
    title: string;
    text: string;
    imageUrl?: string;
  }[];
  summary: string;
};

export type MatchingContent = {
  pairs: { left: string; right: string }[];
  instructions: string;
};
