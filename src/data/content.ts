export type Stage = {
  id: string;
  number: string;
  name: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  startWeek: number;
  durationWeeks: number;
  estimatedDays: number;
  owner: string;
  goals: string[];
  activities: string[];
  deliverables: string[];
  substeps: string[];
};

export type ServicePackage = {
  name: string;
  eyebrow: string;
  description: string;
  includes: string[];
  tools: { abbr: string; name: string }[];
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  type: "case-study" | "project";
  scope: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  collaborators: string[];
  date: string;
  stack: string[];
  outputs: string[];
  results: string[];
  liveUrl?: string;
  image: string;
  imageAlt: string;
};

export const stages: Stage[] = [
  {
    id: "discovery",
    number: "1.0",
    name: "Discovery & Audit",
    category: "Discovery",
    shortDescription:
      "Understand the product, map the current ecosystem and identify the highest-leverage system decisions.",
    detailedDescription:
      "We collect product files, inspect the current interfaces, compare component libraries and document where design, code and team workflow diverge.",
    startWeek: 1,
    durationWeeks: 1,
    estimatedDays: 5,
    owner: "Maciej Postek",
    goals: [
      "Define the real scope before committing to implementation",
      "Find duplicated patterns and conflicting rules",
      "Create a shared project vocabulary"
    ],
    activities: [
      "Stakeholder interviews",
      "Figma and UI audit",
      "Front-end inventory",
      "Workflow review"
    ],
    deliverables: ["Discovery summary", "Audit report", "Project context"],
    substeps: ["1.1 Kick-off workshop", "1.2 Product audit", "1.3 Context summary"]
  },
  {
    id: "strategy",
    number: "2.0",
    name: "System Strategy",
    category: "Strategy",
    shortDescription:
      "Turn the audit into a practical architecture for one interface ecosystem.",
    detailedDescription:
      "We define product principles, the target system architecture, ownership boundaries and the rules connecting design, code, documentation and AI context.",
    startWeek: 2,
    durationWeeks: 1,
    estimatedDays: 5,
    owner: "Maciej Postek",
    goals: [
      "Agree on the target architecture",
      "Prioritize shared patterns",
      "Define a phased implementation plan"
    ],
    activities: ["Architecture workshop", "System principles", "Governance assumptions"],
    deliverables: ["Strategy document", "Architecture diagram", "Prioritized roadmap"],
    substeps: ["2.1 Product principles", "2.2 Architecture", "2.3 Roadmap"]
  },
  {
    id: "flows",
    number: "3.0",
    name: "Product Flows",
    category: "Product design",
    shortDescription:
      "Align navigation, information architecture and critical user flows across the product.",
    detailedDescription:
      "Before visual standardization, we map the shared product logic. Key flows are represented as wireframes and validated against real use cases.",
    startWeek: 2,
    durationWeeks: 2,
    estimatedDays: 8,
    owner: "Maciej Postek",
    goals: [
      "Reduce flow inconsistencies",
      "Validate shared UX patterns",
      "Create reusable screen structures"
    ],
    activities: ["Information architecture", "Wireframes", "Flow validation"],
    deliverables: ["User-flow library", "Wireframes", "Clickable prototype"],
    substeps: ["3.1 Information architecture", "3.2 Wireframes", "3.3 Validation"]
  },
  {
    id: "interface-system",
    number: "4.0",
    name: "Interface System Design",
    category: "Design system",
    shortDescription:
      "Design foundations, reusable components, states and high-value product views.",
    detailedDescription:
      "The visual layer becomes a reusable interface system rather than a collection of isolated screens. Components are designed with variants, states and implementation in mind.",
    startWeek: 4,
    durationWeeks: 2,
    estimatedDays: 10,
    owner: "Maciej Postek",
    goals: [
      "Create one coherent visual language",
      "Cover component states and edge cases",
      "Prepare design for implementation"
    ],
    activities: ["Foundations", "Components", "Screen templates", "Documentation"],
    deliverables: ["Figma library", "Product views", "Usage rules"],
    substeps: ["4.1 Foundations", "4.2 Components", "4.3 Product templates"]
  },
  {
    id: "frontend-system",
    number: "5.0",
    name: "Front-end Design System",
    category: "Development",
    shortDescription:
      "Translate the interface system into reusable front-end components and technical rules.",
    detailedDescription:
      "The approved design system is implemented as reusable components. Tokens, APIs, variants and states are aligned across design and code.",
    startWeek: 5,
    durationWeeks: 2,
    estimatedDays: 10,
    owner: "Maciej Postek",
    goals: [
      "Create production-ready shared components",
      "Align design and component APIs",
      "Reduce repeated front-end decisions"
    ],
    activities: ["Token setup", "Components", "States", "Quality review"],
    deliverables: ["Component package", "Token setup", "Implementation notes"],
    substeps: ["5.1 Tokens", "5.2 Component library", "5.3 Quality review"]
  },
  {
    id: "storybook",
    number: "6.0",
    name: "Documentation & Storybook",
    category: "Documentation",
    shortDescription:
      "Build a shared source of truth for component behavior, examples and decisions.",
    detailedDescription:
      "Storybook and technical documentation make the system discoverable. Each component includes use cases, states, constraints and design references.",
    startWeek: 6,
    durationWeeks: 1,
    estimatedDays: 5,
    owner: "Maciej Postek",
    goals: [
      "Make the system understandable",
      "Create a source of truth",
      "Improve designer-developer handoff"
    ],
    activities: ["Stories", "Usage notes", "Cross-linking"],
    deliverables: ["Storybook", "Technical docs", "Usage examples"],
    substeps: ["6.1 Stories", "6.2 Usage rules", "6.3 Source of truth"]
  },
  {
    id: "ai-context",
    number: "7.0",
    name: "AI Context & Governance",
    category: "Operations",
    shortDescription:
      "Document patterns, decisions and change processes for people and AI.",
    detailedDescription:
      "The system is completed with markdown context, contribution rules and governance that keeps design, code and documentation synchronized.",
    startWeek: 7,
    durationWeeks: 1,
    estimatedDays: 5,
    owner: "Maciej Postek",
    goals: [
      "Capture reusable product knowledge",
      "Prepare context for AI-assisted work",
      "Define a controlled change process"
    ],
    activities: ["Markdown specs", "Governance workflow", "Contribution rules"],
    deliverables: ["AI-ready context", "Governance playbook", "Change workflow"],
    substeps: ["7.1 Pattern context", "7.2 Governance", "7.3 Team onboarding"]
  },
  {
    id: "website-system",
    number: "8.0",
    name: "Website System",
    category: "Website",
    shortDescription:
      "Extend the same interface foundations into a code-native company website.",
    detailedDescription:
      "The product design language is reused for the public website, creating a consistent system across product and marketing surfaces.",
    startWeek: 7,
    durationWeeks: 2,
    estimatedDays: 8,
    owner: "Maciej Postek",
    goals: [
      "Connect product and website",
      "Reuse system foundations",
      "Create an extensible code-native website"
    ],
    activities: ["Website architecture", "Page templates", "Astro implementation"],
    deliverables: ["Website system", "Reusable sections", "Content model"],
    substeps: ["8.1 Architecture", "8.2 Interface", "8.3 Development"]
  }
];

