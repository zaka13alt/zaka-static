// Base-aware service worker for static.html. importScripts resolves relative to
// this file's location, and routing uses the controller prefix (BASE + nZ970vr4/),
// so the whole thing works under any path the bundle is served from.
importScripts('stuff/LyzaHBeO/WBv0kYC0.js');

// URL blocklist (same keyword set as the main build). A proxied request whose
// real host/URL contains a blocked keyword gets a 403 page instead of loading.
var BLOCKED_KEYWORDS = ["pornhub","xvideos","xnxx","xhamster","redtube","youporn","tube8","spankbang","eporner","tnaflix","txxx","pornone","beeg","4tube","drtuber","brazzers","naughtyamerica","realitykings","bangbros","mofos","babes.com","onlyfans","fansly","chaturbate","livejasmin","myfreecams","cam4","stripchat","bongacams","streamate","jerkmate","camsoda","sexier","imlive","porn","xxx","hentai","nsfw","nude","nudes","naked","erotic","fetish","milf","camgirl","sexcam","liveshow","escort","callgirl","yapchat","yap.chat"];

function isBlocked(host, fullUrl) {
  return BLOCKED_KEYWORDS.some(function (k) { return host.includes(k) || fullUrl.includes(k); });
}

function zkDec(s) {
  if (!s) return s;
  var k = [122, 107, 51, 57, 49, 51, 120, 111, 114], n = s.length >> 1, b = new Uint8Array(n);
  for (var i = 0; i < n; i++) { b[i] = parseInt(s.substr(i * 2, 2), 16) ^ k[i % k.length]; }
  try { return new TextDecoder().decode(b); } catch (e) { return s; }
}

function blockedResponse() {
  return new Response(
    '<!doctype html><html lang="en"><meta charset="UTF-8"><meta content="width=device-width,initial-scale=1" name="viewport"><title>bro...</title><style>body{background-color:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif}h1{color:#fff;margin:0;font-size:2rem}</style><h1>gooner detected bro get a life and touch some grass and if you go to my school deadass i might tell the teacher but idk...</h1>',
    { status: 403, headers: { "Content-Type": "text/html; charset=utf-8", "Cross-Origin-Embedder-Policy": "require-corp" } }
  );
}

function handleRequest(event) {
  // The proxied path is <BASE>nZ970vr4/<frameid>/<frameid>/<encoded real url>.
  // Match the nZ970vr4 segment anywhere so this works under any base path.
  try {
    var m = new URL(event.request.url).pathname.match(/\/nZ970vr4\/[a-z0-9]+\/[a-z0-9]+\/(.*)$/i);
    if (m) {
      var p = new URL(zkDec(m[1]));
      if (isBlocked(p.hostname, p.href)) return blockedResponse();
    }
  } catch (e) { /* not a decodable proxied url; let it through */ }
  return $K5qkWTpAController.route(event);
}

addEventListener('fetch', (event) => {
  if ($K5qkWTpAController.shouldRoute(event)) {
    event.respondWith(handleRequest(event));
  }
});
