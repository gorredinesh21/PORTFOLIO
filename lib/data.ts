// ─────────────────────────────────────────────────────────────────────────────
// Content model for the multi-page visual portfolio.
// Pages: home (featured 4) → /projects (all) → /projects/[slug] (detail)
//        /about → /experience → /contact
// Every project carries an image (live screenshot or generated cover),
// a one-line tagline, and a how-it-works diagram for its detail page.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Gorre Dinesh Chandan Reddy",
  shortName: "Dinesh",
  monogram: "gd",
  roleLine: "Software Engineer — AI, Data & Full-Stack",
  location: "Mumbai, India",
  email: "gorredinesh21@gmail.com",
  github: "https://github.com/gorredinesh21",
  linkedin: "https://www.linkedin.com/in/gorredinesh21",
  resumeUrl: "/Gorre_Dinesh_Chandan_Reddy_Resume.pdf",
  tagline: "I build AI systems end-to-end and put them in front of real users.",
  intro:
    "I build AI systems end-to-end and put them in front of real users. By day I move data into Gold KPI tables and RAG platforms at Reliance; the rest of the time I run a live home-food marketplace and a growing constellation of deployed side projects — agents, retrieval engines and systems written from scratch.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

// ── How-it-works diagrams ────────────────────────────────────────────────────

export type DiagNode = {
  label: string;
  sub?: string;
  tone?: "hot" | "muted";
};

export type Diagram =
  | {
      kind: "flow";
      nodes: DiagNode[];
      loop?: string;
      note?: string;
    }
  | {
      kind: "split";
      head: DiagNode;
      channels: { label: string; nodes: DiagNode[] }[];
      tail: DiagNode;
      note?: string;
    };

// ── Projects ─────────────────────────────────────────────────────────────────

export type ProjectCategory = "GenAI" | "ML / Data" | "Full-Stack" | "Systems";

export type Metric = { v: string; k: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string; // one line — the only text on cards
  category: ProjectCategory;
  featured?: number; // 1..4 → home page order
  cover: string; // image shown on cards
  gallery?: string[]; // extra images on the detail page
  liveUrl?: string;
  liveLabel?: string;
  github?: string;
  stack: string[];
  story: string; // detail page narrative
  question?: string; // the thought-line
  reply?: string; // why it was built this way
  metrics?: Metric[]; // big number tiles on the detail page
  diagram: Diagram;
  diagramCaption?: string;
};

export const categories: ProjectCategory[] = [
  "GenAI",
  "ML / Data",
  "Full-Stack",
  "Systems",
];