export const servicePackages: ServicePackage[] = [
  {
    name: "Discovery & Strategy Sprint",
    eyebrow: "Start here",
    description:
      "Audit the current product, align the problem and turn uncertainty into a validated direction.",
    includes: ["Product audit", "Information architecture", "Prototype", "Scope recommendation"],
    tools: [
      { abbr: "F", name: "Figma" },
      { abbr: "M", name: "Markdown" }
    ]
  },
  {
    name: "Interface System Design",
    eyebrow: "Design",
    description:
      "Design product flows, reusable interface foundations and a Figma system prepared for development.",
    includes: ["Product UX/UI", "Figma design system", "States & variants", "Usage rules"],
    tools: [
      { abbr: "F", name: "Figma" },
      { abbr: "P", name: "Prototype" }
    ]
  },
  {
    name: "Front-end Design System",
    eyebrow: "Development",
    description:
      "Translate the interface system into reusable components and technical documentation.",
    includes: ["React components", "Design tokens", "Storybook", "Technical specs"],
    tools: [
      { abbr: "R", name: "React" },
      { abbr: "S", name: "Storybook" }
    ]
  },
  {
    name: "Full Design System Build",
    eyebrow: "Full system",
    description:
      "Connect strategy, product design, component engineering, context and governance.",
    includes: ["Discovery", "Interface system", "Front-end system", "AI context & governance"],
    tools: [
      { abbr: "F", name: "Figma" },
      { abbr: "R", name: "React" },
      { abbr: "S", name: "Storybook" }
    ]
  },
  {
    name: "AI-native Website System",
    eyebrow: "Website",
    description:
      "A code-native website built as an extensible component system with a structured content model.",
    includes: ["Website strategy", "Component system", "Astro build", "AI-ready context"],
    tools: [
      { abbr: "A", name: "Astro" },
      { abbr: "S", name: "Sanity" },
      { abbr: "J", name: "JavaScript" }
    ]
  },
  {
    name: "Webflow Development",
    eyebrow: "Bridge offer",
    description:
      "A structured Webflow implementation for projects that still need the current stack.",
    includes: ["Webflow build", "Component structure", "CMS setup", "Handoff"],
    tools: [
      { abbr: "F", name: "Figma" },
      { abbr: "W", name: "Webflow" }
    ]
  },
  {
    name: "UI Kit + Customization",
    eyebrow: "Starter",
    description:
      "Begin with an AI-ready interface foundation and adapt it to your product, industry and flows.",
    includes: ["Figma UI kit", "React foundation", "UX patterns", "Customization"],
    tools: [
      { abbr: "F", name: "Figma" },
      { abbr: "R", name: "React" },
      { abbr: "M", name: "Markdown" }
    ]
  }
];

