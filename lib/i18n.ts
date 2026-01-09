export type Language = "en" | "vn";

type Copy = {
  tagline: string;
  startExploring: string;
  quickLinks: string;
  nowPlaying: string;
  nowPlayingTrack: string;
  projectsTitle: string;
  projectsSubtitle: string;
  searchPlaceholder: string;
  resultsLabel: string;
  roleLabel: string;
  filterAll: string;
  filterActive: string;
  filterArchived: string;
  activeLabel: string;
  archivedLabel: string;
  emptyTitle: string;
  emptyBody: string;
  timelineTitle: string;
  timelineSubtitle: string;
  footerDisclaimer: string;
  footerLinks: string;
  backToTop: string;
};

export const copy: Record<Language, Copy> = {
  en: {
    tagline: "I build communities and ship small things that feel like magic.",
    startExploring: "Start exploring",
    quickLinks: "Quick links",
    nowPlaying: "Now Playing",
    nowPlayingTrack: "Neon Drift // Project Flex",
    projectsTitle: "Projects",
    projectsSubtitle: "Active drops + archived lore",
    searchPlaceholder: "Search by name, role, or vibe...",
    resultsLabel: "Results",
    roleLabel: "Role",
    filterAll: "All",
    filterActive: "Active",
    filterArchived: "Archived",
    activeLabel: "Active",
    archivedLabel: "Archived",
    emptyTitle: "No signal detected",
    emptyBody: "Try another keyword or reset the filter.",
    timelineTitle: "Roles & Communities",
    timelineSubtitle: "Where I show up and keep the vibes alive",
    footerDisclaimer: "This is a fun showcase, not a job resume.",
    footerLinks: "Links",
    backToTop: "Back to top"
  },
  vn: {
    tagline: "Mình xây cộng đồng và làm mấy thứ nhỏ nhỏ nhưng ‘ảo’.",
    startExploring: "Bắt đầu khám phá",
    quickLinks: "Liên kết nhanh",
    nowPlaying: "Đang phát",
    nowPlayingTrack: "Neon Drift // Project Flex",
    projectsTitle: "Dự án",
    projectsSubtitle: "Đang chạy + đã lưu kho",
    searchPlaceholder: "Tìm theo tên, vai trò, hoặc vibe...",
    resultsLabel: "Kết quả",
    roleLabel: "Vai trò",
    filterAll: "Tất cả",
    filterActive: "Đang hoạt động",
    filterArchived: "Lưu kho",
    activeLabel: "Đang hoạt động",
    archivedLabel: "Lưu kho",
    emptyTitle: "Không thấy tín hiệu",
    emptyBody: "Thử từ khóa khác hoặc reset bộ lọc.",
    timelineTitle: "Vai trò & Cộng đồng",
    timelineSubtitle: "Những nơi mình giữ lửa và giữ vibe",
    footerDisclaimer: "This is a fun showcase, not a job resume.",
    footerLinks: "Liên kết",
    backToTop: "Lên đầu trang"
  }
};
