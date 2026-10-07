// ─────────────────────────────────────────────────────────────────────────────
// Content model for the single-page portfolio.
// Sections: hero → work (featured case studies) → workbench → mini projects
//           → approach → about → experience → awards → open source → contact
// Every project carries a "how it works" diagram instead of code — the
// graphics show the working; the words explain it.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Gorre Dinesh Chandan Reddy",
  shortName: "Dinesh",
  monogram: "gd",
  roleLine: "Software Engineer — AI, Data & Full-Stack",
  orbitLine: "Mumbai, India · building in low-Earth ambition",
  location: "Mumbai, India",
  email: "gorredinesh21@gmail.com",
  github: "https://github.com/gorredinesh21",
  linkedin: "https://www.linkedin.com/in/gorredinesh21",
  resumeUrl: "/Gorre_Dinesh_Chandan_Reddy_Resume.pdf",
  taglines: [
    "Ship it till it's real.",
    "A demo is not a product.",
    "Every claim carries its evidence.",
  ],
  intro:
    "I build AI systems end-to-end and put them in front of real users. By day I move data into Gold KPI tables and RAG platforms at Reliance; the rest of the time I run a live home-food marketplace and a growing constellation of deployed side projects — agents, retrieval engines and systems written from scratch.",
};

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#workbench", label: "Workbench" },
  { href: "#mini", label: "Mini Projects" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
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
      loop?: string; // repeat-back edge label
      note?: string; // amber annotation strip
    }
  | {
      kind: "split";
      head: DiagNode;
      channels: { label: string; nodes: DiagNode[] }[];
      tail: DiagNode;
      note?: string;
    };

// ── Featured case studies ────────────────────────────────────────────────────

export type Featured = {
  slug: string;
  eyebrow: string; // "Personal startup / GenAI + full-stack"
  headline: [string, string]; // two-line poetic headline
  story: string; // narrative paragraph
  question: string; // the thought-line: has anyone done this before?
  reply: string; // why I did it the way I did
  fromTo: {
    fromLabel: string;
    fromValue: string;
    toLabel: string;
    toValue: string;
    caption: string; // honest caption under the orbit visual
    ratio: number; // dot-size ratio for the orbit visual (>1)
  };
  stack: string[];
  liveUrl: string;
  liveLabel: string;
  github: string;
  diagram: Diagram;
  diagramCaption: string;
};

