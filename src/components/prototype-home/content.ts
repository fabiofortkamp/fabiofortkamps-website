// PROTOTYPE (issue #4): placeholder home-page content shared by the three
// visual-direction variants. Facts are unchecked; issue #6 drafts the real
// ones. Throwaway: lives only on the prototype/visual-direction branch.

export type Status = "active" | "finished" | "archived";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  status: Status;
  start: string;
  end?: string;
  stack: string[];
  featured: boolean;
  parent?: string;
}

export interface Post {
  title: string;
  date: string;
  description: string;
  series?: { title: string; part: number };
}

export const name = "Fábio P. Fortkamp";
export const tagline = "Scientific software developer";
export const pitch =
  "I build reliable scientific software: simulation tools, tested code and reproducible workflows. My work sits between engineering research and modern software development.";

export const projects: Project[] = [
  {
    slug: "nereid",
    title: "Nereid",
    summary:
      "A local-first task manager with dependencies and Check/Finish repeats.",
    role: "Author",
    status: "active",
    start: "2026",
    stack: ["TypeScript", "TinyBase", "Ink"],
    featured: true,
  },
  {
    slug: "dtu-postdoc",
    title: "My DTU Postdoc",
    summary:
      "Simulation tools for magnetic materials at DTU Energy, from particle packings to micromagnetics.",
    role: "Postdoctoral researcher",
    status: "finished",
    start: "2022",
    end: "2025",
    stack: ["Python", "MATLAB", "Fortran"],
    featured: true,
  },
  {
    slug: "website",
    title: "This website",
    summary:
      "My home on the internet, and a working proof of AI-assisted web development.",
    role: "Author",
    status: "active",
    start: "2026",
    stack: ["Astro", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    slug: "phd",
    title: "My PhD",
    summary:
      "A doctorate in mechanical engineering at UFSC on the design of magnetocaloric refrigerators.",
    role: "PhD researcher",
    status: "finished",
    start: "2014",
    end: "2019",
    stack: ["Python"],
    featured: true,
  },
  {
    slug: "packgen",
    title: "packgen",
    summary: "A particle packing generator.",
    role: "Contributor",
    status: "finished",
    start: "2023",
    end: "2024",
    stack: ["Python", "Blender"],
    featured: false,
    parent: "My DTU Postdoc",
  },
  {
    slug: "stlextractor",
    title: "stlextractor",
    summary: "Tools for extracting information from STL files.",
    role: "Author",
    status: "finished",
    start: "2023",
    end: "2024",
    stack: ["MATLAB"],
    featured: false,
    parent: "My DTU Postdoc",
  },
  {
    slug: "magtense",
    title: "MagTense",
    summary: "A micromagnetism and magnetostatics framework.",
    role: "Contributor on build system and CI",
    status: "finished",
    start: "2023",
    end: "2025",
    stack: ["Fortran", "Python", "CMake"],
    featured: false,
    parent: "My DTU Postdoc",
  },
  {
    slug: "dotfiles",
    title: "dotfiles",
    summary: "My macOS and Linux configuration, managed with dotbot.",
    role: "Author",
    status: "active",
    start: "2019",
    stack: ["Lua", "Shell", "fish"],
    featured: false,
  },
];

export const posts: Post[] = [
  {
    title: "A plan before any code",
    date: "2026-11-27",
    description:
      "How I planned this site with an AI agent: a glossary, a decision log and eight issues before the first line of CSS.",
    series: { title: "Building this website", part: 1 },
  },
];

export const featured = projects.filter((p) => p.featured);
export const more = projects.filter((p) => !p.featured);

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "About" },
];

export const profiles = [
  { href: "https://github.com/fabiofortkamp", label: "GitHub" },
  { href: "https://www.linkedin.com/in/fpfortkamp", label: "LinkedIn" },
  { href: "https://orcid.org/0000-0002-3161-7201", label: "ORCID" },
  { href: "/rss.xml", label: "RSS" },
];

export const years = (p: Project) =>
  p.end ? `${p.start}–${p.end}` : `${p.start}–now`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
