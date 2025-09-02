"use client";
import { useEffect, useState } from "react";

type TocItem = { id: string; text: string; level: number };

export default function TOC() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll("h1, h2, h3")) as HTMLHeadingElement[];
    const toc = heads.map((h) => ({
      id: h.id,
      text: h.innerText,
      level: Number(h.tagName.substring(1)),
    }));
    setItems(toc.filter((t) => t.id));
  }, []);

  if (!items.length) return null;
  return (
    <nav aria-label="Table of contents">
      <ul>
        {items.map((i) => (
          <li key={i.id} style={{ marginLeft: (i.level - 1) * 12 }}>
            <a href={`#${i.id}`}>{i.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