export const projects: Project[] = [
  // ── FEATURED ──────────────────────────────────────────────────────────────
  {
    slug: "homaatri",
    name: "Homaatri",
    tagline: "Home-food marketplace, live with real orders every day",
    category: "Full-Stack",
    featured: 1,
    cover: "/shots/homaatri-home.png",
    gallery: ["/shots/homaatri-dishes.png"],
    liveUrl: "https://homatri.com",
    liveLabel: "homatri.com — live",
    github: "https://github.com/gorredinesh21/homatri",
    stack: [
      "Next.js 14",
      "FastAPI",
      "PostgreSQL",
      "React Native (Expo)",
      "WhatsApp Business API",
      "Razorpay",
      "GCP Cloud Run",
    ],
    story:
      "Homaatri is a hyper-local marketplace for home food — real kitchens, real riders, real payments. I built the whole production system myself: a Next.js storefront, a FastAPI backend on Cloud Run, PostgreSQL, three Android apps, and an AI agent on WhatsApp Business that takes a customer from \u201cwhat's near me?\u201d to a paid order in one conversation. It runs with real users and real orders every day.",
    question: "Has anyone actually brought regional home food online?",
    reply:
      "Aggregators list restaurants. A home kitchen needs storefront, payments, delivery coordination and trust — so I built all of it, shipped it, and kept it running. Building the startup taught me more about systems than any course could.",
    metrics: [
      { v: "40–50", k: "orders / day, live" },
      { v: "4", k: "production codebases" },
      { v: "1", k: "engineer running it all" },
      { v: "1 chat", k: "WhatsApp → paid order" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Customer", sub: "WhatsApp · web · app" },
        { label: "AI agent", sub: "finds kitchens, builds the cart" },
        {
          label: "Payment link",
          sub: "minted by code, not by the model",
          tone: "hot",
        },
        { label: "Razorpay webhook", sub: "confirms for real" },
        { label: "Chef portal", sub: "accepts & cooks" },
        { label: "Rider app", sub: "picks up & delivers" },
      ],
      note:
        "One agent owns the whole conversation — ordering, payment, tracking, cancellation. Escalations go to a human admin.",
    },
    diagramCaption: "One order's journey, end to end.",
  },
  {
    slug: "startup-intel",
    name: "Startup Intelligence Platform",
    tagline: "GraphRAG + RAPTOR market intelligence over 175 startups",
    category: "GenAI",
    featured: 2,
    cover: "/shots/startup-intel-graph.png",
    gallery: ["/shots/startup-intel-agent.png"],
    liveUrl: "https://startup-intel-441384612427.us-central1.run.app",
    liveLabel: "Try it live — agent + ecosystem map",
    github: "https://github.com/gorredinesh21/Startup-Intelligence-Platform",
    stack: [
      "LangGraph",
      "Qdrant",
      "Neo4j / NetworkX",
      "BGE embeddings",
      "React Flow",
    ],
    story:
      "Market intelligence as a graph you can walk: entities and relationships (COMPETES_WITH, FUNDED_BY, PARTNERED_WITH) land in a graph while summaries tree into Qdrant via RAPTOR. A LangGraph agent answers multi-hop questions with citations, stepping through its plan live while an interactive React Flow map of incubator-backed startups sits beside it.",
    question: "What if market questions were answered by walking a graph, not by scrolling news?",
    reply:
      "Lists lose relationships. Once competitors, investors and partners are edges, \u201cwho competes with whom\u201d stops being research and becomes a traversal — and the agent shows its steps, so every answer carries its citations.",
    metrics: [
      { v: "175", k: "startups mapped" },
      { v: "20", k: "incubators covered" },
      { v: "188", k: "graph entities" },
      { v: "2020–26", k: "batch range" },
    ],
    diagram: {
      kind: "split",
      head: { label: "Ecosystem corpus", sub: "scraped + curated" },
      channels: [
        {
          label: "RAPTOR tree",
          nodes: [
            { label: "cluster → summarise", sub: "recursive levels" },
            { label: "Qdrant" },
          ],
        },
        {
          label: "relationship graph",
          nodes: [
            { label: "entities + edges", sub: "COMPETES_WITH · FUNDED_BY" },
            { label: "Neo4j / NetworkX" },
          ],
        },
      ],
      tail: { label: "LangGraph agent", sub: "live node-stepper UI + citations", tone: "hot" },
    },
    diagramCaption: "Two indices, one agent — every answer traceable.",
  },
  {
    slug: "vectorshift",
    name: "VectorShift Pipeline Builder",
    tagline: "No-code AI pipeline canvas — nodes as data, not copy-paste",
    category: "Full-Stack",
    featured: 3,
    cover: "/shots/vectorshift-canvas.png",
    liveUrl: "https://vector-shift-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — drag, wire, run",
    github: "https://github.com/gorredinesh21/vector_shift",
    stack: ["React Flow", "Zustand", "FastAPI", "DAG analysis"],
    story:
      "A no-code AI pipeline canvas built around one reusable node abstraction: every node type is a config object — handles, fields, icon — rendered by a single BaseNode. Adding a node is data, not copy-paste, and the FastAPI backend reasons about the resulting DAG (cycles, reachability) rather than just storing it.",
    question: "Why does every node canvas codebase end up copy-pasting nodes?",
    reply:
      "Because each node looks unique on screen. I made the node a schema instead: one BaseNode renders any node type from its config, and the backend validates the graph itself — so new node types cost a config object, not a component rewrite.",
    metrics: [
      { v: "1", k: "BaseNode renders all types" },
      { v: "10+", k: "node types as pure data" },
      { v: "DAG", k: "cycle + reachability checks" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Node config", sub: "pure data", tone: "hot" },
        { label: "One BaseNode", sub: "renders any node" },
        { label: "Canvas + wires", sub: "React Flow · Zustand" },
        { label: "DAG analysis", sub: "cycles · reachability" },
      ],
    },
    diagramCaption: "The whole canvas is one abstraction, applied consistently.",
  },
  {
    slug: "orderpilot",
    name: "OrderPilot",
    tagline: "Agentic food ordering in pure Go — survives its own model dying",
    category: "GenAI",
    featured: 4,
    cover: "/shots/orderpilot-chat.png",
    liveUrl: "https://orderpilot-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — simulated Bangalore map",
    github: "https://github.com/gorredinesh21/orderpilot",
    stack: [
      "Golang",
      "Tool calling",
      "errgroup",
      "SSE streaming",
      "Per-order goroutines",
      "Llama 3.1 (HF)",
      "Cloud Run",
    ],
    story:
      "OrderPilot is an AI food-ordering agent with no agent framework — the tool-calling loop, the strict-JSON turn protocol, the repair retries and the fallback planner are all hand-written Go. Talk to it in plain language, watch it call nine typed tools in parallel, and notice that your budget is enforced inside the cart layer, so the model physically cannot overspend. When the LLM breaks protocol or the API is down, a deterministic planner takes over and ordering keeps working.",
    question: "Did anyone build the agent loop without a framework?",
    reply:
      "Demos hide inside LangChain — the interesting engineering stays invisible. I wrote the loop the way a backend engineer would: typed tools, a wire protocol, guardrails enforced in code instead of prompts, and a fallback so the product never dies with the LLM.",
    metrics: [
      { v: "9", k: "typed tools, parallel calls" },
      { v: "0", k: "LLM calls in fallback mode" },
      { v: "≤16", k: "steps per agent turn" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Your message", sub: "plain language" },
        { label: "LLM turn", sub: "strict JSON: say / tools / reply" },
        { label: "9 typed tools", sub: "run in parallel" },
        {
          label: "Cart guard",
          sub: "budget enforced in code",
          tone: "hot",
        },
        { label: "Live order", sub: "per-order goroutine + map" },
      ],
      loop: "agent loop, ≤16 steps",
      note:
        "LLM unavailable or breaks protocol → a deterministic planner takes over the same tools: full ordering with 0 LLM calls.",
    },
    diagramCaption: "The loop, the guardrail, and the way out when the model dies.",
  },

  // ── GenAI ─────────────────────────────────────────────────────────────────
  {
    slug: "menumind",
    name: "MenuMind",
    tagline: "Hybrid BM25 + vector search over 797 dishes — written from scratch in Go",
    category: "GenAI",
    cover: "/shots/menumind.png",
    liveUrl: "https://menumind-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — search + cited RAG",
    github: "https://github.com/gorredinesh21/menumind",
    stack: [
      "Golang",
      "BM25 (k1=1.5, b=0.75)",
      "bge-small-en-v1.5",
      "Reciprocal Rank Fusion",
      "Grounded RAG",
      "embed.FS",
    ],
    story:
      "MenuMind is a menu-discovery engine over 797 dishes from 36 Bangalore restaurants. BM25 is implemented by hand in Go, fused with cosine similarity over bge-small embeddings using Reciprocal Rank Fusion — and every result shows what each channel contributed. Ask follow-ups and the RAG layer answers only from retrieved dishes, citing them ([D3] brownie) so a hallucinated dish is contractually excluded.",
    question: "Why hand-write BM25 and RRF instead of using a search library?",
    reply:
      "Retrieval you can't explain is a black box with good marketing. Writing the math myself means every ranking decision is visible — you see exactly what lexical and semantic search each contributed, chip by chip, on every result.",
    metrics: [
      { v: "797", k: "dishes embedded" },
      { v: "36", k: "Bangalore restaurants" },
      { v: "0.62", k: "cosine on \u201cwarm\u201D → brownie" },
      { v: "1", k: "distroless binary, no vector DB" },
    ],
    diagram: {
      kind: "split",
      head: {
        label: "\u201cwarm comforting dessert\u201d",
        sub: "one query, two readers",
      },
      channels: [
        {
          label: "BM25 · lexical",
          nodes: [
            { label: "exact tokens", sub: "no 'warm' on menus" },
            { label: "0 hits", tone: "muted" },
          ],
        },
        {
          label: "vectors · semantic",
          nodes: [
            { label: "bge-small cosine" },
            { label: "brownie · 0.62", tone: "hot" },
          ],
        },
      ],
      tail: {
        label: "RRF fusion",
        sub: "every result shows both ranks",
      },
      note:
        "Follow-up questions get grounded RAG answers that cite dish numbers — dishes outside the retrieved set are contractually excluded.",
    },
    diagramCaption: "Why hybrid wins: the channels fail differently, and the fusion shows it.",
  },
  {
    slug: "career-ops",
    name: "Career-Ops",
    tagline: "Job intelligence with evidence-backed matching — every skill claim carries its proof",
    category: "GenAI",
    cover: "/shots/career-ops.png",
    liveUrl: "https://career-ops-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — jobs, evidence, gaps",
    github: "https://github.com/gorredinesh21/career-ops",
    stack: [
      "FastAPI",
      "SQLite",
      "Deterministic NLP",
      "Skill ontology",
      "GitHub API",
      "Cloud Run",
    ],
    story:
      "Career-Ops ingests real job postings from daily pipelines, deduplicates them into one canonical listing per opening, and matches them against a skill graph parsed from your resume and GitHub — where every skill claim carries the exact resume line or repo that proves it. Gaps are typed (presentation vs evidence vs capability), market commonality is computed from the live corpus, and a deterministic agent answers questions like \u201cwhat are my gaps for GenAI?\u201d with numbers instead of vibes.",
    question: "Why not just let an LLM rate my fit for each job?",
    reply:
      "A 78% you can't inspect is a number you can't trust. I wanted matching as decision support: what matched, what's missing, how much it matters, what to do next — each answer computed from evidence, with the provenance attached.",
    metrics: [
      { v: "1,606", k: "postings ingested" },
      { v: "100%", k: "skills with provenance" },
      { v: "3", k: "typed gap kinds" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "1,606 postings", sub: "real daily pipelines" },
        { label: "Dedup + provenance", sub: "one listing per opening" },
        {
          label: "Skill graph",
          sub: "each claim: resume line or repo",
          tone: "hot",
        },
        { label: "Fit bands", sub: "Strong → Major Gap" },
        { label: "Typed gaps", sub: "presentation / evidence / capability" },
      ],
      note:
        "Ask \u201cwhat are my gaps for GenAI?\u201d → answered from the live corpus (\u201cVector DBs: 38% of postings\u201d), never from vibes.",
    },
    diagramCaption: "Evidence in, decisions out — with the trail visible at every step.",
  },
  {
    slug: "voicebank",
    name: "VoiceBank",
    tagline: "Say \u201csend 500 rupees to Mom\u201d — watch a real banking UI get operated end-to-end",
    category: "GenAI",
    cover: "/shots/voicebank.png",
    liveUrl: "https://voicebank-441384612427.us-central1.run.app",
    liveLabel: "Try it live — talk to your bank",
    github: "https://github.com/gorredinesh21/voicebank",
    stack: ["React", "Web Speech API", "Gemini", "FastAPI", "Cloud Run"],
    story:
      "Say \u201csend 500 rupees to Mom\u201d and watch a real banking UI get operated end-to-end — speech recognition → Gemini function-calling → the same React state machine a finger-tap uses, with spoken confirmations and a PIN gate before money moves.",
    metrics: [
      { v: "3", k: "allowed actions: navigate / fill / tap" },
      { v: "PIN", k: "gate before money moves" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Mic", sub: "continuous en-IN STT" },
        { label: "Gemini", sub: "intent → typed actions" },
        { label: "Sanitizer", sub: "NAVIGATE/FILL/TAP only", tone: "hot" },
        { label: "UI state machine", sub: "same path as a tap" },
        { label: "Spoken PIN gate", sub: "money moves only after it" },
      ],
    },
    diagramCaption: "Voice becomes typed actions — the UI never knows it wasn't tapped.",
  },
  {
    slug: "sahayak",
    name: "Sahayak",
    tagline: "Voice-first UPI support agent — 7-signal wrong-transfer recovery with RBI-style SLA clocks",
    category: "GenAI",
    cover: "/shots/sahayak.png",
    liveUrl: "https://sahayak-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — inside a Paytm-style demo app",
    github: "https://github.com/gorredinesh21/sahayak",
    stack: ["FastAPI", "Gemini", "SQLite", "Web Speech API", "Cloud Run"],
    story:
      "A voice-first UPI support agent inside a simulated payments app: it diagnoses wrong-recipient transfers with a 7-signal evidence engine, runs RBI-style SLA clocks that auto-file disputes when banks breach them, explains failures by NPCI stage — and keeps the same grounded voice even when Gemini is down.",
    metrics: [
      { v: "7", k: "scoring signals per case" },
      { v: "auto", k: "dispute filed on SLA breach" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "UPI failure", sub: "voice or chat" },
        { label: "Stage diagnosis", sub: "which NPCI hop died" },
        { label: "7-signal analysis", sub: "verdict + confidence", tone: "hot" },
        { label: "SLA clock", sub: "RBI-style deadlines" },
        { label: "Dispute auto-filed", sub: "on breach, with evidence" },
      ],
      note: "Gemini unavailable → the same grounded reply, same RRN, same numbers — from the deterministic engine.",
    },
    diagramCaption: "Support that keeps working when the model doesn't.",
  },
  {
    slug: "ragmill",
    name: "RAGMill",
    tagline: "RAG designed for a million documents — sharded ingest, hybrid retrieval, eval-gated",
    category: "GenAI",
    cover: "/shots/ragmill.png",
    liveUrl: "https://ragmill-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — cited answers",
    github: "https://github.com/gorredinesh21/ragmill",
    stack: ["FastAPI", "Vertex AI", "Qdrant", "fastembed", "Cloud Run Jobs"],
    story:
      "RAG designed to survive a million documents: sharded Cloud Run ingest with idempotent upserts, hybrid dense+BM25 retrieval fused by RRF, Gemini answers with [n] citations, and a golden-set eval harness that gates every retrieval change.",
    metrics: [
      { v: "1M", k: "documents by design" },
      { v: "0.72", k: "hit@10 hybrid vs 0.67 dense" },
    ],
    diagram: {
      kind: "split",
      head: { label: "1M documents", sub: "sharded ingest · idempotent upserts" },
      channels: [
        { label: "dense", nodes: [{ label: "bge vectors", sub: "fastembed ONNX" }] },
        { label: "sparse", nodes: [{ label: "BM25", sub: "in-process index" }] },
      ],
      tail: { label: "RRF → rerank → cited answer", sub: "golden-set gated", tone: "hot" },
    },
    diagramCaption: "Retrieval changes ship only when the golden set says so.",
  },
  {
    slug: "quackquery",
    name: "QuackQuery",
    tagline: "English → audited SQL over any CSV — the query always sits next to the answer",
    category: "GenAI",
    cover: "/shots/quackquery.png",
    liveUrl: "https://quackquery-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — upload a CSV",
    github: "https://github.com/gorredinesh21/quackquery",
    stack: ["FastAPI", "Gemini", "DuckDB", "SSE", "SQLite cache"],
    story:
      "Upload a CSV, ask in plain English: the generated SQL always sits next to the answer, dangerous SQL is structurally impossible, and a bad first draft feeds its own error back and self-repairs up to three times before giving up honestly.",
    metrics: [
      { v: "3×", k: "self-repair attempts" },
      { v: "SELECT", k: "only — enforced structurally" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "English question" },
        { label: "SQL draft" },
        { label: "Guard", sub: "SELECT-only, no smuggling", tone: "hot" },
        { label: "DuckDB", sub: "rows + chart next to the SQL" },
      ],
      loop: "SQL error → repair ×3",
    },
    diagramCaption: "Text-to-SQL you can audit, with honest failure.",
  },
  {
    slug: "diffwarden",
    name: "DiffWarden",
    tagline: "PR review bot — cheap deterministic gates before any LLM call, cached by diff hash",
    category: "GenAI",
    cover: "/shots/diffwarden.png",
    liveUrl: "https://diffwarden-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live",
    github: "https://github.com/gorredinesh21/diffwarden",
    stack: ["FastAPI", "Gemini", "ruff", "bandit", "SQLite"],
    story:
      "A PR review bot that layers cheap deterministic gates (secrets, ruff, bandit) before any LLM call — the model only reviews what survives, inside a hard character budget, with SQLite caching so unchanged diffs never re-bill.",
    metrics: [
      { v: "0", k: "LLM calls before gates pass" },
      { v: "hash", k: "cache — unchanged diffs never re-bill" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "PR diff" },
        { label: "Gates", sub: "secrets · ruff · bandit — free & instant", tone: "hot" },
        { label: "Budget-capped Gemini", sub: "hard character limit" },
        { label: "Findings", sub: "cached by diff hash" },
      ],
    },
    diagramCaption: "Cost control as architecture, not prompt discipline.",
  },
  {
    slug: "support-copilot",
    name: "Support Copilot",
    tagline: "Microsoft-docs RAG assistant — 1.00 citation rate, answers regenerate when citations vanish",
    category: "GenAI",
    cover: "/shots/support-copilot.png",
    liveUrl: "https://support-copilot-441384612427.us-central1.run.app",
    liveLabel: "Try it live",
    github: "https://github.com/gorredinesh21/support-copilot",
    stack: ["React", "FastAPI", "Gemini", "RAG", "KQL"],
    story:
      "A support assistant that answers only from a 30-document corpus, cites every source, and regenerates answers that forget their [n] markers — with App-Insights telemetry and a KQL dashboard for success rate, p95 latency and no-answer rate.",
    metrics: [
      { v: "1.00", k: "citation rate, enforced" },
      { v: "30", k: "docs, nothing else answerable" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "30 support docs" },
        { label: "Header-aware chunks" },
        { label: "Retrieve" },
        { label: "Answer with [n]", sub: "citation rate 1.00", tone: "hot" },
      ],
      loop: "forgot citations → regenerate once",
    },
    diagramCaption: "Grounding that repairs itself when it slips.",
  },
  {
    slug: "wingman-ai",
    name: "Wingman AI",
    tagline: "Human-in-the-loop dating-profile coach — publishes only what you approve",
    category: "GenAI",
    cover: "/shots/wingman.png",
    liveUrl: "https://tinder-ai-coach-441384612427.us-central1.run.app",
    liveLabel: "Try it live",
    github: "https://github.com/gorredinesh21/TINDER_MCP_AI",
    stack: ["LangChain", "Gemini", "Ollama", "FastAPI", "Vision"],
    story:
      "A human-in-the-loop dating-profile coach: scores and rewrites bios from your real details, plans photos with a vision model, and publishes only what you approve — backed by a swappable LLM brain (local Ollama, Gemini or Hugging Face) tuned for the Indian market.",
    metrics: [
      { v: "3", k: "swappable brains at runtime" },
      { v: "0", k: "facts invented in rewrites" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Your profile" },
        { label: "Rubric score", sub: "research-backed" },
        { label: "Rewrites", sub: "never invented facts" },
        { label: "Vision photo plan", sub: "keep / drop / order" },
        { label: "You approve → publish", tone: "hot" },
      ],
      note: "Brain swappable at runtime: Ollama · Gemini · Hugging Face — the app never knows which.",
    },
    diagramCaption: "AI drafts, human decides.",
  },
  {
    slug: "career-ops-3",
    name: "Career-Ops 3.0",
    tagline: "Zero-LLM-cost job fetch → Zod-validated fit scores → ATS-ready tailored PDFs",
    category: "GenAI",
    cover: "/shots/career-ops-3.png",
    liveUrl: "https://career-ops-dashboard-441384612427.us-central1.run.app",
    liveLabel: "Try it live — job tracker",
    github: "https://github.com/gorredinesh21/career-ops-3.0",
    stack: ["Node.js", "LangChain.js", "Zod", "LaTeX"],
    story:
      "The code-owned evolution of my job pipeline: fetches postings from Greenhouse, Ashby, Lever and LinkedIn at zero LLM cost, scores every job /5 with Zod-validated LangChain.js chains, and renders ATS-ready JD-specific resumes from an LLM-distilled catalog of 23 repos.",
    metrics: [
      { v: "$0", k: "LLM cost for fetching" },
      { v: "23", k: "repos distilled into a catalog" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Greenhouse · Lever · Ashby", sub: "$0 LLM cost" },
        { label: "Fit score /5", sub: "Zod-validated chains", tone: "hot" },
        { label: "Tailored resume", sub: "distilled from 23 repos" },
        { label: "ATS-ready PDF" },
      ],
    },
    diagramCaption: "The pipeline that produced every tailored resume I've sent.",
  },

  // ── ML / Data ─────────────────────────────────────────────────────────────
  {
    slug: "jev-laya-benchmark",
    name: "Jev vs Laya — SLM Benchmark",
    tagline: "A measured head-to-head on a free GPU — constrained scoring, honest latency columns",
    category: "ML / Data",
    cover: "/shots/jev-laya.png",
    liveUrl: "https://jev-laya-benchmark-yzzxrxetcq-el.a.run.app",
    liveLabel: "See the results site",
    github: "https://www.kaggle.com/code/gorredineshchandan/jev-laya-slm-benchmark",
    stack: ["PyTorch", "Transformers", "Kaggle T4", "Constrained decoding"],
    story:
      "A measured head-to-head between Laya (Sarvam's 1.2B model) and a 1.5B open LLM on the same free GPU: toxicity moderation, Banking77 intent, AG News — constrained label scoring (0% invalid outputs by construction), honest latency columns, and a results site anyone can check. The full harness is a public Kaggle notebook.",
    metrics: [
      { v: "0%", k: "invalid outputs, by construction" },
      { v: "3", k: "benchmarks, one harness" },
      { v: "T4", k: "free GPU, reproducible" },
    ],
    diagram: {
      kind: "split",
      head: { label: "Same prompts, same free T4", sub: "toxicity · Banking77 · AG News" },
      channels: [
        { label: "Laya 1.2B", nodes: [{ label: "Sarvam", sub: "fine-tuned candidate" }] },
        { label: "open 1.5B", nodes: [{ label: "baseline", sub: "same harness" }] },
      ],
      tail: { label: "Logprob-scored accuracy + latency", sub: "invalid answers impossible by construction", tone: "hot" },
    },
    diagramCaption: "Model claims, measured — and re-runnable by anyone.",
  },
  {
    slug: "gan-augmentation",
    name: "GAN-Based Data Augmentation",
    tagline: "B.Tech thesis — tabular GAN + SMOTE against severe class imbalance, McNemar-tested",
    category: "ML / Data",
    cover: "/art/gan.jpg",
    github: "https://github.com/gorredinesh21/FINAL_YEAR_PROJECT",
    stack: ["Python", "PyTorch", "GANs", "SMOTE", "XGBoost", "McNemar's test"],
    story:
      "Fraud and rare-event tabular datasets are pathologically imbalanced, and naïve oversampling distorts decision boundaries. My thesis asked how far a custom tabular GAN could push recall without sacrificing precision — and whether the lift was statistically real. GAN-synthesised positives combined with SMOTE feed four classifier families (RF, XGBoost, LightGBM, GBM) under 5-fold CV; McNemar's test compares them head-to-head. On a 10M+ row credit-card dataset: false negatives down to 9, recall 0.91 → 0.99.",
    metrics: [
      { v: "10M+", k: "rows, credit-card fraud" },
      { v: "0.91→0.99", k: "recall, statistically tested" },
      { v: "9", k: "false negatives, down from far more" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Noise" },
        { label: "Generator", sub: "128 → 512 · Tanh" },
        { label: "Synthetic rows + SMOTE", tone: "hot" },
        { label: "4 classifier families", sub: "5-fold CV · McNemar's" },
        { label: "Recall 0.91 → 0.99" },
      ],
    },
    diagramCaption: "The thesis in one line: synthetic rare-class rows, tested for real.",
  },
  {
    slug: "movie-recommender",
    name: "Movie Recommendation System",
    tagline: "Cold-start content-based recommender over 5,000 movies — posters included",
    category: "ML / Data",
    cover: "/shots/movie-recommender.png",
    liveUrl: "https://movie-recommender-441384612427.us-central1.run.app",
    liveLabel: "Try it live",
    github: "https://github.com/gorredinesh21/MOVIE_RECOMENDATION_SYSTEM",
    stack: ["Python", "scikit-learn", "Cosine similarity", "Streamlit", "TMDb API"],
    story:
      "A cold-start, content-based recommender over 5,000 movies: genre, cast, crew and overview text vectorised bag-of-words, pairwise cosine similarity precomputed and pickled for instant lookup, posters via TMDb in a Streamlit UI.",
    metrics: [
      { v: "5,000", k: "movies, no ratings needed" },
      { v: "0", k: "cold-start problem — content-based" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "A movie" },
        { label: "BoW vector", sub: "genre · cast · crew · overview" },
        { label: "Cosine vs 5,000", sub: "precomputed matrix" },
        { label: "Top-10 + posters", tone: "hot" },
      ],
    },
    diagramCaption: "One movie in, ten similar out — instantly.",
  },
  {
    slug: "mars-landmark-detection",
    name: "Mars Landmark Detection",
    tagline: "VGG16 transfer learning for 8-class Martian terrain classification",
    category: "ML / Data",
    cover: "/art/mars.jpg",
    github: "https://github.com/gorredinesh21/MARS_LANDMARK_DETECTION",
    stack: ["Python", "TensorFlow", "Keras", "VGG16", "Transfer learning"],
    story:
      "Rovers and orbiters generate huge image streams, but identifying craters, valleys and plateaus still leans on manual inspection. I tested how far a frozen ImageNet backbone could automate that on a real planetary-science dataset. VGG16's convolutional base stays frozen over 8,200 training images; a small dense head learns the 8 landmark classes — reaching 88% training accuracy, with weights exported so inference rehydrates in a few lines.",
    metrics: [
      { v: "8,200", k: "training images" },
      { v: "8", k: "terrain classes" },
      { v: "88%", k: "training accuracy" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Mars image" },
        { label: "Frozen VGG16", sub: "ImageNet features", tone: "hot" },
        { label: "Small dense head", sub: "only this trains" },
        { label: "8 classes", sub: "crater · valley · plateau…" },
      ],
    },
    diagramCaption: "Planetary science on a student GPU budget.",
  },
  {
    slug: "ocr-entity-extraction",
    name: "Image-Based Entity Extraction",
    tagline: "OCR at scale on CPU only — Amazon ML Challenge, top 200 of 18,500+",
    category: "ML / Data",
    cover: "/art/ocr.jpg",
    github: "https://github.com/gorredinesh21/ImageEntityExtraction",
    stack: ["Python", "PyTesseract", "OCR", "Regex", "Pandas"],
    story:
      "Product catalogues often hide critical attributes — weight, voltage, dimensions — inside images. The Amazon ML Challenge handed us 260K training images of wildly variable quality and no GPU budget. I ran PyTesseract on raw images (no preprocessing, to stay inside CPU limits) and built regex post-processors per entity type with unit-normalisation maps. 130K+ images processed, top 200 of 18,500+ teams.",
    metrics: [
      { v: "130K+", k: "images processed on CPU" },
      { v: "Top 200", k: "of 18,500+ teams" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Product image" },
        { label: "PyTesseract", sub: "no preprocessing — CPU budget" },
        { label: "Regex + unit map", tone: "hot" },
        { label: "Entity table", sub: "weight · volts · dims" },
      ],
    },
    diagramCaption: "Constraints as design input.",
  },
  {
    slug: "facial-attendance",
    name: "Facial Recognition Attendance",
    tagline: "Hackfest'23 — face-recognition attendance + student/teacher portal",
    category: "ML / Data",
    cover: "/art/facial.jpg",
    github: "https://github.com/gorredinesh21/The-Bit-Lords---IIT-ISM-Dhanbhad",
    stack: ["Python", "Flask", "OpenCV", "face_recognition", "Excel/CSV"],
    story:
      "Roll calls eat class time and the records are hard to audit. For Hackfest'23 our team shipped the full loop: enrol faces once, then a live camera marks attendance and writes the roster. Encoded faces are compared per frame with distance-based best-match; recognised students are removed from the pending list and logged with a timestamp to CSV — a teacher dashboard handles resources and announcements.",
    metrics: [
      { v: "1×", k: "enrolment per student" },
      { v: "live", k: "camera → roster, no roll call" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Camera", sub: "live frames" },
        { label: "Face encodings" },
        { label: "Best-distance match", tone: "hot" },
        { label: "CSV roster", sub: "name + timestamp" },
      ],
    },
    diagramCaption: "The full loop, shipped in a weekend.",
  },

  // ── Full-Stack ────────────────────────────────────────────────────────────
  {
    slug: "impostor-party",
    name: "Impostor Party",
    tagline: "Real-time multiplayer party game — one word, one liar, pure WebSockets",
    category: "Full-Stack",
    cover: "/shots/impostor-party.png",
    liveUrl: "https://impostor-party-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — bring friends",
    stack: ["Node.js", "ws (WebSockets)", "Vanilla JS", "Cloud Run"],
    story:
      "A real-time multiplayer party game — everyone gets the same word except the impostor. Pure Node + WebSockets: rooms with a phase state machine (lobby → reveal → discuss → vote), up to 12 players, host-controlled impostor count, single-instance in-memory state on Cloud Run. No frameworks, no database.",
    metrics: [
      { v: "12", k: "players per room" },
      { v: "0", k: "frameworks, 0 databases" },
    ],
    diagram: {
      kind: "flow",
      loop: "next round",
      nodes: [
        { label: "Host creates room", sub: "4-letter code" },
        { label: "Word dealt", sub: "one player gets a different one", tone: "hot" },
        { label: "Discuss", sub: "find the impostor" },
        { label: "Vote + reveal" },
      ],
      note: "One WebSocket server, rooms in memory — no database, no framework.",
    },
    diagramCaption: "Multiplayer with nothing to install and nothing to break.",
  },
  {
    slug: "crickkart",
    name: "CricKart",
    tagline: "Full MERN cricket store — Stripe checkout, admin panel, transactional email",
    category: "Full-Stack",
    cover: "/art/crickkart.jpg",
    github: "https://github.com/gorredinesh21/CricKart",
    stack: ["React", "Redux", "Node.js", "MongoDB", "Stripe", "Cloudinary"],
    story:
      "I wanted a real, production-shaped web app end-to-end — not a toy CRUD demo: auth, payments, image hosting, transactional email, an admin control plane and a deployable build. An 18+ endpoint Express/Mongo API backs a Redux storefront with search, filters and reviews; Stripe PaymentIntents handle money; JWT rides HTTP-only cookies with role-based access to the admin dashboard, which manages products, orders, users and revenue analytics.",
    metrics: [
      { v: "18+", k: "API endpoints" },
      { v: "Stripe", k: "real PaymentIntents" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Storefront", sub: "Redux · filters · reviews" },
        { label: "Cart" },
        { label: "PaymentIntent", sub: "client_secret only", tone: "hot" },
        { label: "Admin panel", sub: "orders · users · revenue" },
      ],
    },
    diagramCaption: "E-commerce, all the sharp edges included.",
  },
  {
    slug: "finnest",
    name: "FinNest",
    tagline: "Full-stack online banking — Spring Boot REST + React/Redux, every path audited",
    category: "Full-Stack",
    cover: "/art/finnest.jpg",
    github: "https://github.com/gorredinesh21/FinNest",
    stack: ["Java", "Spring Boot 2.7", "JPA / Hibernate", "MySQL", "React", "Redux"],
    story:
      "My bridge into the strongly-typed, enterprise-style JVM world: a layered Spring Boot backend modelling users, accounts, transactions and payments, paired with a React + Redux dashboard. The transaction engine does deposits, inter-account transfers, withdrawals and bill payments with balance validation on every path — and every attempt, failed or not, lands in the audit log.",
    metrics: [
      { v: "100%", k: "paths balance-validated" },
      { v: "all", k: "attempts audit-logged, even failures" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Transfer request" },
        { label: "Validate", sub: "same-account · zero · empty" },
        { label: "Balance check", tone: "hot" },
        { label: "Debit + credit" },
        { label: "Audit log", sub: "failures logged too" },
      ],
    },
    diagramCaption: "Money movement with a paper trail.",
  },
  {
    slug: "ethereum-payments-dapp",
    name: "Ethereum Payments DApp",
    tagline: "Multi-chain ETH & ERC-20 transfers with MetaMask — on-chain history",
    category: "Full-Stack",
    cover: "/art/ethereum.jpg",
    github: "https://github.com/gorredinesh21/BLOCKCHAIN",
    stack: ["React", "ethers.js", "Solidity", "Sepolia", "Polygon"],
    story:
      "Hands-on Web3: wallet auth, multi-chain detection, ERC-20 UX and on-chain value movement — shipping something that actually moved real testnet funds end-to-end. A custom PayPal-like Solidity contract stores payment history on-chain; the React client auto-detects network switches and re-fetches balances, and pasting any token contract address makes it transactable.",
    metrics: [
      { v: "2+", k: "chains auto-detected" },
      { v: "on-chain", k: "payment history, by contract" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "MetaMask", sub: "signs everything" },
        { label: "ethers.js" },
        { label: "Contract call", sub: "ERC-20 or ETH", tone: "hot" },
        { label: "On-chain history" },
      ],
    },
    diagramCaption: "Web3 without the hand-waving.",
  },
  {
    slug: "job-application-organizer",
    name: "Job Application Organizer",
    tagline: "Raw job leads → scored, tracked, LaTeX-tailored PDF applications",
    category: "Full-Stack",
    cover: "/art/joborg.jpg",
    github: "https://github.com/gorredinesh21/JOB_APPLICATION_HANDLER",
    stack: ["Python", "LangChain", "SQLite", "LaTeX", "Flask"],
    story:
      "Job hunting is a pipeline problem: leads arrive from Telegram posts and Gmail alerts as messy JSON, and the repetitive work — enriching descriptions, scoring fit, tracking status — shouldn't be manual. Each posting gets its apply_url scraped and cleaned by an LLM, scored 1–100 against my resume, stored in SQLite as the single source of truth, and strong matches get a tailored resume rendered through LaTeX to PDF — all browsable in a Flask dashboard where every score, source and apply link stays visible. It later evolved into Career-Ops 3.0, but this was the organizer that started the lineage.",
    metrics: [
      { v: "1–100", k: "fit score per lead" },
      { v: "PDF", k: "tailored resumes via LaTeX" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Raw leads", sub: "Telegram · Gmail JSON" },
        { label: "Enrich JD", sub: "LLM-cleaned" },
        { label: "Score 1–100", sub: "vs my resume" },
        { label: "SQLite ledger" },
        { label: "Tailored PDF", tone: "hot" },
      ],
    },
    diagramCaption: "The organizer that became a product lineage.",
  },
  {
    slug: "snake-flappy",
    name: "Snake + Flappy Bird",
    tagline: "First-year C++ console games — now playable in the browser",
    category: "Full-Stack",
    cover: "/shots/cpp-games.png",
    liveUrl: "https://cpp-games-441384612427.us-central1.run.app/snake.html",
    liveLabel: "Play it live",
    github: "https://github.com/gorredinesh21/snake-game-",
    stack: ["C++", "Win32 console", "HTML5 Canvas"],
    story:
      "Early in college I wanted C++ beyond textbook exercises, so I reproduced real games inside the Windows terminal — loops, non-blocking input, screen refresh and state, with no graphics library. Snake runs a grid loop with kbhit steering; Flappy adds gravity, rolling pipes and collision on the same console primitives. Both later got HTML5 canvas ports so they're playable in a browser.",
    metrics: [
      { v: "0", k: "graphics libraries used" },
      { v: "2", k: "games, console → canvas" },
    ],
    diagram: {
      kind: "flow",
      loop: "every frame",
      nodes: [
        { label: "draw" },
        { label: "input", sub: "non-blocking", tone: "hot" },
        { label: "logic", sub: "collision · physics" },
        { label: "sleep 40ms" },
      ],
    },
    diagramCaption: "Where the systems instincts started.",
  },

  // ── Systems ───────────────────────────────────────────────────────────────
  {
    slug: "voltkv",
    name: "voltkv",
    tagline: "Redis-compatible in-memory KV store written from scratch in Go",
    category: "Systems",
    cover: "/art/voltkv.jpg",
    gallery: ["/shots/voltkv-demo.png"],
    liveUrl: "https://voltkv-demo-441384612427.us-central1.run.app",
    liveLabel: "Try it live — command page",
    github: "https://github.com/gorredinesh21/voltkv",
    stack: ["Go", "RESP2", "TCP", "Sharding", "AOF"],
    story:
      "I wanted to understand what Redis actually is under the hood — protocol parsing, safe concurrency, expiry, durability — by building one instead of reading about one. It speaks the real RESP2 wire protocol, so redis-cli and redis-benchmark connect without knowing the difference. 16 keyspace shards with per-shard locks keep it correct under thousands of connections; a background sweeper handles TTL and an optional AOF survives restarts.",
    question: "What is Redis, actually, once the marketing is removed?",
    reply:
      "A TCP protocol, a hash map, a lock strategy and a persistence story. Building each one made those four ideas concrete in a way no course did.",
    metrics: [
      { v: "16", k: "keyspace shards, per-shard locks" },
      { v: "RESP2", k: "real redis-cli connects" },
      { v: "AOF", k: "optional restart survival" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "redis-cli", sub: "real clients just work" },
        { label: "RESP2 parser", tone: "hot" },
        { label: "16 shards", sub: "per-shard locks" },
        { label: "TTL sweep · AOF" },
      ],
    },
    diagramCaption: "The product is the protocol, not the pixels.",
  },
  {
    slug: "llmgateway",
    name: "LLM Gateway",
    tagline: "Concurrent LLM / embedding gateway in Go — 32× faster batch embedding",
    category: "Systems",
    cover: "/art/gateway.jpg",
    gallery: ["/shots/llmgateway.png"],
    liveUrl: "https://llmgateway-441384612427.us-central1.run.app",
    liveLabel: "API reference, live",
    github: "https://github.com/gorredinesh21/llmgateway",
    stack: ["Go", "Worker pools", "Token-bucket", "context", "Benchmarks"],
    story:
      "Calling LLM and embedding providers at scale is easy to get wrong: unbounded goroutines trip rate limits, and a cancelled request should cancel the whole batch. This was my way of learning to do the concurrency, backpressure and cancellation properly — with Go benchmarks to check myself. A bounded worker pool keeps many provider calls in flight (1 → 32 workers ≈ 32× speedup, verified), a token-bucket limiter respects provider RPS, and context threads through every call. Embedding 2,000 chunks drops from 10.7s serial to 0.33s pooled.",
    question: "Why does \u201cjust add goroutines\u201d break at scale?",
    reply:
      "Unbounded concurrency trips rate limits and loses cancellation. Bounded pools, token buckets and context-propagation are the actual answer — and benchmarks prove it instead of asserting it.",
    metrics: [
      { v: "32×", k: "faster batch embedding, verified" },
      { v: "10.7s→0.33s", k: "2,000 chunks, serial → pooled" },
    ],
    diagram: {
      kind: "flow",
      nodes: [
        { label: "2,000 chunks", sub: "10.7s serial" },
        { label: "Bounded pool", sub: "1 → 32 workers", tone: "hot" },
        { label: "Token bucket", sub: "respects provider RPS" },
        { label: "0.33s pooled", sub: "≈ 32× faster", tone: "hot" },
      ],
      note: "One cancellation kills the whole batch cleanly — context runs through every call.",
    },
    diagramCaption: "Concurrency with receipts.",
  },
  {
    slug: "tcp-proxy-server",
    name: "TCP Client–Proxy Server",
    tagline: "Raw C++ sockets, POSIX threads, persistence — no wrappers",
    category: "Systems",
    cover: "/art/tcpproxy.jpg",
    github: "https://github.com/gorredinesh21/OS-PROJECRT",
    stack: ["C++", "TCP sockets", "POSIX threads", "File I/O"],
    story:
      "The OS course wanted systems-level work that demonstrated socket programming and protocol design — not a library being run. The server binds, listens and accepts; each connection hands a URL from the client, persists it to GET.txt, acknowledges, and the accept loop keeps listening. Raw sockets in C++, no wrappers.",
    metrics: [
      { v: "0", k: "libraries beyond POSIX" },
      { v: "1", k: "accept loop, many clients" },
    ],
    diagram: {
      kind: "flow",
      loop: "accept loop",
      nodes: [
        { label: "Client" },
        { label: "bind · listen · accept", tone: "hot" },
        { label: "recv URL" },
        { label: "GET.txt + ack" },
      ],
    },
    diagramCaption: "Sockets, the way the course intended.",
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

// ── Home stats strip ─────────────────────────────────────────────────────────

export const homeStats: Metric[] = [
  { v: "40–50", k: "orders/day on Homaatri" },
  { v: "24", k: "projects, most of them live" },
  { v: "175", k: "startups in one graph" },
  { v: "32×", k: "faster embeddings in Go" },
];

// ── Approach ─────────────────────────────────────────────────────────────────

export const approach = [
  {
    step: "01",
    title: "Build it like a product",
    body: "Every project gets a landing surface, a working example and visible errors. If it can't survive a stranger clicking it, it isn't finished.",
    pairs: [
      ["A vague idea", "smallest real version"],
      ["A clever model", "a page you can use"],
    ],
  },
  {
    step: "02",
    title: "Prove it with numbers",
    body: "Tests, benchmarks and golden sets gate every change. Claims carry receipts — retrieval invariants are asserted in CI, not in a README.",
    pairs: [
      ["A claim", "a measurement"],
      ["\u201cit feels better\u201d", "hit@10: 0.72 vs 0.67"],
    ],
  },
  {
    step: "03",
    title: "Ship it and keep it running",
    body: "Deployed on GCP, watched, and fixed when it breaks — 40–50 orders a day doesn't tolerate downtime. Fallbacks are designed before launch day.",
    pairs: [
      ["Works on my machine", "works at 2 am"],
      ["The LLM dies", "the product doesn't"],
    ],
  },
];

// ── About ────────────────────────────────────────────────────────────────────

export const aboutBio = [
  {
    heading: "Background",
    content: [
      "Computer Science graduate from IIT (ISM) Dhanbad (2025), now a Graduate Engineer Trainee at Reliance Industries in Mumbai — working across data engineering, RAG systems and Gen-AI platforms on Databricks and Azure.",
      "My journey started with Machine Learning in my third year and grew across Deep Learning, Computer Vision, NLP and Transformers. For the last year I have gone deep on Generative AI — LangChain, LangGraph, agents, MCP and RAG — and on Go for the systems underneath.",
      "Alongside all of that I build full-stack web apps and run a live startup, because shipping the whole product — not just the model — is what I enjoy most.",
    ],
  },
  {
    heading: "How I work",
    content: [
      "I learn on demand: when a project needs a skill I don't have yet, I go and get it. Java + Spring Boot, Stripe payments, smart contracts, vector databases — each one started as \u201cI need this for what I'm building.\u201d",
      "Most of what I know comes from building things and fixing them when they break. I gravitate towards ideas that make everyday life a little easier, and I keep them running after the launch commit.",
    ],
  },
  {
    heading: "Right now",
    content: [
      "At work: designing a Unified Genie architecture on Databricks that beats the native 30-table limit, and a Talk-to-Genie web app that lets non-Databricks users converse with internal data over OAuth.",
      "On the side: running Homaatri and its WhatsApp ordering agent, plus Go AI systems in production — OrderPilot and MenuMind — and LLM infrastructure (concurrent embedding gateway, Redis-compatible KV store).",
    ],
  },
];

export const experience = [
  {
    company: "Reliance Industries Ltd.",
    role: "Graduate Engineer Trainee — Data / AI Engineer",
    location: "Mumbai, India",
    period: "Aug 2025 – Present",
    stack: ["Databricks", "PySpark", "Azure Data Factory", "ADLS Gen2", "RAG", "FastAPI"],
    highlights: [
      {
        title: "Talk-to-Genie Platform",
        body: "External web app integrating Databricks Genie via OAuth — secure conversational access to internal data for users without Databricks seats.",
      },
      {
        title: "Unified Genie Architecture",
        body: "RAG framework that overcomes Genie's hard 30-table limit: 120+ tables organised across 9 spaces with a semantic routing layer in front.",
      },
      {
        title: "Intelligent Query Routing Engine",
        body: "Semantic retrieval over table and column metadata routes prompts to the most relevant Genie space — better answers, less wasted retrieval.",
      },
      {
        title: "KPI Analytics Platform",
        body: "Databricks workflows and PySpark notebooks transforming Silver datasets into the Gold KPI tables behind operational dashboards.",
      },
    ],
  },
];

export const education = {
  degree: "B.Tech, Computer Science and Engineering",
  school: "Indian Institute of Technology (ISM), Dhanbad",
  period: "Dec 2021 – May 2025",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "DBMS",
    "Computer Networks",
    "Deep Learning",
  ],
};

