"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "GenAI systems.",
  "full-stack web apps.",
  "data pipelines.",
  "things people use.",
];

export function TypingRoles() {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
          );
        },
        deleting ? 45 : 75
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx]);

  return (
    <span className="gradient-text">
      {text}
      <span className="caret" aria-hidden>
        &nbsp;
      </span>
    </span>
  );
}
