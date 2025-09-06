export function formatDateNatural(iso?: string | null): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso || undefined;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
