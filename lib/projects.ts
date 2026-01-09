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
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "nightowltgt",
    title: "NightOwlTGT – Play Together Tools Community",
    role: "Admin",
    status: "active",
    badges: ["Active", "Community", "Discord"],
    description:
      "Admin role for a Discord community related to Play Together tools/hacks. Includes content + support.",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@NightOwlTGT" },
      { label: "Discord", href: "https://discord.gg/Svz59wgfhj" }
    ]
  },
  {
    id: "bis",
    title: "Bis – Streamer Community Server",
    role: "Moderator",
    status: "active",
    badges: ["Active", "Community", "Discord"],
    description:
      "Moderator role for Bis (female streamer)’s Discord server. Keeps chats clean and vibes friendly.",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@Bis1001" },
      { label: "Discord", href: "https://discord.gg/Svz59wgfhj" }
    ]
  },
  {
    id: "ngoc-rong",
    title: "Ngọc Rồng Online Servers",
    status: "archived",
    badges: ["Archived"],
    description: "Two Dragon Ball themed private servers (archived).",
    links: [
      { label: "ngocrongzin.com", href: "https://ngocrongzin.com" },
      { label: "ngocrongzee.com", href: "https://ngocrongzee.com" }
    ]
  },
  {
    id: "minecraft",
    title: "Minecraft Servers",
    status: "archived",
    badges: ["Archived"],
    description: "Two Minecraft servers (archived).",
    links: [
      { label: "seacraft.vn", href: "https://seacraft.vn" },
      { label: "mineocd.com", href: "https://mineocd.com" }
    ]
  },
  {
    id: "muahack",
    title: "Cheat/Hack Marketplace – muahack.com",
    status: "archived",
    badges: ["Archived"],
    description: "A cheat/hack marketplace website (archived; site is offline).",
    links: [{ label: "muahack.com", href: "https://muahack.com" }]
  },
  {
    id: "mars-services",
    title: "Mars Services – Cheat/Hack Trading",
    status: "archived",
    badges: ["Archived"],
    description: "Cheat/hack trading project under “Mars Services” (archived).",
    links: [{ label: "Discord", href: "https://discord.gg/BW9qD66m5p" }]
  }
];