export const pricingModels = [
  {
    name: "Fixed Price",
    bestFor: "Defined scope",
    description:
      "A clear budget for a stable scope, usually defined after Discovery & Strategy.",
    points: ["Known deliverables", "Defined timeline", "Milestone-based invoicing"]
  },
  {
    name: "Retainer",
    bestFor: "Ongoing evolution",
    description:
      "A long-term product partnership for systems that need to evolve over several months.",
    points: ["Monthly roadmap", "Flexible priorities", "Embedded product support"]
  },
  {
    name: "Mixed Model",
    bestFor: "Most product projects",
    description:
      "Start with a fixed Discovery sprint, then choose a fixed build or an ongoing retainer.",
    points: ["Lower initial risk", "Better scope quality", "Flexible next step"]
  }
];

export const testimonials = [
  {
    client: "Adopt",
    person: "Product lead",
    role: "B2B SaaS",
    quote:
      "Maciej brought structure to a project that had grown in every direction. The result was not only a cleaner interface, but a much clearer way to make future decisions."
  },
  {
    client: "Grafit",
    person: "Agency partner",
    role: "Digital agency",
    quote:
      "He thinks beyond individual screens. The handoff, components and logic are considered from the beginning, which makes collaboration unusually efficient."
  },
  {
    client: "Nowodvorski",
    person: "Marketing team",
    role: "Manufacturing",
    quote:
      "The new system gave our team a repeatable framework. We stopped solving the same layout and content problems from scratch."
  },
  {
    client: "Design Digital",
    person: "Creative director",
    role: "Agency partner",
    quote:
      "Reliable, methodical and comfortable working at the point where design decisions meet technical constraints."
  }
];

