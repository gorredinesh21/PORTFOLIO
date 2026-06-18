export const profile = {
  name: "Gorre Dinesh Chandan Reddy",
  shortName: "Dinesh",
  role: "Data / AI Engineer",
  tagline:
    "Building intelligent data products at the intersection of Data Engineering, ML and Gen AI.",
  location: "Mumbai, India",
  email: "gorredinesh21@gmail.com",
  phone: "+91 74167 67453",
  github: "https://github.com/gorredinesh21",
  linkedin: "https://www.linkedin.com/in/gorredinesh21",
  resumeUrl: "/GORRE_DINESH_CV.pdf",
};

export const navLinks = [
  { href: "/", label: "home", path: "~/" },
  { href: "/about", label: "about", path: "~/about" },
  { href: "/experience", label: "experience", path: "~/experience" },
  { href: "/projects", label: "projects", path: "~/projects" },
  { href: "/skills", label: "skills", path: "~/skills" },
  { href: "/contact", label: "contact", path: "~/contact" },
];

export const aboutBio = [
  {
    heading: "background.txt",
    content: [
      "Computer Science graduate from IIT (ISM) Dhanbad (2025).",
      "Currently a Graduate Engineer Trainee at Reliance Industries Ltd. in Mumbai, working as a Data / AI Engineer on Databricks, ADF, and Gen AI platforms.",
      "I started exploring Machine Learning in my third year of B.Tech — what began as curiosity turned into a long journey across ML, Deep Learning, Computer Vision, NLP, and Transformers.",
      "For the last 12–15 months I have been deeply focused on Generative AI: LangChain, LangGraph, AI agents, MCP, RAG, and the broader agentic stack.",
    ],
  },
  {
    heading: "philosophy.txt",
    content: [
      "I do not believe in being narrowly specialised this early in my career.",
      "Instead I try to keep one foot in fundamentals (ML / DL / DSA) and one foot in what is current (Gen AI, agentic systems, data platforms).",
      "I learn by building — every concept becomes a small project, every project becomes a stepping stone for the next idea.",
    ],
  },
  {
    heading: "currently.txt",
    content: [
      "Designing a Unified Genie Architecture on Databricks that overcomes the 30-table limit of native Genie spaces.",
      "Building a Talk-to-Genie web app: an OAuth-secured external interface that lets non-Databricks users converse with internal data.",
      "Writing PySpark notebooks that transform Silver data into Gold KPI tables for operational dashboards.",
    ],
  },
];

export const experience = [
  {
    company: "Reliance Industries Ltd.",
    role: "Graduate Engineer Trainee — Data / AI Engineer",
    location: "Mumbai, India",
    period: "Aug 2025 – Present",
    stack: [
      "Databricks",
      "PySpark",
      "Azure Data Factory",
      "ADLS Gen2",
      "OAuth",
      "RAG",
      "FastAPI",
    ],
    highlights: [
      {
        title: "Talk-to-Genie Platform",
        body: "Built an external web application integrating Databricks Genie via OAuth, enabling secure conversational access to internal data for users who do not have Databricks workspace seats.",
      },
      {
        title: "Unified Genie Architecture",
        body: "Designed a scalable RAG framework that overcomes Databricks Genie's hard 30-table limit by organising 120+ tables across 9 Genie spaces, with a routing layer in front.",
      },
      {
        title: "Intelligent Query Routing Engine",
        body: "Built a semantic retrieval pipeline over table and column metadata to dynamically route user prompts to the most relevant Genie space — improving answer accuracy and reducing wasted retrieval.",
      },
      {
        title: "KPI Analytics Platform",
        body: "Developed Databricks workflows and PySpark notebooks that transform Silver datasets into Gold KPI tables powering operational dashboards.",
      },
      {
        title: "Near Real-Time Data Pipeline",
        body: "Built ADF ingestion pipelines with 15-minute refresh cycles across Landing → Bronze → Silver layers.",
      },
    ],
  },
];

