export type Platform = "youtube" | "instagram" | "gdrive";

export type Project = {
  id: string;
  title: string;
  description: string;
  duration: string;
  platform: Platform;
  url: string;
  thumbnail: string;
  aspect?: "16:9" | "9:16";
};

export type ProjectGroup = {
  id: string;
  title: string;
  blurb?: string;
  layout: "feature" | "wide" | "reels" | "compact";
  projects: Project[];
};

const ytId = (url: string) => {
  const m = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
  return m ? m[1] : "";
};

const driveId = (url: string) => {
  const m = url.match(/\/d\/([\w-]+)/);
  return m ? m[1] : "";
};

export const embedUrl = (p: Project): string | null => {
  switch (p.platform) {
    case "youtube":
      return `https://www.youtube.com/embed/${ytId(p.url)}?rel=0`;
    case "gdrive":
      return `https://drive.google.com/file/d/${driveId(p.url)}/preview`;
    case "instagram":
      return null;
  }
};

export const showreel: Project = {
  id: "showreel",
  title: "Animation Showreel",
  description:
    "A short compilation showcasing my best 2D and After Effects animation work.",
  duration: "00:52",
  platform: "youtube",
  url: "https://youtu.be/paxp9HqFeH8",
  thumbnail: "/thumbnails/scared-to-death.jpg",
  aspect: "16:9",
};

export const shortformShowreel: Project = {
  id: "shortform-showreel",
  title: "Short-Form Showreel",
  description:
    "A short-form showreel featuring AI-assisted production, motion design, video editing, and animation.",
  duration: "01:03",
  platform: "gdrive",
  url: "https://drive.google.com/file/d/1bD7um1zujITAnmlTTOelDiE-8fozS9p8/view",
  thumbnail: "",
  aspect: "9:16",
};

export const groups: ProjectGroup[] = [
  {
    id: "ai-assisted",
    title: "AI-Assisted Productions",
    layout: "compact",
    projects: [
      {
        id: "dizengof-adidas",
        title: "Dizengof Center X Adidas",
        description: "",
        duration: "",
        platform: "gdrive",
        url: "https://drive.google.com/file/d/18khn1ffDbR4AQ8rjsk0ZDOQYmhBnBN51/view",
        thumbnail: "/thumbnails/dizengof-adidas.jpg",
        aspect: "9:16",
      },
      {
        id: "reel-DUqSqY5jYVi",
        title: "Mententen Ramen & Sake Workshop",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/DUqSqY5jYVi/",
        thumbnail: "/thumbnails/ramen-mententen.jpg",
        aspect: "9:16",
      },
      {
        id: "reel-DT8MFwoDbKb",
        title: "Dizengof Center Tu B'Shevat",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/DT8MFwoDbKb/",
        thumbnail: "/thumbnails/dizengof-tu-bshevat.jpg",
        aspect: "9:16",
      },
    ],
  },
  {
    id: "production",
    title: "Video Editing & Motion Design",
    blurb:
      "Educational and commercial work — from scripting and animation to live-action editing.",
    layout: "wide",
    projects: [
      {
        id: "webseries-intro",
        title: "Mini Web Series — Intro",
        description: "Motion design intro I created for a mini web series.",
        duration: "00:28",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=Qu-WFRHznvg",
        thumbnail: "/thumbnails/webseries-intro.jpg",
        aspect: "16:9",
      },
      {
        id: "malar-allergic",
        title: "Malar — First Aid Training",
        description:
          "After Effects animation. One of the educational videos I made for the Malar First Aid Training Center.",
        duration: "03:53",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=bWp91vRg2Xg",
        thumbnail: "/thumbnails/malar-allergic.jpg",
        aspect: "16:9",
      },
      {
        id: "hebrew-u-lesson",
        title: "Hebrew University Lesson",
        description:
          "After Effects editing with pre-made templates. One of many lessons I edited for the Hebrew University.",
        duration: "19:20",
        platform: "gdrive",
        url: "https://drive.google.com/file/d/1JsoCqzg3gWxdw3QambZAYFMgHmK2yG5C/view",
        thumbnail: "/thumbnails/hebrew-u-lesson.jpg",
        aspect: "16:9",
      },
      {
        id: "idf-medical",
        title: "IDF Medical School",
        description:
          "Camera assistant and additional editing on educational videos for the medical school in the Israeli Defense Force.",
        duration: "03:14",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=fE7iGSEdygU",
        thumbnail: "/thumbnails/idf-medical.jpg",
        aspect: "16:9",
      },
    ],
  },
  {
    id: "shortform",
    title: "Short-Form Content",
    blurb:
      "Reels and short-form content for social media — brand work, collaborations with creators, and personal experiments.",
    layout: "reels",
    projects: [
      {
        id: "original-commercial",
        title: "Original's Commercial",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/DHnwtpds4fd/",
        thumbnail: "/thumbnails/original-cafe.jpg",
        aspect: "9:16",
      },
      {
        id: "cochva-2",
        title: "Noa Cochva Post 10/7 Public Advocacy",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/Cy_LWywo4SL/",
        thumbnail: "/thumbnails/cochva-hamas.jpg",
        aspect: "9:16",
      },
      {
        id: "reel-DVGlyL4jRfs",
        title: "Barbie Commercial ft. Yael Filipoviz",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/DVGlyL4jRfs/",
        thumbnail: "/thumbnails/barbie-yael.jpg",
        aspect: "9:16",
      },
      {
        id: "reel-DTgC7GpCJd1",
        title: "We Shoes Commercial ft. Gal Gvaram",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/DTgC7GpCJd1/",
        thumbnail: "/thumbnails/weshoes-gal.jpg",
        aspect: "9:16",
      },
      {
        id: "dizengof-test",
        title: "Dizengof Center Puzzles",
        description: "",
        duration: "",
        platform: "gdrive",
        url: "https://drive.google.com/file/d/1mkzDZCZPTJByHvmW5nT2amd9_IuNIyK3/view",
        thumbnail: "/thumbnails/dizengof-test.jpg",
        aspect: "9:16",
      },
      {
        id: "reel-DZplXmSNtLW",
        title: "Dizengof Center Wine Festival",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/DZplXmSNtLW/",
        thumbnail: "/thumbnails/dizengof-wine-festival.jpg",
        aspect: "9:16",
      },
      {
        id: "cochva-1",
        title: "Noa Cochva Post 10/7 Public Advocacy",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/C0raCZ9oAuj/",
        thumbnail: "/thumbnails/cochva-israel-map.jpg",
        aspect: "9:16",
      },
      {
        id: "short-2025",
        title: "Short-Form Test — 2025",
        description: "",
        duration: "",
        platform: "gdrive",
        url: "https://drive.google.com/file/d/1Fn0QODsyCVlYlvgFfwts_UcL0DktZ5Ei/view",
        thumbnail: "/thumbnails/short-2025.jpg",
        aspect: "9:16",
      },
      {
        id: "reel-DUYVgtDDY0q",
        title: "Dizengof Center Valentine",
        description: "",
        duration: "",
        platform: "instagram",
        url: "https://www.instagram.com/reel/DUYVgtDDY0q/",
        thumbnail: "/thumbnails/dizengof-valentine.jpg",
        aspect: "9:16",
      },
      {
        id: "short-vanitas",
        title: "Short-Form Test — Vanitas",
        description: "",
        duration: "",
        platform: "gdrive",
        url: "https://drive.google.com/file/d/19KiQZ8hYauTmRAW19M4de6FJUO2SsFOS/view",
        thumbnail: "/thumbnails/short-vanitas.jpg",
        aspect: "9:16",
      },
    ],
  },
];