export const clientNames = ["Portola", "Adopt", "Nowodvorski", "NASK", "Wide Lab", "Grafit"];
export const agencyPartners = ["Wide Lab", "Grafit", "Design Digital", "Design Me", "Actually"];
export const industries = ["AI", "Fintech", "SaaS", "Healthcare", "Cybersecurity", "Energy", "Technology"];

export const projects: PortfolioProject[] = [
  {
    id: "mpcom-dashboard",
    slug: "mpcom-dashboard",
    title: "MPCOM Client Project System",
    type: "case-study",
    scope: "Product strategy · UX architecture · React prototype",
    industry: "Design systems",
    summary:
      "A portfolio that becomes a working project interface: proposal, timeline, context and client workspace in one system.",
    problem:
      "A traditional portfolio could explain services, but it could not demonstrate the operational system behind them.",
    solution:
      "One data model powers a public process, a proposal table and a private client workspace.",
    architecture: ["Public showcase", "Shared project data", "Client workspace", "Future admin and AI layer"],
    collaborators: ["MPCOM", "Codex"],
    date: "2026",
    stack: ["React", "TypeScript", "Design systems"],
    outputs: ["PRD", "Component architecture", "Interactive prototype"],
    results: ["Clear proof of systems thinking", "Reusable model for future clients"],
    image: "/images/dashboard-shell.png",
    imageAlt: "Early MPCOM dashboard shell sketch"
  },
  {
    id: "process-system",
    slug: "process-system",
    title: "Interactive Project Timeline",
    type: "case-study",
    scope: "Process design · Information architecture · UI system",
    industry: "Professional services",
    summary:
      "A project methodology translated into a timeline that works as sales content, proposal and live status view.",
    problem:
      "Static process descriptions did not explain overlaps, dependencies, outputs or the current state of a project.",
    solution:
      "A shared timeline component exposes the ideal public methodology and the real private project plan.",
    architecture: ["Stage model", "Timeline visualization", "Table representation", "Context drawer"],
    collaborators: ["MPCOM"],
    date: "2025–2026",
    stack: ["Figma", "Webflow", "React prototype"],
    outputs: ["Timeline", "Knowledge base", "Project table"],
    results: ["More transparent scope", "Better project conversations"],
    image: "/images/process-timeline.png",
    imageAlt: "Current MPCOM process timeline"
  },
  {
    id: "nowodvorski",
    slug: "nowodvorski",
    title: "Nowodvorski Web System",
    type: "project",
    scope: "UI system · Website design · Webflow",
    industry: "Manufacturing",
    summary: "A reusable web system designed for continuous content development.",
    problem: "",
    solution: "",
    architecture: [],
    collaborators: ["MPCOM", "Agency team"],
    date: "2025",
    stack: ["Figma", "Webflow"],
    outputs: [],
    results: [],
    liveUrl: "#",
    image: "/images/process-timeline.png",
    imageAlt: "Nowodvorski project"
  },
  {
    id: "nask",
    slug: "nask",
    title: "NASK Digital Experience",
    type: "project",
    scope: "Web design · Component system",
    industry: "Cybersecurity",
    summary: "A structured digital interface for a complex institutional content set.",
    problem: "",
    solution: "",
    architecture: [],
    collaborators: ["MPCOM", "Design Digital"],
    date: "2024",
    stack: ["Figma", "Webflow"],
    outputs: [],
    results: [],
    liveUrl: "#",
    image: "/images/dashboard-shell.png",
    imageAlt: "NASK project"
  },
  {
    id: "fintech-dashboard",
    slug: "fintech-dashboard",
    title: "Fintech Analytics Dashboard",
    type: "project",
    scope: "UX/UI · Dashboard interface",
    industry: "Fintech",
    summary: "A dense analytics interface organized around reusable decision patterns.",
    problem: "",
    solution: "",
    architecture: [],
    collaborators: ["MPCOM"],
    date: "2025",
    stack: ["Figma"],
    outputs: [],
    results: [],
    image: "/images/process-timeline.png",
    imageAlt: "Fintech dashboard project"
  }
];
