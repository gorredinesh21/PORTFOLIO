import type { CodeSample } from "@/lib/data";

// Tiny, dependency-free highlighter: comments, strings, and a small keyword
// set per language. Good enough for portfolio excerpts; never claims to be a
// parser.
function highlight(code: string, lang: CodeSample["lang"]): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const keywords: Record<string, string[]> = {
    go: ["func", "return", "for", "if", "else", "range", "var", "const", "type", "struct", "map", "chan", "go", "defer", "package", "import", "switch", "case", "default", "nil", "error", "string", "int", "float64", "bool", "make", "append", "len"],
    python: ["def", "return", "for", "if", "elif", "else", "class", "import", "from", "as", "with", "try", "except", "raise", "None", "True", "False", "not", "in", "and", "or", "async", "await", "lambda", "yield", "pass", "while", "is"],
    java: ["public", "private", "protected", "static", "void", "return", "if", "else", "new", "class", "final", "double", "int", "String", "ResponseEntity", "while", "throws"],
    cpp: ["while", "if", "return", "struct", "void", "char", "int", "using", "namespace", "include", "const"],
    ts: ["const", "let", "export", "function", "return", "type", "interface", "import", "from", "async", "await", "if", "else", "new"],
    js: ["const", "let", "export", "function", "return", "await", "async", "if", "else", "new", "import", "from"],
    jsx: ["const", "let", "export", "function", "return", "import", "from", "if", "else"],
    html: ["function", "var", "return"],
    ipynb: ["import", "def", "return", "for", "if", "else", "class"],
  };
  const kw = keywords[lang] ?? keywords.js;

  // Pass 1: split into comment / string / code segments so nothing inside
  // strings or comments gets keyword-highlighted.
  const commentRe =
    lang === "python" || lang === "ipynb"
      ? /#[^\n]*/
      : /\/\/[^\n]*|\/\*[\s\S]*?\*\//;
  const stringRe = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/;

  const out: string[] = [];
  let rest = code;
  const tokenRe = new RegExp(
    `(${commentRe.source})|(${stringRe.source})`,
    "g"
  );
  let m: RegExpExecArray | null;
  let last = 0;
  while ((m = tokenRe.exec(rest)) !== null) {
    const [full, cmt, str] = m;
    const plain = rest.slice(last, m.index);
    out.push(highlightPlain(plain, kw));
    if (cmt) out.push(`<span class="tok-cmt">${esc(cmt)}</span>`);
    else if (str) out.push(`<span class="tok-str">${esc(str)}</span>`);
    last = m.index + full.length;
  }
  out.push(highlightPlain(rest.slice(last), kw));
  return out.join("");

  function highlightPlain(s: string, kws: string[]): string {
    const escd = esc(s);
    if (!escd) return "";
    return escd.replace(
      new RegExp(`\\b(${kws.join("|")})\\b`, "g"),
      `<span class="tok-kw">$1</span>`
    );
  }
}

export function CodeBlock({ sample }: { sample: CodeSample }) {
  return (
    <div className="codebox">
      <header>
        <span className="chip !text-[0.6rem] !py-0.5">{sample.lang}</span>
        <span className="fname" title={sample.file}>
          {sample.file}
        </span>
      </header>
      {sample.note && (
        <p className="px-[1.1rem] pt-2.5 text-[0.78rem] leading-relaxed text-muted">
          {sample.note}
        </p>
      )}
      <pre>
        <code
          dangerouslySetInnerHTML={{ __html: highlight(sample.code, sample.lang) }}
        />
      </pre>
    </div>
  );
}
