// Service worker mínimo de Torre. Solo guarda recursos estáticos públicos (iconos y bundles de Next).
// Nunca toca navegaciones, route handlers ni peticiones a Supabase: no se cachea nada autenticado.
const CACHE = "torre-shell-v1"
const SHELL = ["/icon.svg", "/icon-maskable.svg"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const req = event.request
  if (req.method !== "GET") return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  const isStatic = url.pathname.startsWith("/_next/static/") || SHELL.includes(url.pathname)
  if (!isStatic) return
  event.respondWith(
    caches.match(req).then((hit) => hit ?? fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)) }
      return res
    }))
  )
})
