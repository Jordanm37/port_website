const CACHE_NAME = "offline-v1";
const CORE_ASSETS = ["/", "/writing", "/rss.xml", "/feed.json", "/styles/print.css"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((resp) => {
            const respClone = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
            return resp;
          })
          .catch(() => cached)
      );
    })
  );
});
