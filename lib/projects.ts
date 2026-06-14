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
    id: "discord-communities",
    title: "Discord Communities",
    role: "Community Ops",
    status: "active",
    badges: ["Active", "Discord", "YouTube"],
    description:
      "Moderation and support for NightOwlTGT and Bis communities, plus active Discord engagement.",
    links: [
      { label: "NightOwlTGT", href: "https://www.youtube.com/@NightOwlTGT" },
      { label: "Bis", href: "https://www.youtube.com/@Bis1001" },
      { label: "Discord", href: "https://discord.gg/Svz59wgfhj" }
    ]
  },
  {
    id: "dtpuu-mod",
    title: "DTPuu Mod Support",
    role: "Moderator",
    status: "active",
    badges: ["Active", "YouTube", "Mod"],
    description:
      "Active moderation support for DTPuu’s YouTube community and audience engagement.",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@DTPuu" }
    ]
  },
  {
    id: "personal-server",
    title: "Takeshi Discord Hub",
    role: "Owner",
    status: "active",
    badges: ["Active", "Discord"],
    description:
      "Private server for collaboration, project coordination, and community support.",
    links: [
      { label: "Discord", href: "https://discord.com/users/645512630244605983" }
    ]
  },
  {
    id: "legacy-gaming",
    title: "Legacy Gaming Servers",
    status: "archived",
    badges: ["Archived"],
    description:
      "Archived Dragon Ball and Minecraft private servers preserved as past work.",
    links: [
      { label: "Ngọc Rồng", href: "https://ngocrongzin.com" },
      { label: "Minecraft", href: "https://seacraft.vn" }
    ]
  },
  {
    id: "legacy-trading",
    title: "Legacy Trading Projects",
    status: "archived",
    badges: ["Archived"],
    description:
      "Old cheat/hack marketplace and trading work that is now archived.",
    links: [
      { label: "muahack.com", href: "https://muahack.com" },
      { label: "Discord", href: "https://discord.gg/BW9qD66m5p" }
    ]
  }
];
