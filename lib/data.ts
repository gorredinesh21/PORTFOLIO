// ─────────────────────────────────────────────────────────────────────────────
// Content model for the single-page portfolio.
// Sections: hero → work (featured case studies) → workbench → mini projects
//           → approach → about → experience → awards → open source → contact
// Every project carries real code excerpts from its repository — the
// explanations are written next to the code that proves them.
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

// A real code excerpt from the project's repository.
export type CodeSample = {
  file: string; // repo-relative path in the real project
  lang: "go" | "python" | "ts" | "js" | "jsx" | "java" | "cpp" | "html" | "ipynb";
  note?: string; // one line on what to look at
  code: string;
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
  code: CodeSample[];
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
    code: [
      {
        file: "backend/app/agents/agents.py",
        lang: "python",
        note: "The single customer agent that owns the whole WhatsApp conversation — ordering, payment, tracking, cancellation.",
        code: `# The one agent's complete toolset — it owns the whole customer conversation.
CUSTOMER_TOOLS: tuple[BaseTool, ...] = (
    get_customer_profile,
    find_nearby_kitchens,
    register_customer,
    view_chef_menu,
    create_order,
    add_item_to_order,
    add_special_instructions,
    view_cart,
    request_payment,      # mints the Razorpay link deterministically
    check_my_payment,
    get_order_status,
    cancel_order,
    submit_order_review,
    escalate_to_admin,
)

customer_agent = Agent("CUSTOMER", CUSTOMER_AGENT_PROMPT, CUSTOMER_TOOLS)`,
      },
      {
        file: "backend/app/agents/agents.py",
        lang: "python",
        note: "Payments are minted by code, not by the model — the agent asks, the tool executes, the webhook confirms.",
        code: `async def ainvoke(self, messages: list[BaseMessage]):
    """Invoke the agent's LLM (persona prepended, its tools bound)."""
    llm = shared_llm()
    if self.tools:
        llm = llm.bind_tools(list(self.tools))
    return await llm.ainvoke(
        [SystemMessage(content=self.system_prompt), *messages]
    )`,
      },
    ],
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
    code: [
      {
        file: "internal/agent/agent.go",
        lang: "go",
        note: "The hand-written loop: strict JSON turns, one corrective retry, then graceful degradation to the deterministic planner.",
        code: `mode := "llm"
for step := 0; step < a.MaxSteps; step++ {
    raw, err := a.LLM.Chat(ctx, a.systemPrompt(s), toAgentMsgs(s))
    if err != nil {
        // LLM unavailable / misbehaving: degrade to the deterministic
        // planner so the product keeps working.
        mode = "fallback"
        emit(Event{Type: EvMode, Mode: mode,
            Text: "LLM unavailable — switching to deterministic planner"})
        RunFallback(s, userMsg, emit)
        emit(Event{Type: EvDone, Mode: mode})
        return
    }
    turn, ok := parseTurn(raw)
    if !ok {
        if step == 0 {
            // one corrective retry before giving up on the model
            s.appendRetryHint()
            continue
        }
        mode = "fallback"
        RunFallback(s, userMsg, emit)
        return
    }
    results := a.execTools(ctx, s, turn.Tools, emit)`,
      },
      {
        file: "internal/cart/cart.go",
        lang: "go",
        note: "The budget is a hard guardrail inside the cart — the LLM cannot talk its way past this function.",
        code: `// Add inserts or increments an item, enforcing the budget guardrail.
func (c *Cart) Add(it data.MenuItem, qty int) error {
    cur := c.Total()
    if cur+it.Price*qty > c.Budget {
        return fmt.Errorf(
            "%w: adding %d x %s would make the cart ₹%d, budget is ₹%d — "+
                "remove something or raise the budget with set_budget",
            ErrOverBudget, qty, it.Name, cur+it.Price*qty, c.Budget)
    }
    // ... add the line
    return nil
}`,
      },
    ],
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
    code: [
      {
        file: "internal/search/search.go",
        lang: "go",
        note: "The whole hybrid stack in one function: two ranked channels, fused by RRF, per-channel ranks kept for transparency.",
        code: `// Query runs hybrid retrieval: BM25 list + vector list fused by RRF.
// queryVec may be nil (lexical-only mode, e.g. embeddings unavailable).
func (idx *Index) Query(query string, queryVec []float32, f Filters, topK int) []Hit {
    const rrfK = 60.0
    const channelTop = 50

    bmRanked := idx.rankBM25(query, channelTop)   // item pos → rank
    vecRanked := idx.rankVectors(queryVec, channelTop)

    // --- fuse + filter ---
    fuse := map[int]float64{}
    for pos, r := range bmRanked {
        fuse[pos] += 1 / (rrfK + float64(r))
    }
    for pos, r := range vecRanked {
        fuse[pos] += 1 / (rrfK + float64(r))
    }
    var hits []Hit
    for pos, s := range fuse {
        it := idx.items[pos]
        if !passes(it, f) {
            continue
        }
        hits = append(hits, Hit{
            Item: it, RRF: s,
            BM25Rank: bmRanked[pos], VecRank: vecRanked[pos],
        })
    }
    sort.Slice(hits, func(a, b int) bool { return hits[a].RRF > hits[b].RRF })
    return hits
}`,
      },
    ],
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
    code: [
      {
        file: "app/fit.py",
        lang: "python",
        note: "The evidence-based evaluator: each required skill resolves to match / indirect / weak / missing — with its proof attached.",
        code: `def evaluate(conn, job, profile_skills_rows, reviews=None, user_band=None,
             user_prefs=None) -> dict:
    """Full evidence-based fit evaluation for one job vs one profile."""
    job_skills = conn.execute(
        "SELECT skill, requirement FROM job_skill WHERE job_id = ? "
        "ORDER BY requirement, skill", (job["id"],)).fetchall()
    best, listed, strong, rejected, confirmed = _profile_index(
        profile_skills_rows, reviews)

    rows = []
    for r in job_skills:
        skill, req = r["skill"], r["requirement"]
        entry = {"skill": skill, "requirement": req, "status": "missing",
                 "depth": "", "evidence": "", "market": ...}
        hit = best.get(skill)
        if hit is not None and skill not in rejected:
            entry.update(status="match" if skill in strong else "weak",
                         depth=hit["depth"],
                         evidence=(hit["evidence"] or "")[:200])
        else:
            child = indirect_evidence_for(skill, set(best) - rejected)
            if child:
                entry.update(status="indirect", depth=f"via {child}")
        rows.append(entry)

    required = [r for r in rows if r["requirement"] == "required"] or rows
    matched = sum(1 for r in required if r["status"] == "match")
    ratio = matched / len(required) if required else 0
    if ratio >= 0.75:   band = "Strong Evidence"
    elif ratio >= 0.5:  band = "Good Evidence"
    ...
    return {"band": band, "rows": rows}`,
      },
    ],
  },
];