export const projects = [
  {
    slug: "startup-intelligence-platform",
    name: "Startup Intelligence Platform",
    tagline:
      "GraphRAG + RAPTOR market-intelligence engine with an agentic research chat",
    period: "2026",
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "GraphRAG",
      "RAPTOR",
      "Qdrant",
      "Neo4j / NetworkX",
      "BGE Embeddings",
      "Mistral (HF)",
      "Next.js 16",
      "React Flow",
    ],
    github: "https://github.com/gorredinesh21/Startup-Intelligence-Platform.",
    summary:
      "An AI-powered market-intelligence system that continuously maps startup ecosystems — competitors, funding histories, partnerships and emerging tech — using a hybrid GraphRAG + RAPTOR engine. A Perplexity-style research agent answers multi-hop questions with inline citations, while an interactive React Flow graph lets you explore the relationships visually.",
    problem:
      "Understanding a startup ecosystem means stitching together scattered, unstructured signals — who competes with whom, who funded whom, which partnerships matter. Pure vector RAG flattens those relationships and pure keyword search misses semantics. I wanted a system that reasons over both a semantic knowledge hierarchy and an explicit relationship graph, and shows its work with traceable citations.",
    approach: [
      "Built a RAPTOR ingestion pipeline: chunk → embed → K-Means cluster → recursive LLM summarization into a multi-level tree (raw chunks up to global summaries) stored in Qdrant.",
      "Extracted structured entities and relationships (COMPETES_WITH, FUNDED_BY, PARTNERED_WITH) into a Neo4j / NetworkX graph during ingestion, with a rule-based parser fallback.",
      "Implemented the reasoning agent as a LangGraph loop: intent detection → query planning → parallel graph + RAPTOR retrieval → BGE cross-encoder reranking → cited answer synthesis.",
      "Used BAAI/bge-large-en-v1.5 (1024-d) embeddings, bge-reranker-large for relevance, and Mistral-Small-3.1-24B via the Hugging Face Inference API for generation.",
      "Designed a full LOCAL_FALLBACK mode — SQLite, in-memory NetworkX, file-based Qdrant and mocked inference — so the whole stack runs offline with zero external keys.",
      "Shipped a Next.js 16 frontend: a LangGraph node-stepper that visualizes agent execution live, citation popups to source chunks, and an interactive React Flow ecosystem graph with 2-hop neighborhood expansion and an acquisition predictor.",
    ],
    highlights: [
      "Hybrid retrieval: semantic RAPTOR summaries fused with explicit relationship-graph traversal, reranked by a cross-encoder.",
      "Agentic LangGraph pipeline with a live node-stepper UI and click-through citations to the exact source chunks.",
      "Interactive React Flow graph — color-coded entities, multi-hop path highlights, and double-click neighborhood expansion.",
      "Full offline LOCAL_FALLBACK mode (SQLite + NetworkX + local Qdrant + mocked LLM) for keyless local development.",
    ],
    metrics: [
      { label: "Retrieval", value: "GraphRAG + RAPTOR" },
      { label: "Embeddings", value: "BGE-large (1024-d)" },
      { label: "Storage", value: "Qdrant + Neo4j + SQL" },
    ],
  },
  {
    slug: "career-ops-2",
    name: "Career-Ops 2.0",
    tagline:
      "Agentic, India-tuned job-search command center built as an AI-CLI skill",
    period: "2026",
    stack: [
      "Node.js",
      "Claude Code / Gemini CLI",
      "Agent Skills (MCP-style)",
      "Playwright",
      "Apify",
      "Telegram",
      "YAML",
      "LangGraph-style agents",
    ],
    github: "https://github.com/gorredinesh21/Career-ops-2.0",
    summary:
      "A heavily customized, India-tuned build of the agentic Career-Ops job-search system — turning any AI coding CLI (Claude Code, Gemini, OpenCode, Codex) into a job-search command center that evaluates offers with a structured A–F rubric, generates ATS-optimized PDF CVs and cover letters per role, and scans portals automatically. I rebuilt the scanner around verified Indian ATS boards and wired in Apify and Telegram sourcing.",
    problem:
      "Most job-search tooling is spray-and-pray. I wanted a filter, not a firehose — a system that reasons about my CV against each JD (not keyword matching), scores fit honestly, and tailors a resume only for roles worth applying to. The upstream system was tuned for US/EU AI labs, so I re-targeted the whole thing for the Indian GenAI / Data-Engineering market.",
    approach: [
      "Onboarded the open-source Career-Ops agent skill end-to-end: my CV, career story, archetypes, scoring weights and target roles encoded as the system's source-of-truth config.",
      "Rebuilt the portal scanner around verified Indian ATS boards and seeded it with real Indian companies (CRED, Meesho, Razorpay, PhonePe, Groww, Unacademy and more).",
      "Added a third sourcing pipeline via the Apify REST API (apify-scan.mjs) running LinkedIn / Naukri / All-Jobs scrapers, plus a Telegram (TechUprise) sourcing feed that auto-adds new companies to portals.yml.",
      "Wrote analysis tooling (analyze-scan.mjs, analyze-patterns.mjs) over scan output and used batch sub-agents to evaluate 40+ offers in parallel, each producing a tracker entry.",
      "Kept the system strictly human-in-the-loop and multi-CLI: a single /career-ops skill definition drives Claude Code, Gemini, OpenCode and Codex identically.",
    ],
    highlights: [
      "Re-targeted an open-source agentic system for the Indian GenAI / DE market with verified ATS boards and real company seeds.",
      "Three-source sourcing: portal scanner + Apify REST scrapers + Telegram feed, auto-merging into one deduped pipeline.",
      "Structured A–F fit scoring + per-role ATS CV and cover-letter PDFs via an HTML → Playwright pipeline.",
      "Batch parallel evaluation of 40+ offers with sub-agents; provider-agnostic across four AI coding CLIs.",
    ],
    metrics: [
      { label: "Offers evaluated", value: "40+ (batched)" },
      { label: "Sources", value: "Portals + Apify + Telegram" },
      { label: "Market focus", value: "India GenAI / DE" },
    ],
  },
  {
    slug: "dating-profile-optimizer",
    name: "AI Dating Profile Optimizer",
    tagline:
      "Human-in-the-loop LLM agent that analyzes, rewrites and one-click-publishes a dating profile",
    period: "2026",
    stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "Hugging Face",
      "Google Gemini",
      "Ollama",
      "Pydantic",
      "Vision (VLM)",
    ],
    github: "https://github.com/gorredinesh21/TINDER_MCP_AI",
    summary:
      "A local web app that scores a user's dating profile, rewrites the bio and prompt answers from their real details, plans their photos with a vision model, and publishes the approved changes live — backed by a pluggable LLM brain (Hugging Face / Gemini / local Ollama) tuned for the Indian market.",
    problem:
      "Dating-profile advice is generic and people rarely know what is actually holding their profile back. I wanted an AI that reasons over a real profile against a research-backed rubric, proposes specific and original improvements (never invented facts), and can push them live — while staying strictly human-in-the-loop: it drafts, the user decides and publishes. It deliberately never auto-messages matches, which would deceive people and risk bans.",
    approach: [
      "Defined a clean Pydantic data contract (Profile / Match) that the AI works against, decoupled from any single provider via a connector layer.",
      "Built a pluggable LLM brain in LangChain with three swappable backends — Hugging Face Inference (Qwen2.5-72B), Google Gemini, and local Ollama — selectable by an env flag, with no proprietary keys required.",
      "Used prompt-and-parse structured output (ask for JSON matching the schema, then validate) so it works on any instruct model without native tool-calling.",
      "Encoded a research-backed knowledge pack (bio, prompts, photos, India context) as the system rubric the model must follow when scoring and rewriting.",
      "Added a vision step (Gemini or a local VLM via Ollama) that actually looks at each photo to drive keep/drop and ordering advice.",
      "Wrapped everything in a FastAPI dashboard (bound to localhost) where the user reviews scores, edits suggestions inline, and clicks to publish the bio and prompts back to the live profile.",
    ],
    highlights: [
      "Provider-agnostic LLM brain: Hugging Face, Gemini, or fully-local Ollama — switchable at runtime.",
      "Multimodal photo analysis via a vision model — keep/drop, ordering, and gap detection on real images.",
      "One-click live publishing of AI-drafted bios and prompts, with a strict human-in-the-loop guarantee.",
      "Offline test suite (26/26) and CI; tokens used in-memory per request and never stored.",
    ],
    metrics: [
      { label: "LLM backends", value: "HF / Gemini / Ollama" },
      { label: "Modalities", value: "Text + Vision" },
      { label: "Control", value: "100% human-in-the-loop" },
    ],
  },
  {
    slug: "careeros",
    name: "CareerOS",
    tagline: "AI Job Application Pipeline — sourcing → scoring → tailored resumes",
    period: "2026",
    stack: [
      "Python",
      "Flask",
      "SQLite",
      "LangChain",
      "Hugging Face LLMs",
      "BeautifulSoup",
      "LaTeX",
    ],
    github: "https://github.com/gorredinesh21/JOB_APPLICATION_HANDLER-",
    summary:
      "End-to-end pipeline that turns raw daily job leads (Telegram, Gmail) into application-ready, AI-tailored resume PDFs — and surfaces everything through a Flask dashboard with scores, filters, and one-click downloads.",
    problem:
      "Job hunting at scale is repetitive and noisy: scraping postings, reading every JD, judging fit, and rewriting a resume for each role can eat hours per day. I wanted to compress that loop into a single reviewable dashboard while keeping every final decision visible to me.",
    approach: [
      "Ingest structured daily job JSONs sourced from Telegram channels and Gmail job alerts.",
      "For each job, scrape the apply URL with BeautifulSoup and ask a Hugging Face LLM to extract a clean job description and external job ID into strict JSON.",
      "Score every enriched job against my resume on a 1–100 scale and persist results in `jobs_new.db`.",
      "For jobs above a configurable score threshold, an LLM tailors my base resume JSON to the JD, then a LaTeX template compiles each into a PDF.",
      "A Flask dashboard ties it all together: browse, filter, inspect, download tailored resumes, open apply links, and re-run individual pipeline stages from an admin page.",
    ],
    highlights: [
      "Five-stage pipeline: sourcing → enrichment → scoring → resume generation → dashboard.",
      "LLM-tailored resumes generated as JSON → LaTeX → PDF, one artifact per job.",
      "SQLite-backed dashboard with search, score filters, and per-stage admin controls.",
    ],
    metrics: [
      { label: "Pipeline stages", value: "5" },
      { label: "Sources", value: "Telegram + Gmail" },
      { label: "Time per role", value: "minutes → seconds" },
    ],
  },
  {
    slug: "gan-augmentation",
    name: "GAN-Based Data Augmentation",
    tagline: "B.Tech thesis: tabular GAN + SMOTE for severe class imbalance",
    period: "2024 · IIT (ISM) B.Tech Final-Year Project",
    stack: [
      "Python",
      "PyTorch",
      "GANs",
      "SMOTE",
      "XGBoost",
      "LightGBM",
      "scikit-learn",
      "SciPy",
    ],
    github: "https://github.com/gorredinesh21/FINAL_YEAR_PROJECT",
    summary:
      "End-to-end augmentation framework for highly imbalanced tabular datasets — Custom GAN + SMOTE feed four classifier families, evaluated with 5-fold CV, PR curves and McNemar's test.",
    problem:
      "Fraud and rare-event tabular datasets are pathologically imbalanced — positive examples are scarce and naïve oversampling distorts decision boundaries. I wanted to see how far a custom tabular GAN could push recall without sacrificing precision, and prove the lift was statistically real, not noise.",
    approach: [
      "Custom Generator (128 → 256 → 512, Tanh) and Discriminator (512 → 256 → 128 → 1) with Xavier init, LeakyReLU, and BatchNorm for stable tabular training.",
      "Combined GAN-synthesised positives with SMOTE for additional diversity in the minority class.",
      "Trained four classifier families — Random Forest, XGBoost, LightGBM, Gradient Boosting — on real-only vs real+augmented data with 5-fold cross-validation.",
      "Evaluation module: confusion matrices, precision-recall curves, and McNemar's test to statistically compare classifiers head-to-head.",
    ],
    highlights: [
      "Reduced False Negatives to 9 across a 10M+ row credit-card dataset.",
      "Recall lifted from 0.91 → 0.99 on the hold-out set.",
      "Statistical comparison (McNemar's test) across 4 model families on real vs augmented data.",
    ],
    metrics: [
      { label: "Rows processed", value: "10M+" },
      { label: "Recall lift", value: "0.91 → 0.99" },
      { label: "False Negatives", value: "9" },
    ],
  },
  {
    slug: "mars-landmark-detection",
    name: "Mars Landmark Detection",
    tagline: "VGG16 transfer learning for 8-class Martian terrain classification",
    period: "2024",
    stack: [
      "Python",
      "TensorFlow",
      "Keras",
      "VGG16",
      "Transfer Learning",
      "CNN",
    ],
    github: "https://github.com/gorredinesh21/MARS_LANDMARK_DETECTION",
    summary:
      "Deep learning classifier that labels Mars surface images into 8 landmark categories — craters, valleys, mountains, plateaus and others — using VGG16 transfer learning.",
    problem:
      "Mars rovers and orbiters generate huge image streams, but identifying terrain features (craters, valleys, plateaus) still leans heavily on manual inspection. I wanted to see how far an off-the-shelf CNN backbone could automate that classification on a real planetary-science dataset.",
    approach: [
      "Loaded a dataset of 8,200 training and 2,000 test Martian images across 8 landmark classes.",
      "Used VGG16 with ImageNet pre-trained weights as a frozen convolutional base.",
      "Stacked Flatten → Dense(256, ReLU) → Dense(128, ReLU) → Dense(8, Softmax) classification head on top.",
      "Trained, evaluated, and exported architecture + weights for reproducible inference on new images.",
    ],
    highlights: [
      "88% training accuracy on 8-class Martian terrain classification.",
      "Reusable inference pipeline: `architecture.json` + `my_model.weights.h5` rehydrate the model in a few lines.",
      "Test images shipped in `/test` for instant qualitative inspection.",
    ],
    metrics: [
      { label: "Classes", value: "8" },
      { label: "Training accuracy", value: "88%" },
      { label: "Images", value: "10,200" },
    ],
  },
  {
    slug: "ocr-extraction",
    name: "Image-Based Entity Extraction",
    tagline: "OCR pipeline for product attribute extraction at scale",
    period: "2024 · Amazon ML Challenge",
    stack: ["Python", "PyTesseract", "OCR", "Regex", "Pandas"],
    github: "https://github.com/gorredinesh21/ImageEntityExtraction",
    summary:
      "OCR pipeline for the Amazon ML Challenge that extracts dimensions, weight, volume, voltage and wattage from product images — built without preprocessing or GPU.",
    problem:
      "Many product catalogues only carry critical attributes (size, weight, voltage) inside the image, not as structured fields. The Amazon ML Challenge dataset of 260K training and 131K test images had highly variable quality — low resolution, light text, unclear fonts — and I had to extract structured entity values without a GPU.",
    approach: [
      "Ran PyTesseract directly on raw images, skipping preprocessing to stay within CPU compute budgets.",
      "Built custom regex + string-logic post-processors to extract specific entity types (weight, volume, voltage, wattage, dimensions).",
      "Mapped a curated list of unit abbreviations to canonical forms during extraction.",
      "Batched inference across 130K+ images and produced a structured output table.",
    ],
    highlights: [
      "56% accuracy on the test set across diverse entity types.",
      "F1-score of 0.319 in the final competition evaluation.",
      "Top 200 out of 18,500+ teams in the Amazon ML Challenge.",
    ],
    metrics: [
      { label: "Images processed", value: "130K+" },
      { label: "Test accuracy", value: "56%" },
      { label: "Leaderboard", value: "Top 200 / 18,500+" },
    ],
  },
  {
    slug: "movie-recommendation",
    name: "Movie Recommendation System",
    tagline: "Content-based recommender on 5K movies with Streamlit UI",
    period: "2024",
    stack: [
      "Python",
      "scikit-learn",
      "Bag-of-Words",
      "Cosine Similarity",
      "Streamlit",
      "TMDb API",
      "Pickle",
    ],
    github: "https://github.com/gorredinesh21/MOVIE_RECOMENDATION_SYSTEM",
    summary:
      "End-to-end content-based movie recommender that vectorises 5,000 movies on genre, cast, crew, and overview text — and recommends 10 similar titles through a Streamlit web app with TMDb poster lookups.",
    problem:
      "Most recommenders need user-interaction data to bootstrap. I wanted a cold-start, content-driven engine that could recommend movies purely from metadata — and ship it as an interactive app rather than a notebook.",
    approach: [
      "Cleaned a 5,000-movie metadata dataset down to genre, id, keywords, title, overview, cast, crew.",
      "Vectorised the combined text features with a Bag-of-Words representation.",
      "Computed pairwise cosine similarity and persisted the model with Pickle for fast lookup at request time.",
      "Built a Streamlit front-end that accepts a movie title, returns the 10 most similar titles, and pulls posters from the TMDb API.",
    ],
    highlights: [
      "Recommends 10 similar movies on the fly from a 5K-movie corpus.",
      "Streamlit UI with poster lookups via the TMDb API.",
      "Pre-computed similarity matrix for near-instant inference.",
    ],
    metrics: [
      { label: "Catalogue size", value: "5,000 movies" },
      { label: "Recommendations", value: "Top 10 / query" },
      { label: "Stack", value: "BoW + cosine + Streamlit" },
    ],
  },
  {
    slug: "ethereum-payments-dapp",
    name: "Ethereum Payments DApp",
    tagline: "Multi-chain ETH & ERC-20 transfer DApp with MetaMask",
    period: "2024",
    stack: [
      "React",
      "ethers.js",
      "Tailwind CSS",
      "Solidity",
      "Sepolia",
      "Polygon Mumbai",
      "MetaMask",
    ],
    github: "https://github.com/gorredinesh21/BLOCKCHAIN",
    summary:
      "Decentralised payments app for ETH and ERC-20 token transfers, with multi-chain support (Sepolia, Polygon Mumbai), MetaMask integration, and a custom PayPal-like smart contract.",
    problem:
      "I wanted to learn Web3 development hands-on — wallet auth, multi-chain detection, ERC-20 token UX, and on-chain transactions — by shipping something that actually moved real testnet value end-to-end.",
    approach: [
      "Built a React + Tailwind front-end with React Context for wallet, chain, and token state.",
      "Integrated MetaMask for wallet connection and signing; auto-detects network changes and re-fetches balances.",
      "Used ethers.js to read ERC-20 balances by contract address and execute ETH and token transfers.",
      "Deployed a custom PayPal-like smart contract to handle ETH payments and store transaction history.",
    ],
    highlights: [
      "Multi-chain (Sepolia + Polygon Mumbai) auto-detection and switching.",
      "Generic ERC-20 support — paste any token contract address and transact.",
      "Custom Solidity contract for ETH payments with on-chain transaction logging.",
    ],
    metrics: [
      { label: "Chains supported", value: "Sepolia + Mumbai" },
      { label: "Token standards", value: "ETH + ERC-20" },
      { label: "Wallet", value: "MetaMask" },
    ],
  },
  {
    slug: "facial-attendance-system",
    name: "Facial Recognition Attendance System",
    tagline: "Hackfest'23 — face-recognition attendance + student/teacher portal",
    period: "2023 · Hackfest, IIT (ISM) Dhanbad",
    stack: [
      "Python",
      "Flask",
      "OpenCV",
      "Face Recognition",
      "HTML/CSS",
      "Excel/CSV",
    ],
    github:
      "https://github.com/gorredinesh21/The-Bit-Lords---IIT-ISM-Dhanbhad",
    summary:
      "Hackathon project that automates classroom attendance via face recognition, with a student dashboard for attendance tracking and a teacher dashboard for resources and announcements.",
    problem:
      "Classroom attendance is still mostly manual — roll calls eat class time and the records are hard to audit. For Hackfest'23 our team wanted to ship a working end-to-end system that handled enrolment, recognition, and reporting in one place.",
    approach: [
      "Captured enrolled faces and encoded them via a face-recognition pipeline, stored alongside a `students.xlsx` roster.",
      "Built a Flask web app: students view their attendance dashboard, teachers post resources and announcements.",
      "Face recognition module (`facerecognition.py`) marks attendance from a live capture and writes back to the CSV/Excel store.",
      "Templated UI (HTML + static assets) for the student/teacher views.",
    ],
    highlights: [
      "Automated, contactless classroom attendance via face recognition.",
      "Student dashboard for attendance tracking + teacher dashboard for resources.",
      "Persistent roster + attendance log in Excel/CSV for easy export.",
    ],
    metrics: [
      { label: "Event", value: "Hackfest'23" },
      { label: "Stack", value: "Flask + face-recognition" },
      { label: "Team", value: "The Bit Lords, IIT (ISM)" },
    ],
  },
  {
    slug: "tcp-proxy-server",
    name: "Multi-Threaded TCP Client-Proxy Server",
    tagline: "C++ networking course project — TCP socket server with file handling",
    period: "2023 · Operating Systems coursework, IIT (ISM)",
    stack: ["C++", "TCP Sockets", "POSIX Threads", "File I/O"],
    github: "https://github.com/gorredinesh21/OS-PROJECRT",
    summary:
      "Course project building a minimal TCP client-server in C++ — the server binds a port, accepts connections, receives a URL from the client, and persists it to a file before acknowledging.",
    problem:
      "The OS course needed a working systems-level project that demonstrated socket programming, multi-threading, and basic protocol design between a client and server — not just running a library.",
    approach: [
      "Server creates a TCP socket, binds an IP:port, listens for incoming connections, and accepts them.",
      "On accept, reads a URL string from the client and writes it to `GET.txt` on disk.",
      "Sends a confirmation message back to the client and continues listening for the next connection.",
      "Client opens a TCP socket, connects to the server, prompts the user for a URL, sends it, and waits for confirmation before closing.",
    ],
    highlights: [
      "Raw TCP socket implementation in C++ — no networking library wrappers.",
      "Demonstrates accept-loop pattern and client/server protocol design.",
      "Team project with three classmates as part of the OS curriculum.",
    ],
    metrics: [
      { label: "Language", value: "C++" },
      { label: "Protocol", value: "TCP sockets" },
      { label: "Team size", value: "4" },
    ],
  },
  {
    slug: "flappy-bird-cpp",
    name: "Flappy Bird (C++ Console)",
    tagline: "Windows console flappy bird written in C++ from scratch",
    period: "2022 · First year",
    stack: ["C++", "Windows API", "conio.h", "ASCII Rendering"],
    github: "https://github.com/gorredinesh21/flappy-bird-game",
    summary:
      "Single-file flappy bird clone rendered entirely in the Windows console — collision, gravity, scoring and ASCII art in ~150 lines of C++.",
    problem:
      "Early in college I wanted to learn C++ beyond textbook exercises. Reproducing a real game inside the terminal forced me to think about loops, input handling, screen refresh and game state — all without a graphics library.",
    approach: [
      "Used `windows.h` and `conio.h` for cursor positioning, console handles, and non-blocking key input.",
      "Rendered the playfield, bird and three independently-positioned pipes as ASCII characters with manual `gotoxy`.",
      "Tracked bird position, gravity, pipe gaps, and collision in a single game loop.",
      "Maintained score and on-screen menu inside the same console window.",
    ],
    highlights: [
      "From-scratch console game loop — input, physics, rendering, scoring.",
      "Three rolling pipes with randomised gap positions.",
      "Pure C++ with Win32 console APIs — no third-party libraries.",
    ],
    metrics: [
      { label: "Language", value: "C++" },
      { label: "Lines", value: "~150" },
      { label: "Dependencies", value: "0 (Win32 only)" },
    ],
  },
];

