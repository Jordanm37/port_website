export type AnalyticsEvent = {
  name: string;
  props?: Record<string, unknown>;
  ts?: number;
};

const endpoint: string | undefined =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_ANALYTICS_URL as string | undefined)
    : undefined;

export function track(name: string, props?: Record<string, unknown>): void {
  const evt: AnalyticsEvent = { name, props, ts: Date.now() };
  if (endpoint) {
    try {
      const blob = new Blob([JSON.stringify(evt)], { type: "application/json" });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, blob);
        return;
      }
      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(evt),
        headers: { "content-type": "application/json" },
      }).catch(() => {});
    } catch {
      // ignore
    }
  } else if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("analytics", evt);
  }
}
