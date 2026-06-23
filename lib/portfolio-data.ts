export const projects = [
  {
    title: "Northstar Analytics",
    role: "Product design, frontend engineering",
    stack: ["Next.js", "TypeScript", "D3"],
    accentClass: "accent-cyan",
    description:
      "A decision-making dashboard for a finance team that needs fast scans, clear hierarchy, and dense data without visual noise.",
    stats: ["18 charts", "3 roles", "42% faster reviews"],
  },
  {
    title: "Pulse Commerce",
    role: "Design systems, app architecture",
    stack: ["React Native", "Node.js", "Supabase"],
    accentClass: "accent-emerald",
    description:
      "A commerce operations app that blends fulfillment workflows, live inventory, and customer insights into one mobile surface.",
    stats: ["12 screens", "2 platforms", "99.9% uptime"],
  },
  {
    title: "Signal Studio",
    role: "Brand web design, motion",
    stack: ["Next.js", "CSS", "Motion"],
    accentClass: "accent-violet",
    description:
      "A compact marketing site that treats whitespace, typography, and motion as first-class design tools.",
    stats: ["1 campaign", "6 sections", "14s load budget"],
  },
  {
    title: "Axiom OS",
    role: "Internal tooling, UX systems",
    stack: ["Prisma", "Postgres", "Zod"],
    accentClass: "accent-amber",
    description:
      "An operations platform for teams that need speed, guardrails, and forms that actually feel pleasant to use.",
    stats: ["8 workflows", "5 teams", "0 training slides"],
  },
] as const;

export const stack = [
  { name: "TypeScript", detail: "Strong typing, stable interfaces" },
  { name: "Next.js", detail: "App router, server-first by default" },
  { name: "CSS", detail: "Editorial layouts and custom motion" },
  { name: "Postgres", detail: "Reliable data and simple querying" },
  { name: "Prisma", detail: "Fast schema iteration" },
  { name: "Vercel", detail: "Shipping and preview workflows" },
] as const;

export const experience = [
  {
    title: "Lead Frontend Developer",
    company: "Independent / Freelance",
    period: "2023 - Present",
    summary:
      "Building polished product sites and internal tools with a focus on performance, accessibility, and maintainable component systems.",
  },
  {
    title: "UI Engineer",
    company: "Studio / Agency Work",
    period: "2021 - 2023",
    summary:
      "Shipped dashboards, marketing sites, and mobile interfaces while partnering closely with design and product teams.",
  },
  {
    title: "Design Technologist",
    company: "Early Product Startups",
    period: "2019 - 2021",
    summary:
      "Turned rough concepts into usable interfaces, design tokens, and fast prototypes that aligned teams around a clear direction.",
  },
] as const;

export const stats = [
  { value: "12+", label: "shipped products" },
  { value: "6 yrs", label: "building interfaces" },
  { value: "100%", label: "detail oriented" },
] as const;

export const contacts = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    label: "GitHub",
    value: "github.com/michaeltampus",
    href: "https://github.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/michaeltampus",
    href: "https://linkedin.com",
  },
] as const;