export const skills = [
  {
    category: "languages",
    items: ["Python", "SQL", "PostgreSQL", "C++", "C"],
  },
  {
    category: "data_engineering",
    items: [
      "Databricks",
      "PySpark",
      "Azure Data Factory",
      "ADLS Gen2",
      "Apache Spark",
      "ETL",
      "Data Warehousing",
      "AWS",
    ],
  },
  {
    category: "gen_ai",
    items: [
      "LangChain",
      "LangGraph",
      "Hugging Face",
      "Ollama",
      "Agentic AI",
      "MCP",
      "RAG",
      "Fine-tuning",
      "FAISS",
      "ChromaDB",
      "FastAPI",
    ],
  },
  {
    category: "ml_and_dl",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "CNN",
      "LSTMs",
      "BERT",
      "Transformers",
      "Transfer Learning",
      "GANs",
      "XAI",
      "OCR",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "MLOps",
    ],
  },
];

export const achievements = [
  "Secured AIR 2903 in JEE Advanced and AIR 4616 in JEE Mains.",
  "Ranked Top 200 out of 18,500+ teams in Amazon ML Challenge.",
  "Participated in Hackfest'23 at IIT Dhanbad.",
];

export const education = {
  degree: "B.Tech, Computer Science and Engineering",
  school: "Indian Institute of Technology (ISM), Dhanbad",
  period: "Dec 2021 – May 2025",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "DBMS",
    "Software Engineering",
    "Computer Networks",
    "Deep Learning",
  ],
};
