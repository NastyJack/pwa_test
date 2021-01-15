//import abc from ""
const cacheName = "IMDb_Cache_v1";
const staticAssets = [
  "./",
  "./index.html",
  "./static/js/main.chunk.js",
  "./static/js/0.chunk.js",
  "./static/js/bundle.js",
  "./offline.html",
  "./manifest.json",
  "./imdb_query_icon.png",
  "./favicon.ico",
];

const self = this;

//instsall
self.addEventListener("install", (event) => {
  // console.log("I m inside INSTALL event");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Cache Opened");
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) console.log("[SW] Fetched from cache", event);
      else console.log("[SW] Fetched from network", event);

      let requestClone = event.request.clone();
      fetch(requestClone)
        .then((response) => {
          if (!response) {
            console.log("[SW] No response from network fetch");
            return response;
          }
          let responseClone = response.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseClone);
            return response;
          });
        })
        .catch((err) => {
          console.log("[SW] ERROR at fetch event while caching new data", err);
          return caches.match("offline.html");
        });

      return (
        response ||
        fetch(event.request).catch(() => {
          console.log("why you try to connect offline huh?");
          return caches.match("./offline.html");
        })
      );
    })
  );
});

//activate
self.addEventListener("activate", (event) => {
  console.log("I m inside ACTIVATE event");
  const cacheWhiteList = [];
  cacheWhiteList.push(cacheName);

  event.waitUntil(
    caches.keys().then((CACHE_NAMES) =>
      Promise.all(
        CACHE_NAMES.map((CacheNameItem) => {
          if (!cacheWhiteList.includes(CacheNameItem))
            return caches.delete(CacheNameItem);
          else return null;
        })
      )
    )
  );
});
