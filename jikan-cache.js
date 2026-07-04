// tiny caching passthrough for the jikan api.
// - cached url -> served from disk instantly (works even when jikan is down)
// - new url    -> fetched from jikan, saved, then served
// retries 429 / 5xx a few times so a flaky jikan still fills the cache.
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const PORT = 3002;
const JIKAN = "https://api.jikan.moe";
const CACHE_DIR = join(import.meta.dirname, ".jikan-cache");
mkdirSync(CACHE_DIR, { recursive: true });

const fileFor = (url) =>
  join(CACHE_DIR, createHash("sha1").update(url).digest("hex") + ".json");

async function fetchJikan(url, retries = 3) {
  const r = await fetch(url);
  if ((r.status === 429 || r.status >= 500) && retries > 0) {
    await new Promise((s) => setTimeout(s, 1500)); // wait then retry
    return fetchJikan(url, retries - 1);
  }
  if (!r.ok) throw new Error(`jikan ${r.status}`);
  return r.text();
}

createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const file = fileFor(req.url);

  // cached -> serve from disk
  if (existsSync(file)) {
    console.log("hit ", req.url);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(readFileSync(file));
    return;
  }

  // new -> fetch, save, serve
  try {
    const body = await fetchJikan(JIKAN + req.url);
    writeFileSync(file, body);
    console.log("save", req.url);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(body);
  } catch (err) {
    console.log("fail", req.url, err.message);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
}).listen(PORT, () => console.log(`jikan cache -> http://localhost:${PORT}`));