export const featured: Featured[] = [
  {
    slug: "homaatri",
    eyebrow: "Personal startup · homatri.com",
    headline: ["Restaurants can't cook", "your mother's food."],
    story:
      "Homaatri is a hyper-local marketplace for home food — real kitchens, real riders, real payments. I built the whole production system myself: a Next.js storefront, a FastAPI backend on Cloud Run, PostgreSQL, three Android apps, and an AI agent on WhatsApp Business that takes a customer from \"what's near me?\" to a paid order in one conversation. It runs with real users and real orders every day.",
    question: "Has anyone actually brought regional home food online?",
    reply:
      "Aggregators list restaurants. A home kitchen needs storefront, payments, delivery coordination and trust — so I built all of it, shipped it, and kept it running. Building the startup taught me more about systems than any course could.",
    fromTo: {
      fromLabel: "Day 0",
      fromValue: "an idea on WhatsApp",
      toLabel: "Today",
      toValue: "40–50 orders/day, live",
      caption:
        "One FastAPI backend, four production codebases, agentic payments — run by a team of one engineer.",
      ratio: 6,
    },
    stack: [
      "Next.js 14",
      "FastAPI",
      "PostgreSQL",
      "React Native (Expo)",
      "WhatsApp Business API",
      "Razorpay",
      "GCP Cloud Run",
    ],
    liveUrl: "https://homatri.com",
    liveLabel: "homatri.com — live with real users",
    github: "https://github.com/gorredinesh21/homatri",
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
    slug: "orderpilot",
    eyebrow: "Agentic AI in pure Go",
    headline: ["An agent that survives", "its own model dying."],
    story:
      "OrderPilot is an AI food-ordering agent with no agent framework — the tool-calling loop, the strict-JSON turn protocol, the repair retries and the fallback planner are all hand-written Go. Talk to it in plain language, watch it call nine typed tools in parallel, and notice that your budget is enforced inside the cart layer, so the model physically cannot overspend. When the LLM breaks protocol or the API is down, a deterministic planner takes over and ordering keeps working.",
    question: "Did anyone build the agent loop without a framework?",
    reply:
      "Demos hide inside LangChain — the interesting engineering stays invisible. I wrote the loop the way a backend engineer would: typed tools, a wire protocol, guardrails enforced in code instead of prompts, and a fallback so the product never dies with the LLM.",
    fromTo: {
      fromLabel: "LLM-only agent",
      fromValue: "dies with the API",
      toLabel: "With fallback planner",
      toValue: "0 LLM calls, still ordering",
      caption:
        "Budget guardrail lives in the cart layer — overspending is impossible by construction, not by prompt.",
      ratio: 4,
    },
    stack: [
      "Golang",
      "Tool calling",
      "errgroup",
      "SSE streaming",
      "Per-order goroutines",
      "Llama 3.1 (HF)",
      "Cloud Run",
    ],
    liveUrl: "https://orderpilot-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — order on a simulated Bangalore map",
    github: "https://github.com/gorredinesh21/orderpilot",
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
  {
    slug: "menumind",
    eyebrow: "Hybrid retrieval, written from scratch",
    headline: ["\"Something warm\"", "should find brownies."],
    story:
      "MenuMind is a menu-discovery engine over 797 dishes from 36 Bangalore restaurants. BM25 is implemented by hand in Go, fused with cosine similarity over bge-small embeddings using Reciprocal Rank Fusion — and every result shows what each channel contributed. Ask follow-ups and the RAG layer answers only from retrieved dishes, citing them ([D3] brownie) so a hallucinated dish is contractually excluded.",
    question: "Why hand-write BM25 and RRF instead of using a search library?",
    reply:
      "Retrieval you can't explain is a black box with good marketing. Writing the math myself means every ranking decision is visible — you see exactly what lexical and semantic search each contributed, chip by chip, on every result.",
    fromTo: {
      fromLabel: "Keyword search",
      fromValue: "0 results for \"warm comforting dessert\"",
      toLabel: "Hybrid + RRF",
      toValue: "top hit, cosine 0.62, ranks shown",
      caption:
        "797 dish embeddings baked into a single distroless binary via embed.FS — no vector database, cold start still serves lexical search.",
      ratio: 5,
    },
    stack: [
      "Golang",
      "BM25 (k1=1.5, b=0.75)",
      "bge-small-en-v1.5",
      "Reciprocal Rank Fusion",
      "Grounded RAG",
      "embed.FS",
      "Cloud Run",
    ],
    liveUrl: "https://menumind-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — search + cited RAG chat",
    github: "https://github.com/gorredinesh21/menumind",
    diagram: {
      kind: "split",
      head: {
        label: "\"warm comforting dessert\"",
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
    eyebrow: "Job intelligence, evidence-first",
    headline: ["A match score you", "can actually audit."],
    story:
      "Career-Ops ingests real job postings from daily pipelines, deduplicates them into one canonical listing per opening, and matches them against a skill graph parsed from your resume and GitHub — where every skill claim carries the exact resume line or repo that proves it. Gaps are typed (presentation vs evidence vs capability), market commonality is computed from the live corpus, and a deterministic agent answers questions like \"what are my gaps for GenAI?\" with numbers instead of vibes.",
    question: "Why not just let an LLM rate my fit for each job?",
    reply:
      "A 78% you can't inspect is a number you can't trust. I wanted matching as decision support: what matched, what's missing, how much it matters, what to do next — each answer computed from evidence, with the provenance attached.",
    fromTo: {
      fromLabel: "Job portals",
      fromValue: "a black-box % score",
      toLabel: "Career-Ops",
      toValue: "every skill backed by a line of evidence",
      caption:
        "1,606 postings ingested from real pipelines; fit bands from required-skill coverage; corrections re-enter matching.",
      ratio: 3,
    },
    stack: [
      "FastAPI",
      "SQLite",
      "Deterministic NLP",
      "Skill ontology",
      "GitHub API",
      "Provenance snapshots",
      "Cloud Run",
    ],
    liveUrl: "https://career-ops-yzzxrxetcq-uc.a.run.app",
    liveLabel: "Try it live — jobs, evidence, gaps",
    github: "https://github.com/gorredinesh21/career-ops",
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
        "Ask “what are my gaps for GenAI?” → answered from the live corpus (“Vector DBs: 38% of postings”), never from vibes.",
    },
    diagramCaption: "Evidence in, decisions out — with the trail visible at every step.",
  },
];

// ── Workbench: live projects with real UIs, filterable grid ──────────────────

export type WorkbenchCategory = "GenAI" | "ML / Data" | "Full-Stack";

export const workbenchCategories: WorkbenchCategory[] = [
  "GenAI",
  "ML / Data",
  "Full-Stack",
];

export type WorkbenchItem = {
  slug: string;
  eyebrow: string; // uppercase, arrow glyph
  title: string;
  blurb: string;
  category: WorkbenchCategory;
  stack: string[]; // dot-separated line
  liveUrl: string;
  github?: string; // source link (repo or notebook); some projects have none
  diagram: Diagram;
};

export const workbench: WorkbenchItem[] = [
  {
    slug: "voicebank",
    eyebrow: "VOICE → TYPED ACTIONS",
    title: "VoiceBank",
    blurb:
      "Say “send 500 rupees to Mom” and watch a real banking UI get operated end-to-end — speech recognition → Gemini function-calling → the same React state machine a finger-tap uses, with spoken confirmations and a PIN gate before money moves.",
    category: "GenAI",
    stack: ["React", "Web Speech API", "Gemini", "FastAPI", "Cloud Run"],
    liveUrl: "https://voicebank-441384612427.us-central1.run.app",
    github: "https://github.com/gorredinesh21/voicebank",
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
  },
  {
    slug: "ragmill",
    eyebrow: "5K CORPUS → 1M-DOC DESIGN",
    title: "RAGMill",
    blurb:
      "RAG designed to survive a million documents: sharded Cloud Run ingest with idempotent upserts, hybrid dense+BM25 retrieval fused by RRF, Gemini answers with [n] citations, and a golden-set eval harness that gates every retrieval change.",
    category: "GenAI",
    stack: ["FastAPI", "Vertex AI", "Qdrant", "fastembed", "Cloud Run Jobs"],
    liveUrl: "https://ragmill-yzzxrxetcq-uc.a.run.app",
    github: "https://github.com/gorredinesh21/ragmill",
    diagram: {
      kind: "split",
      head: { label: "1M documents", sub: "sharded ingest · idempotent upserts" },
      channels: [
        { label: "dense", nodes: [{ label: "bge vectors", sub: "fastembed ONNX" }] },
        { label: "sparse", nodes: [{ label: "BM25", sub: "in-process index" }] },
      ],
      tail: { label: "RRF → rerank → cited answer", sub: "hit@10: 0.72 vs 0.67 dense-only", tone: "hot" },
    },
  },
  {
    slug: "quackquery",
    eyebrow: "ENGLISH → AUDITED SQL",
    title: "QuackQuery",
    blurb:
      "Upload a CSV, ask in plain English: the generated SQL always sits next to the answer, dangerous SQL is structurally impossible, and a bad first draft feeds its own error back and self-repairs up to three times before giving up honestly.",
    category: "GenAI",
    stack: ["FastAPI", "Gemini", "DuckDB", "SSE", "SQLite cache"],
    liveUrl: "https://quackquery-yzzxrxetcq-uc.a.run.app",
    github: "https://github.com/gorredinesh21/quackquery",
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
  },
  {
    slug: "diffwarden",
    eyebrow: "DIFFS → JUDGMENT",
    title: "DiffWarden",
    blurb:
      "A PR review bot that layers cheap deterministic gates (secrets, ruff, bandit) before any LLM call — the model only reviews what survives, inside a hard character budget, with SQLite caching so unchanged diffs never re-bill.",
    category: "GenAI",
    stack: ["FastAPI", "Gemini", "ruff", "bandit", "SQLite"],
    liveUrl: "https://diffwarden-yzzxrxetcq-uc.a.run.app",
    github: "https://github.com/gorredinesh21/diffwarden",
    diagram: {
      kind: "flow",
      nodes: [
        { label: "PR diff" },
        { label: "Gates", sub: "secrets · ruff · bandit — free & instant", tone: "hot" },
        { label: "Budget-capped Gemini", sub: "hard character limit" },
        { label: "Findings", sub: "cached by diff hash" },
      ],
    },
  },
  {
    slug: "support-copilot",
    eyebrow: "DOCS → CITED ANSWERS",
    title: "Support Copilot",
    blurb:
      "A support assistant that answers only from a 30-document corpus, cites every source, and regenerates answers that forget their [n] markers — with App-Insights telemetry and a KQL dashboard for success rate, p95 latency and no-answer rate.",
    category: "GenAI",
    stack: ["React", "FastAPI", "Gemini", "RAG", "KQL"],
    liveUrl: "https://support-copilot-441384612427.us-central1.run.app",
    github: "https://github.com/gorredinesh21/support-copilot",
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
  },
  {
    slug: "startup-intel",
    eyebrow: "SIGNALS → ECOSYSTEM GRAPH",
    title: "Startup Intelligence Platform",
    blurb:
      "GraphRAG + RAPTOR market intelligence: entities and relationships (COMPETES_WITH, FUNDED_BY, PARTNERED_WITH) land in a graph while summaries tree into Qdrant; a LangGraph agent answers multi-hop questions with citations over an interactive React Flow map of 175 incubator-backed startups.",
    category: "GenAI",
    stack: [
      "LangGraph",
      "Qdrant",
      "Neo4j / NetworkX",
      "BGE embeddings",
      "React Flow",
    ],
    liveUrl: "https://startup-intel-441384612427.us-central1.run.app",
    github: "https://github.com/gorredinesh21/Startup-Intelligence-Platform",
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
  },
  {
    slug: "vectorshift",
    eyebrow: "NODES → PIPELINES",
    title: "VectorShift Pipeline Builder",
    blurb:
      "A no-code AI pipeline canvas built around one reusable node abstraction: every node type is a config object — handles, fields, icon — rendered by a single BaseNode. Adding a node is data, not copy-paste, and the FastAPI backend reasons about the resulting DAG.",
    category: "Full-Stack",
    stack: ["React Flow", "Zustand", "FastAPI"],
    liveUrl: "https://vector-shift-yzzxrxetcq-uc.a.run.app",
    github: "https://github.com/gorredinesh21/vector_shift",
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Node config", sub: "pure data", tone: "hot" },
        { label: "One BaseNode", sub: "renders any node" },
        { label: "Canvas + wires", sub: "React Flow · Zustand" },
        { label: "DAG analysis", sub: "cycles · reachability" },
      ],
    },
  },
  {
    slug: "wingman-ai",
    eyebrow: "PROFILE → BETTER PROFILE",
    title: "Wingman AI",
    blurb:
      "A human-in-the-loop dating-profile coach: scores and rewrites bios from your real details, plans photos with a vision model, and publishes only what you approve — backed by a swappable LLM brain (local Ollama, Gemini or Hugging Face) tuned for the Indian market.",
    category: "GenAI",
    stack: ["LangChain", "Gemini", "Ollama", "FastAPI", "Vision"],
    liveUrl: "https://tinder-ai-coach-441384612427.us-central1.run.app",
    github: "https://github.com/gorredinesh21/TINDER_MCP_AI",
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
  },
  {
    slug: "career-ops-3",
    eyebrow: "POSTINGS → TAILORED PDFS",
    title: "Career-Ops 3.0",
    blurb:
      "The code-owned evolution of my job pipeline: fetches postings from Greenhouse, Ashby, Lever and LinkedIn at zero LLM cost, scores every job /5 with Zod-validated LangChain.js chains, and renders ATS-ready JD-specific resumes from an LLM-distilled catalog of 23 repos.",
    category: "GenAI",
    stack: ["Node.js", "LangChain.js", "Zod", "LaTeX"],
    liveUrl: "https://career-ops-dashboard-441384612427.us-central1.run.app",
    github: "https://github.com/gorredinesh21/career-ops-3.0",
    diagram: {
      kind: "flow",
      nodes: [
        { label: "Greenhouse · Lever · Ashby", sub: "$0 LLM cost" },
        { label: "Fit score /5", sub: "Zod-validated chains", tone: "hot" },
        { label: "Tailored resume", sub: "distilled from 23 repos" },
        { label: "ATS-ready PDF" },
      ],
    },
  },
  {
    slug: "movie-recommender",
    eyebrow: "ONE MOVIE → TEN SIMILAR",
    title: "Movie Recommendation System",
    blurb:
      "A cold-start, content-based recommender over 5,000 movies: genre, cast, crew and overview text vectorised bag-of-words, pairwise cosine similarity precomputed and pickled for instant lookup, posters via TMDb in a Streamlit UI.",
    category: "ML / Data",
    stack: ["Python", "scikit-learn", "Cosine similarity", "Streamlit", "TMDb API"],
    liveUrl: "https://movie-recommender-441384612427.us-central1.run.app",
    github: "https://github.com/gorredinesh21/MOVIE_RECOMENDATION_SYSTEM",
    diagram: {
      kind: "flow",
      nodes: [
        { label: "A movie" },
        { label: "BoW vector", sub: "genre · cast · crew · overview" },
        { label: "Cosine vs 5,000", sub: "precomputed matrix" },
        { label: "Top-10 + posters", tone: "hot" },
      ],
    },
  },
  {
    slug: "sahayak",
    eyebrow: "WRONG UPI TRANSFER → GUIDED RECOVERY",
    title: "Sahayak",
    blurb:
      "A voice-first UPI support agent inside a simulated payments app: it diagnoses wrong-recipient transfers with a 7-signal evidence engine, runs RBI-style SLA clocks that auto-file disputes when banks breach them, explains failures by NPCI stage — and keeps the same grounded voice even when Gemini is down.",
    category: "GenAI",
    stack: ["FastAPI", "Gemini", "SQLite", "Web Speech API", "Cloud Run"],
    liveUrl: "https://sahayak-yzzxrxetcq-uc.a.run.app",
    github: "https://github.com/gorredinesh21/sahayak",
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
  },
  {
    slug: "jev-laya-benchmark",
    eyebrow: "MODEL CLAIMS → MEASURED",
    title: "Jev vs Laya — SLM Benchmark",
    blurb:
      "A measured head-to-head between Laya (Sarvam's 1.2B model) and a 1.5B open LLM on the same free GPU: toxicity moderation, Banking77 intent, AG News — constrained label scoring (0% invalid outputs by construction), honest latency columns, and a results site anyone can check. The full harness is a public Kaggle notebook.",
    category: "ML / Data",
    stack: ["PyTorch", "Transformers", "Kaggle T4", "Constrained decoding"],
    liveUrl: "https://jev-laya-benchmark-yzzxrxetcq-el.a.run.app",
    github: "https://www.kaggle.com/code/gorredineshchandan/jev-laya-slm-benchmark",
    diagram: {
      kind: "split",
      head: { label: "Same prompts, same free T4", sub: "toxicity · Banking77 · AG News" },
      channels: [
        { label: "Laya 1.2B", nodes: [{ label: "Sarvam", sub: "fine-tuned candidate" }] },
        { label: "open 1.5B", nodes: [{ label: "baseline", sub: "same harness" }] },
      ],
      tail: { label: "Logprob-scored accuracy + latency", sub: "invalid answers impossible by construction", tone: "hot" },
    },
  },
  {
    slug: "impostor-party",
    eyebrow: "TWELVE PLAYERS → ONE LIAR",
    title: "Impostor Party",
    blurb:
      "A real-time multiplayer party game — everyone gets the same word except the impostor. Pure Node + WebSockets: rooms with a phase state machine (lobby → reveal → discuss → vote), up to 12 players, host-controlled impostor count, single-instance in-memory state on Cloud Run. No frameworks, no database.",
    category: "Full-Stack",
    stack: ["Node.js", "ws (WebSockets)", "Vanilla JS", "Cloud Run"],
    liveUrl: "https://impostor-party-yzzxrxetcq-uc.a.run.app",
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
  },
];