// ── Workbench: live projects with real UIs, filterable grid ──────────────────

export type WorkbenchCategory = "GenAI" | "ML / Data" | "Full-Stack" | "Systems";

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
  code: CodeSample;
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
    code: {
      file: "server/app.py",
      lang: "python",
      note: "The server sanitises every model action down to a typed whitelist — the LLM can propose, but only valid NAVIGATE/FILL/TAP actions reach the UI.",
      code: `def _sanitize_actions(raw: list) -> list:
    out = []
    for a in raw or []:
        if not isinstance(a, dict):
            continue
        t = str(a.get("type", "")).upper()
        if t not in VALID_ACTIONS:
            continue
        act = {"type": t}
        if t == "NAVIGATE":
            screen = str(a.get("screen", "")).lower()
            if screen not in VALID_SCREENS:
                continue
            act["screen"] = screen
        elif t == "FILL":
            field, value = str(a.get("field", "")), a.get("value")
            if not field or value is None:
                continue
            act["field"], act["value"] = field, value
        elif t == "TAP":
            target = str(a.get("target", ""))
            if not target:
                continue
            act["target"] = target
        out.append(act)
        if len(out) >= 6:      # one intent per turn; cap runaway replies
            break
    return out`,
    },
  },
  {
    slug: "ragmill",
    eyebrow: "5K CORPUS → 1M-DOC DESIGN",
    title: "RAGMill",
    blurb:
      "RAG designed to survive a million documents: sharded Cloud Run ingest with idempotent uuid5 upserts, hybrid dense+BM25 retrieval fused by RRF, Gemini answers with [n] citations, and a golden-set eval harness that gates every retrieval change.",
    category: "GenAI",
    stack: ["FastAPI", "Vertex AI", "Qdrant", "fastembed", "Cloud Run Jobs"],
    liveUrl: "https://ragmill-yzzxrxetcq-uc.a.run.app",
    github: "https://github.com/gorredinesh21/ragmill",
    code: {
      file: "app/retrieval.py",
      lang: "python",
      note: "Reciprocal Rank Fusion as a pure function — unit-testable with known math (tests/test_rrf.py).",
      code: `def rrf_fuse(ranked_lists: list[list[str]], k: int = None,
               weights: list[float] = None) -> list[tuple[str, float]]:
    """Fuse ranked ID lists into [(id, rrf_score)] sorted desc."""
    k = config.RRF_K if k is None else k
    weights = weights or [1.0] * len(ranked_lists)
    scores: dict[str, float] = {}
    for lst, w in zip(ranked_lists, weights):
        for rank, item in enumerate(lst, start=1):
            scores[item] = scores.get(item, 0.0) + w / (k + rank)
    return sorted(scores.items(), key=lambda kv: (-kv[1], kv[0]))`,
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
    code: {
      file: "app/guard.py",
      lang: "python",
      note: "The guard runs before execution: comments and string literals are stripped so smuggled keywords can't dodge the scan.",
      code: `def _strip(sql: str) -> str:
    """Remove comments and literals so hides inside them can't dodge the scan."""
    sql = _COMMENT_RE.sub(" ", sql)
    sql = _LITERAL_RE.sub(" '' ", sql)
    return sql

def validate(sql: str) -> str:
    """Return the SQL if it is a single read-only SELECT; raise GuardError."""
    cleaned = sql.strip().rstrip(";")
    if ";" in cleaned:
        raise GuardError("multiple statements are not allowed (stacked query)")

    stripped = _strip(cleaned)
    head = stripped.lstrip("( \\n\\t").split(None, 1)
    if head[0].upper() not in _ALLOWED_STARTS:
        raise GuardError(f"only SELECT statements are allowed")

    tokens = set(re.findall(r"[A-Za-z_][A-Za-z0-9_]*", stripped.upper()))
    if hit := tokens & _DENIED_KEYWORDS:
        raise GuardError(f"forbidden keyword(s): {', '.join(sorted(hit))}")
    return cleaned`,
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
    code: {
      file: "app/reviewer.py",
      lang: "python",
      note: "Cost control as code: findings are packed into a fixed character budget before the model ever sees them.",
      code: `parts, budget = [], config.MAX_LLM_DIFF_CHARS
for score, f, hunk in gate.score_hunks(files)[:config.MAX_HUNKS_TO_LLM]:
    header = (f"\\n### {f.path} (hunk at line ~{hunk.new_start}, "
              f"risk score {score:.0f})\\n\u0060\u0060\u0060diff\\n")
    body_lines = [f"+{t}" for t in hunk.added_text[:80]]
    chunk = header + "\\n".join(body_lines) + "\\n\u0060\u0060\u0060"
    if len(chunk) > budget:
        break
    parts.append(chunk)
    budget -= len(chunk)
diff_payload = "\\n".join(parts)`,
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
    code: {
      file: "backend/app/llm.py",
      lang: "python",
      note: "Citation enforcement as a measurable retry — measured, not hoped for.",
      code: `answer, wait_ms = _call(base_prompt)
cited = bool(re.search(r"\\[\\d+\\]", answer))
if contexts and not cited and "could not find" not in answer.lower():
    retry_prompt = (base_prompt
                    + "\\n\\nREMINDER: your previous answer forgot the [n] "
                      "citation markers. Rewrite it, citing every claim with [n].")
    answer2, wait2 = _call(retry_prompt)
    if re.search(r"\\[\\d+\\]", answer2):
        answer, cited = answer2, True
    wait_ms += wait2
return {"answer": answer, "cited": cited, "wait_ms": wait_ms}`,
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
    code: {
      file: "backend/agents/workflow.py",
      lang: "python",
      note: "The reasoning agent as an explicit graph — every step is a node you can watch execute in the UI's stepper.",
      code: `def build_agent_graph():
    workflow = StateGraph(AgentState)
    workflow.add_node("intent_detection", detect_intent)
    workflow.add_node("planner", plan_subqueries)
    workflow.add_node("graph_retrieval", retrieve_graph)
    workflow.add_node("raptor_retrieval", retrieve_raptor)
    workflow.add_node("reranker", rerank_nodes)
    workflow.add_node("generator", generate_answer)
    # intent → plan → (graph ∥ raptor) → rerank → generate → END
    return workflow.compile()`,
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
    code: {
      file: "frontend/src/nodes/index.js",
      lang: "js",
      note: "The whole node catalog as data — this is why 5+ node types shipped without duplicating a component.",
      code: `// Every config becomes a component:
// (props) => <BaseNode {...props} config={cfg} />
const makeNode = (config) => (props) => <BaseNode {...props} config={config} />;

// definitions.js — adding a node here (and nothing else) makes it
// fully functional: toolbar, canvas, rendering, connections.
{
  type: 'customInput',
  title: 'Input',
  category: 'io',
  handles: [{ id: 'value', type: 'source', side: 'right' }],
  fields: [
    { name: 'inputName', label: 'Name', kind: 'text',
      default: (id) => id.replace('customInput-', 'input_') },
    { name: 'inputType', label: 'Type', kind: 'select',
      options: ['Text', 'File'], default: 'Text' },
  ],
}`,
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
    code: {
      file: "src/llm.py",
      lang: "python",
      note: "The provider-agnostic brain: one env flag switches between local Ollama, Hugging Face and Vertex — the rest of the app never knows.",
      code: `def make_llm() -> LLM:
    backend = os.getenv("LLM_BACKEND", "ollama").lower()

    if backend == "hf":
        from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
        endpoint = HuggingFaceEndpoint(
            repo_id=os.getenv("HF_MODEL", "Qwen/Qwen2.5-72B-Instruct"),
            task="conversational",
            temperature=temperature, max_new_tokens=max_tokens)
        return LLM(_impl=ChatHuggingFace(llm=endpoint), name=f"hf:{model}")

    if backend == "ollama":
        from langchain_ollama import ChatOllama
        impl = ChatOllama(model=os.getenv("OLLAMA_MODEL", "llama3.1"))
        return LLM(_impl=impl, name=f"ollama:{model}")`,
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
    code: {
      file: "lc/schemas.mjs",
      lang: "js",
      note: "Zod schemas that both validate model output and document the data contract — the LLM speaks JSON, the pipeline speaks types.",
      code: `/**
 * lc/schemas.mjs — zod schemas shared across the LangChain stages.
 * These both validate model output and document the data contract.
 */
export const ProjectSchema = z.object({
  title: z.string(),
  tech_stack: z.string().default(''),
  repo_link: z.string().optional().default(''),
  points: z.array(z.string()).default([]),
});

export const ResumeSchema = z.object({
  name: z.string(),
  education: z.array(EducationSchema).default([]),
  experience: z.array(ExperienceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  skills: z.array(SkillSchema).default([]),
});`,
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
    code: {
      file: "app.py",
      lang: "python",
      note: "The entire inference path — a precomputed similarity matrix and one sorted enumerate.",
      code: `def recommend(movie):
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(
        list(enumerate(similarity[index])),
        reverse=True, key=lambda x: x[1])
    for i in distances[1:11]:
        print(movies.iloc[i[0]].title)

similarity = pickle.load(open('similarity.pkl', 'rb'))`,
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
    code: {
      file: "backend/ai.py",
      lang: "python",
      note: "The system's voice when Gemini is unavailable — same facts, same numbers, no model required.",
      code: `def detect_intent(text):
    t = text.lower()
    for intent, pat in INTENT_RULES:
        if re.search(pat, t, re.I):
            return intent
    return "general"


# System's voice when Gemini is unavailable — same grounded facts.
def fallback_reply(txn_id, S, intent):
    p, sla, fr = S.payment(txn_id), S.sla(txn_id), S.fraud(txn_id)
    amt = f"₹{p['amount_paise']/100:,.0f}"
    rrn = S.db.execute(
        "SELECT rrn FROM npci_switch_log WHERE txn_id=?",
        (txn_id,)).fetchone()
    if intent == "wrong_recipient":
        analysis = ScenarioEngines(S.db).wrong_recipient(txn_id)
        verdict = analysis["verdict"].replace("_", " ").title()
        ev = "; ".join(e["label"] for e in analysis["evidence"][:3])
        return (f"Your payment of {amt} went through successfully. Based on "
                f"my analysis ({verdict}, confidence {analysis['confidence']}): "
                f"{ev}. Completed UPI transfers cannot be auto-reversed, but "
                f"you can: (1) contact the recipient directly, (2) file a "
                f"dispute, or (3) if within 24h, the beneficiary bank may "
                f"recall it. Reference RRN {rrn}.")`,
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
    code: {
      file: "benchmark.py",
      lang: "python",
      note: "Constrained scoring — every answer is a real logprob comparison between label continuations, so an invalid answer is impossible by construction.",
      code: `def score_labels(model, tok, prompt_text, cand_strings):
    """exact logprob of each candidate continuation; argmax.
    0% invalid by construction."""
    with torch.no_grad():
        enc = tok(prompt_text, return_tensors="pt").to(DEV)
        pout = model(**enc, use_cache=True)
        past, base_logits = pout.past_key_values, pout.logits[0, -1]
        scores = []
        for cs in cand_strings:
            ids = tok(cs, add_special_tokens=False,
                      return_tensors="pt").to(DEV)["input_ids"][0]
            lp = torch.log_softmax(base_logits.float(), -1)[ids[0]].item()
            # ... score the remaining candidate tokens via the KV cache
            scores.append(lp)
        return cand_strings[int(max(range(len(scores)),
                                    key=lambda i: scores[i]))]`,
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
    code: {
      file: "server.js",
      lang: "js",
      note: "The whole multiplayer server is one WebSocket connection handler and a room phase machine.",
      code: `const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  ws.isAlive = true
  ws.on('pong', () => { ws.isAlive = true })
  ws.on('message', (raw) => {
    let m
    try { m = JSON.parse(raw) } catch { return }
    try { handle(ws, m) } catch (e) { console.error('handler', e) }
  })
  ws.on('close', () => {
    const p = ws.__player
    if (p && p.__room && rooms.get(p.__room))
      removePlayer(rooms.get(p.__room), p.id)
  })
})

function handle(ws, m) {
  if (m.t === 'create') {
    const code = newCode()
    const room = { code, players: [], phase: 'lobby', word: null, reveal: null }
    rooms.set(code, room)
    return joinRoom(ws, room, m.name, true)
  }
  if (m.t === 'start' && p.host) {
    if (room.players.length < 3) return
    startRound(room, m.category, Math.max(1, Math.min(2, m.impostors || 1)))
  }`,
    },
  },
];

// ── Mini projects: no live link, or live-but-plain UIs ───────────────────────
// Each carries a short explanation and a real excerpt from its repo.

export type MiniProject = {
  slug: string;
  name: string;
  blurb: string;
  stack: string[];
  github: string;
  liveUrl?: string;
  explanation: string[]; // 2–4 sentences, why + how
  code: CodeSample;
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
    code: {
      file: "internal/resp/resp.go",
      lang: "go",
      note: "The RESP2 parser: real Redis arrays, plus a fallback for inline commands.",
      code: `func (r *Reader) ReadCommand() ([]string, error) {
    prefix, err := r.r.ReadByte()
    if err != nil {
        return nil, err
    }
    switch prefix {
    case '*':
        return r.readArray()
    default:
        // Inline command: put the byte back, read a whitespace-split line.
        _ = r.r.UnreadByte()
        line, err := r.readLine()
        if err != nil {
            return nil, err
        }
        return splitInline(line), nil
    }
}`,
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
    code: {
      file: "internal/pool/pool.go",
      lang: "go",
      note: "Fan-out / fan-in with bounded concurrency — results keep input order; cancellation bails out fast.",
      code: `// Map runs fn over inputs using at most 'workers' goroutines.
// Results are returned in the same order as inputs.
func Map[I, O any](ctx context.Context, workers int, inputs []I,
                   fn WorkFn[I, O]) []Result[O] {
    results := make([]Result[O], len(inputs))
    jobs := make(chan job)

    var wg sync.WaitGroup
    wg.Add(workers)
    for w := 0; w < workers; w++ {
        go func() {
            defer wg.Done()
            for j := range jobs {
                if err := ctx.Err(); err != nil {
                    results[j.idx] = Result[O]{Index: j.idx, Err: err}
                    continue
                }
                val, err := fn(ctx, j.in)
                results[j.idx] = Result[O]{Index: j.idx, Value: val, Err: err}
            }
        }()
    }
    // ... dispatch, close(jobs), wg.Wait()
    return results
}`,
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
    code: {
      file: "02_job_filtering/job_scorer.py",
      lang: "python",
      note: "The scoring step — structured output, clamped to a safe range before it touches the database.",
      code: `def score_job(chain, resume_text, job):
    result = chain.invoke({
        "resume": resume_text,
        "job_title": job.get("job_title") or "N/A",
        "company_name": job.get("company_name") or "N/A",
        "experience_required": job.get("experience_required") or "N/A",
        "job_description": job.get("job_description") or "N/A"
    })
    if isinstance(result, dict):
        score = result.get("score", 50)
    else:
        score = 50
    return max(1, min(100, score))`,
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
    code: {
      file: "backend/controller/paymentController.js",
      lang: "js",
      note: "Real payments: a Stripe PaymentIntent minted server-side, only the client_secret crosses the wire.",
      code: `const myPayment = await stripe.paymentIntents.create({
  amount: req.body.amount,
  currency: "inr",
  metadata: {
    company: "Ecommerce",
    userId: req.user?.id || 'unknown',
    timestamp: new Date().toISOString()
  },
});

res.status(200).json({
  success: true,
  client_secret: myPayment.client_secret
});`,
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
    code: {
      file: "finnest-api/.../controllers/TransactController.java",
      lang: "java",
      note: "The transfer path: validate, check funds, log the failure before it happens.",
      code: `@PostMapping("/transfer")
ResponseEntity transfer(@RequestBody TransferRequest request, HttpSession session) {
    // ... parse + validate: empty fields, same-account, zero amount

    double currentBalanceOfAccountTransferringFrom =
            accountRepository.getAccountBalance(user_id, transferFromId);

    if (currentBalanceOfAccountTransferringFrom < transferAmount) {
        // Log failed transaction
        transactRepository.logTransaction(transferFromId, "transfer",
                transferAmount, "online", "failed",
                "Insufficient funds.", currentDateTime);
        return ResponseEntity.badRequest()
                .body("You have insufficient Funds to perform this transfer.");
    }
    // ... debit, credit, log success
}`,
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
    code: {
      file: "src/App.js",
      lang: "js",
      note: "Two transfer paths share one UX: ERC-20 via contract call, plain ETH via contract value.",
      code: `const transferAmount = async () => {
  if (tokenChanged) {
    const tx = await ERCContract.transfer(
      recipientAddress,
      ethers.utils.parseEther(amount)
    );
    await tx.wait();
  } else {
    const tx = await paypalContract._transfer(recipientAddress, symbol, {
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();
  }
};`,
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
    code: {
      file: "custom_gan.py",
      lang: "python",
      note: "The Generator — noise in, synthetic minority-class rows out, Tanh-scaled.",
      code: `class Generator(nn.Module):
    def __init__(self, input_dim=128, output_dim=512):
        super(Generator, self).__init__()
        self.model = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.LeakyReLU(0.2),
            nn.BatchNorm1d(256),

            nn.Linear(256, 512),
            nn.ReLU(),
            nn.BatchNorm1d(512),

            nn.Linear(512, output_dim),
            nn.Tanh()
        )
        self.model.apply(init_weights)

    def forward(self, x):
        return self.model(x)`,
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
    code: {
      file: "model.ipynb",
      lang: "ipynb",
      note: "Classic transfer learning: frozen conv base, trainable compact head.",
      code: `conv_base = VGG16(
    weights='imagenet',
    include_top = False,
    input_shape=(227,227,3)
)
model.add(Flatten())
model.add(Dense(256,activation='relu'))
model.add(Dense(128,activation='relu'))
model.add(Dense(8,activation='softmax'))`,
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
    code: {
      file: "app.py",
      lang: "python",
      note: "Per-entity regex extraction over OCR text, unit suffixes escaped and matched case-insensitively.",
      code: `def extract_values_and_units(text, unit_suffix_map):
    extracted = {}
    for entity_key, suffixes in unit_suffix_map.items():
        for suffix in suffixes:
            # number followed by the unit (with optional space)
            pattern = r'(\\d+\\.?\\d*)\\s*(' + re.escape(suffix) + r')'
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                extracted[entity_key] = matches[0]
                break
    return extracted`,
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
    code: {
      file: "face-recognition/facerecognition3.py",
      lang: "python",
      note: "The marking loop: compare encodings, take the best match, write the roster row.",
      code: `face_locations = face_recognition.face_locations(rgb_small__frame)
face_encodings = face_recognition.face_encodings(
    rgb_small__frame, face_locations)

for face_encoding in face_encodings:
    matches = face_recognition.compare_faces(
        known_face_encodings, face_encoding)
    face_distance = face_recognition.face_distance(
        known_face_encodings, face_encoding)
    best_match_index = np.argmin(face_distance)

    if matches[best_match_index]:
        name = known_face_names[best_match_index]
        if name in students:
            students.remove(name)
            current_time = now.strftime("%H:%M:%S")
            lnwriter.writerow([name, current_time])  # name + time to CSV`,
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
    code: {
      file: "server.c++",
      lang: "cpp",
      note: "The accept-loop pattern every networked server grows out of.",
      code: `n = bind(server_sock,
        (struct sockaddr *)&server_addr, sizeof(server_addr));
listen(server_sock, 5);

while (1) {
    client_sock = accept(server_sock,
        (struct sockaddr *)&client_addr, &addr_size);
    recv(client_sock, buffer, sizeof(buffer), 0);
    // persist the URL, acknowledge, keep listening
}`,
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
    code: {
      file: "snake__game (C++) + snake.html (web port)",
      lang: "cpp",
      note: "The whole architecture of a first-year game: draw → input → logic → sleep.",
      code: `// C++ console original
while(!gameover)
{
    draw();
    input();     // _kbhit() steering
    logic();
    Sleep(40);
}

// web port keeps the same shape on a canvas
function init(){snake=[{x:10,y:10}];dir={x:1,y:0};food={x:15,y:15};
  score=0;gameOver=false;loop=setInterval(tick,120)}`,
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
