export type ProjectStatus = "active" | "archived";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectItem = {
  label: string;
  description: string;
  links: ProjectLink[];
};

export type Project = {
  id: string;
  title: string;
  role?: string;
  status: ProjectStatus;
  badges: string[];
  description: string;
  items?: ProjectItem[];
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
    items: [
      {
        label: "NightOwlTGT",
        description: "Admin and moderation for Play Together tools community on YouTube and Discord.",
        links: [
          { label: "YouTube", href: "https://www.youtube.com/@NightOwlTGT" },
          { label: "Discord", href: "https://discord.gg/Svz59wgfhj" }
        ]
      },
      {
        label: "Bis",
        description: "Community moderator for Bis’ streamer Discord server and event support.",
        links: [
          { label: "YouTube", href: "https://www.youtube.com/@Bis1001" },
          { label: "Discord", href: "https://discord.gg/Svz59wgfhj" }
        ]
      },
      {
        label: "DTPuu",
        description: "Moderator support for DTPuu’s YouTube audience and Discord engagement.",
        links: [
          { label: "YouTube", href: "https://www.youtube.com/@DTPuu" }
        ]
      }
    ],
    links: [
      { label: "Community overview", href: "https://discord.gg/Svz59wgfhj" }
    ]
  },
  {
    id: "legacy-projects",
    title: "Legacy / Archived Projects",
    status: "archived",
    badges: ["Archived"],
    description:
      "Archived private servers and service projects grouped for reference.",
    items: [
      {
        label: "Ngọc Rồng",
        description: "Dragon Ball private server network, now archived.",
        links: [
          { label: "ngocrongzin.com", href: "https://ngocrongzin.com" },
          { label: "ngocrongzee.com", href: "https://ngocrongzee.com" }
        ]
      },
      {
        label: "Minecraft",
        description: "Archived private Minecraft community servers.",
        links: [
          { label: "seacraft.vn", href: "https://seacraft.vn" },
          { label: "mineocd.com", href: "https://mineocd.com" }
        ]
      },
      {
        label: "Muahack",
        description: "Offline cheat marketplace site that is now archived.",
        links: [
          { label: "muahack.com", href: "https://muahack.com" }
        ]
      },
      {
        label: "Mars Services",
        description: "Archived trading project with historical Discord reference.",
        links: [
          { label: "Discord", href: "https://discord.gg/BW9qD66m5p" }
        ]
      }
    ],
    links: [
      { label: "Archive overview", href: "https://github.com/VNTakeshi29/project-flex-live" }
    ]
  }
];