export const awards = [
  {
    title: "Amazon ML Challenge — Top 200 of 18,500+",
    detail: "OCR-based entity extraction over 130K+ product images, CPU-only.",
    year: "2024",
  },
  {
    title: "Paytm Build for India — Finale",
    detail: "SAHAYAK (team Maverick): UPI literacy and scam-defense for first-time users.",
    year: "2026",
  },
  {
    title: "Hackfest'23 — IIT (ISM) Dhanbad",
    detail: "Facial-recognition attendance system with student/teacher portals (The Bit Lords).",
    year: "2023",
  },
  {
    title: "JEE Advanced — AIR 2903 · JEE Mains — AIR 4616",
    detail: "Among ~1.1M candidates; led to IIT (ISM) Dhanbad.",
    year: "2021",
  },
];

export const oss = [
  {
    title: "eino-ext — data race fix",
    body: "Found and fixed a concurrent-map data race in ByteDance's Go LLM framework extensions; PR merged with a reproduction test.",
    url: "https://github.com/cloudwego/eino-ext",
    tag: "cloudwego/eino-ext · PR #1023",
  },
  {
    title: "opencode — terminal AI agent",
    body: "Bug fix accepted upstream in opencode, the open-source terminal coding agent.",
    url: "https://github.com/sst/opencode",
    tag: "sst/opencode · PR #52315",
  },
];

export const skills = [
  {
    label: "Languages",
    items: ["Go", "Python", "TypeScript", "Java", "SQL", "C++"],
  },
  {
    label: "AI",
    items: [
      "LangChain / LangGraph",
      "RAG / GraphRAG",
      "Agents & tool calling",
      "MCP",
      "Gemini / Llama",
      "Ollama",
    ],
  },
  {
    label: "Data",
    items: ["Databricks", "PySpark", "Azure Data Factory", "PostgreSQL", "Qdrant", "DuckDB"],
  },
  {
    label: "Web & Cloud",
    items: ["React / Next.js", "FastAPI", "Node.js", "Spring Boot", "GCP Cloud Run", "Docker"],
  },
];
