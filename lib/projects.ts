export type ProjectStatus = "active" | "archived";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  role?: string;
  status: ProjectStatus;
  badges: string[];
  description: string;
  details?: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "discord-communities",
    title: "Discord Communities",
    role: "Community Ops",
    status: "active",
    badges: ["Active", "Discord", "YouTube"],
    description:
      "Moderation and support for NightOwlTGT, Bis, and DTPuu communities with active Discord operations.",
    details: [
      "NightOwlTGT: Discord admin and moderation for Play Together tools community.",
      "Bis: Community moderation and event support for streamer audience.",
      "DTPuu: Moderator support for YouTube community engagement and Discord message handling.",
      "Live evidence across active channels and Discord access."
    ],
    links: [
      { label: "NightOwlTGT YouTube", href: "https://www.youtube.com/@NightOwlTGT" },
      { label: "Bis YouTube", href: "https://www.youtube.com/@Bis1001" },
      { label: "DTPuu YouTube", href: "https://www.youtube.com/@DTPuu" },
      { label: "Discord servers", href: "https://discord.gg/Svz59wgfhj" }
    ]
  },

  {
    id: "legacy-projects",
    title: "Legacy / Archived Projects",
    status: "archived",
    badges: ["Archived"],
    description:
      "All inactive past projects grouped together for reference, including archived servers and services.",
    links: [
      { label: "Ngọc Rồng", href: "https://ngocrongzin.com" },
      { label: "Minecraft", href: "https://seacraft.vn" },
      { label: "muahack.com", href: "https://muahack.com" },
      { label: "Mars Services", href: "https://discord.gg/BW9qD66m5p" }
    ]
  }
];
