/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function getNotesDir() {
  return path.join(process.cwd(), "pages", "notes");
}

function getOrderedNotes() {
  const dir = getNotesDir();
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const entries = files.map((name) => {
    const fullPath = path.join(dir, name);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const slug = name.replace(/\.mdx$/, "");
    const title = data.title || slug.replace(/-/g, " ");
    const updated = data.updated || null;
    const tags = data.tags || [];
    const status = data.status || null;
    return { slug, title, updated, tags, status };
  });
  return entries.sort((a, b) => {
    const ad = a.updated ? Date.parse(a.updated) : 0;
    const bd = b.updated ? Date.parse(b.updated) : 0;
    return bd - ad; // newest first
  });
}

function getRelatedNotes(slug, tags, notes) {
  if (!tags || tags.length === 0) return [];
  return notes.filter((n) => n.slug !== slug && n.tags?.some((t) => tags.includes(t))).slice(0, 5);
}

function generateNotesData() {
  try {
    const notes = getOrderedNotes();
    const data = {};
    notes.forEach((note) => {
      data[note.slug] = {
        meta: note,
        related: getRelatedNotes(note.slug, note.tags || [], notes),
      };
    });
    const outputPath = path.join(process.cwd(), "public", "notes-data.json");
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`Generated notes data for ${notes.length} notes`);
  } catch (err) {
    console.error("Error generating notes data:", err);
    process.exit(1);
  }
}

generateNotesData();