// ── Mini projects: no live link, or live-but-plain UIs ───────────────────────
// Each carries a short explanation and a diagram of how it works.

export type MiniProject = {
  slug: string;
  name: string;
  blurb: string;
  stack: string[];
  github: string;
  liveUrl?: string;
  explanation: string[]; // 2–4 sentences, why + how
  diagram: Diagram;
};

export const miniProjects: MiniProject[] = [
  {
    slug: "voltkv",
    name: "voltkv",
    blurb: "Redis-compatible in-memory KV store written from scratch in Go",
    stack: ["Go", "RESP2", "TCP", "Sharding", "AOF"],
    github: "https://github.com/gorredinesh21/voltkv",
    liveUrl: "https://voltkv-demo-441384612427.us-central1.run.app",
    explanation: [
      "I wanted to understand what Redis actually is under the hood — protocol parsing, safe concurrency, expiry, durability — by building one instead of reading about one.",
      "It speaks the real RESP2 wire protocol, so redis-cli and redis-benchmark connect without knowing the difference. 16 keyspace shards with per-shard locks keep it correct under thousands of connections; a background sweeper handles TTL and an optional AOF survives restarts.",
      "It lives here rather than up top because the web demo is a plain command page — the product is the protocol, not the pixels.",
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
  },
  {
    slug: "llmgateway",
    name: "LLM Gateway",
    blurb: "Concurrent LLM / embedding gateway in Go — 32× faster batch embedding",
    stack: ["Go", "Worker pools", "Token-bucket", "context", "Benchmarks"],
    github: "https://github.com/gorredinesh21/llmgateway",
    liveUrl: "https://llmgateway-441384612427.us-central1.run.app",
    explanation: [
      "Calling LLM and embedding providers at scale is easy to get wrong: unbounded goroutines trip rate limits, and a cancelled request should cancel the whole batch. This was my way of learning to do the concurrency, backpressure and cancellation properly — with Go benchmarks to check myself.",
      "A bounded worker pool keeps many provider calls in flight (1 → 32 workers ≈ 32× speedup, verified), a token-bucket limiter respects provider RPS, and context threads through every call. Embedding 2,000 chunks drops from 10.7s serial to 0.33s pooled.",
      "The live page is a plain API reference — so it's filed as a mini project while the benchmarks do the talking.",
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
  },
  {
    slug: "job-application-organizer",
    name: "Job Application Organizer",
    blurb: "End-to-end pipeline that turns raw job leads into tailored, scored, PDF'd applications",
    stack: ["Python", "LangChain", "SQLite", "LaTeX", "Flask"],
    github: "https://github.com/gorredinesh21/JOB_APPLICATION_HANDLER",
    explanation: [
      "Job hunting is a pipeline problem: leads arrive from Telegram posts and Gmail alerts as messy JSON, and the repetitive work — enriching descriptions, scoring fit, tracking status — shouldn't be manual.",
      "Each posting gets its apply_url scraped and cleaned by an LLM, scored 1–100 against my resume, stored in SQLite as the single source of truth, and strong matches get a tailored resume rendered through LaTeX to PDF — all browsable in a Flask dashboard where every score, source and apply link stays visible.",
      "It later evolved into Career-Ops 3.0, but this was the organizer that started the lineage.",
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
  },
  {
    slug: "crickkart",
    name: "CrickKart",
    blurb: "Full MERN cricket-equipment store with Stripe checkout and an admin panel",
    stack: ["React", "Redux", "Node.js", "MongoDB", "Stripe", "Cloudinary"],
    github: "https://github.com/gorredinesh21/CricKart",
    explanation: [
      "I wanted a real, production-shaped web app end-to-end — not a toy CRUD demo: auth, payments, image hosting, transactional email, an admin control plane and a deployable build.",
      "An 18+ endpoint Express/Mongo API backs a Redux storefront with search, filters and reviews; Stripe PaymentIntents handle money; JWT rides HTTP-only cookies with role-based access to the admin dashboard, which manages products, orders, users and revenue analytics.",
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
  },
  {
    slug: "finnest",
    name: "FinNest",
    blurb: "Full-stack online banking — Spring Boot REST API + React/Redux SPA",
    stack: ["Java", "Spring Boot 2.7", "JPA / Hibernate", "MySQL", "React", "Redux"],
    github: "https://github.com/gorredinesh21/FinNest",
    explanation: [
      "My bridge into the strongly-typed, enterprise-style JVM world: a layered Spring Boot backend modelling users, accounts, transactions and payments, paired with a React + Redux dashboard.",
      "The transaction engine does deposits, inter-account transfers, withdrawals and bill payments with balance validation on every path — and every attempt, failed or not, lands in the audit log.",
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
  },
  {
    slug: "ethereum-payments-dapp",
    name: "Ethereum Payments DApp",
    blurb: "Multi-chain ETH & ERC-20 transfer DApp with MetaMask",
    stack: ["React", "ethers.js", "Solidity", "Sepolia", "Polygon"],
    github: "https://github.com/gorredinesh21/BLOCKCHAIN",
    explanation: [
      "Hands-on Web3: wallet auth, multi-chain detection, ERC-20 UX and on-chain value movement — shipping something that actually moved real testnet funds end-to-end.",
      "A custom PayPal-like Solidity contract stores payment history on-chain; the React client auto-detects network switches and re-fetches balances, and pasting any token contract address makes it transactable.",
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
  },
  {
    slug: "gan-augmentation",
    name: "GAN-Based Data Augmentation",
    blurb: "B.Tech thesis: tabular GAN + SMOTE against severe class imbalance",
    stack: ["Python", "PyTorch", "GANs", "SMOTE", "XGBoost", "McNemar's test"],
    github: "https://github.com/gorredinesh21/FINAL_YEAR_PROJECT",
    explanation: [
      "Fraud and rare-event tabular datasets are pathologically imbalanced, and naïve oversampling distorts decision boundaries. My thesis asked how far a custom tabular GAN could push recall without sacrificing precision — and whether the lift was statistically real.",
      "GAN-synthesised positives combined with SMOTE feed four classifier families (RF, XGBoost, LightGBM, GBM) under 5-fold CV; McNemar's test compares them head-to-head. On a 10M+ row credit-card dataset: false negatives down to 9, recall 0.91 → 0.99.",
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
  },
  {
    slug: "mars-landmark-detection",
    name: "Mars Landmark Detection",
    blurb: "VGG16 transfer learning for 8-class Martian terrain classification",
    stack: ["Python", "TensorFlow", "Keras", "VGG16", "Transfer learning"],
    github: "https://github.com/gorredinesh21/MARS_LANDMARK_DETECTION",
    explanation: [
      "Rovers and orbiters generate huge image streams, but identifying craters, valleys and plateaus still leans on manual inspection. I tested how far a frozen ImageNet backbone could automate that on a real planetary-science dataset.",
      "VGG16's convolutional base stays frozen over 8,200 training images; a small dense head learns the 8 landmark classes — reaching 88% training accuracy, with weights exported so inference rehydrates in a few lines.",
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
  },
  {
    slug: "ocr-entity-extraction",
    name: "Image-Based Entity Extraction",
    blurb: "OCR pipeline for product attribute extraction at scale — Amazon ML Challenge",
    stack: ["Python", "PyTesseract", "OCR", "Regex", "Pandas"],
    github: "https://github.com/gorredinesh21/ImageEntityExtraction",
    explanation: [
      "Product catalogues often hide critical attributes — weight, voltage, dimensions — inside images. The Amazon ML Challenge handed us 260K training images of wildly variable quality and no GPU budget.",
      "I ran PyTesseract on raw images (no preprocessing, to stay inside CPU limits) and built regex post-processors per entity type with unit-normalisation maps. 130K+ images processed, top 200 of 18,500+ teams.",
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
  },
  {
    slug: "facial-attendance",
    name: "Facial Recognition Attendance",
    blurb: "Hackfest'23 — face-recognition attendance + student/teacher portal",
    stack: ["Python", "Flask", "OpenCV", "face_recognition", "Excel/CSV"],
    github: "https://github.com/gorredinesh21/The-Bit-Lords---IIT-ISM-Dhanbhad",
    explanation: [
      "Roll calls eat class time and the records are hard to audit. For Hackfest'23 our team shipped the full loop: enrol faces once, then a live camera marks attendance and writes the roster.",
      "Encoded faces are compared per frame with distance-based best-match; recognised students are removed from the pending list and logged with a timestamp to CSV — a teacher dashboard handles resources and announcements.",
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
  },
  {
    slug: "tcp-proxy-server",
    name: "Multi-Threaded TCP Client–Proxy Server",
    blurb: "C++ networking course project — sockets, threads, file persistence",
    stack: ["C++", "TCP sockets", "POSIX threads", "File I/O"],
    github: "https://github.com/gorredinesh21/OS-PROJECRT",
    explanation: [
      "The OS course wanted systems-level work that demonstrated socket programming and protocol design — not a library being run.",
      "The server binds, listens and accepts; each connection hands a URL from the client, persists it to GET.txt, acknowledges, and the accept loop keeps listening. Raw sockets in C++, no wrappers.",
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
  },
  {
    slug: "snake-game",
    name: "Snake + Flappy Bird",
    blurb: "First-year C++ console games — now playable in the browser",
    stack: ["C++", "Win32 console", "HTML5 Canvas"],
    github: "https://github.com/gorredinesh21/snake-game-",
    liveUrl: "https://cpp-games-441384612427.us-central1.run.app/snake.html",
    explanation: [
      "Early in college I wanted C++ beyond textbook exercises, so I reproduced real games inside the Windows terminal — loops, non-blocking input, screen refresh and state, with no graphics library.",
      "Snake runs a grid loop with kbhit steering; Flappy adds gravity, rolling pipes and collision on the same console primitives. Both later got HTML5 canvas ports so they're playable in a browser.",
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
  },
];

// ── Approach ─────────────────────────────────────────────────────────────────

export const approach = [
  {
    step: "01",
    title: "Build it like a product",
    body: "Every project gets a landing surface, a working example and visible errors. If it can't survive a stranger clicking it, it isn't finished — a demo is not a product.",
    pairs: [
      ["A vague idea", "smallest real version"],
      ["A clever model", "a page you can use"],
    ],
  },
  {
    step: "02",
    title: "Prove it with numbers",
    body: "Tests, benchmarks and golden sets gate every change. Hit-rate, latency, throughput — claims carry receipts, and retrieval invariants are asserted in CI, not asserted in a README.",
    pairs: [
      ["A claim", "a measurement"],
      ["“it feels better”", "hit@10: 0.72 vs 0.67"],
    ],
  },
  {
    step: "03",
    title: "Ship it and keep it running",
    body: "Deployed on GCP, watched, and fixed when it breaks — 40–50 orders a day doesn't tolerate downtime. Fallback planners and cold-start paths are designed before launch day, not after.",
    pairs: [
      ["Works on my machine", "works at 2 am"],
      ["The LLM dies", "the product doesn't"],
    ],
  },
];

// ── About / Experience / Awards / OSS ────────────────────────────────────────

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
      "I learn on demand: when a project needs a skill I don't have yet, I go and get it. Java + Spring Boot, Stripe payments, smart contracts, vector databases — each one started as “I need this for what I'm building.”",
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

// ── Skills (compact, for the About area) ─────────────────────────────────────

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
