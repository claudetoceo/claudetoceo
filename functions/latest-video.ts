/**
 * Cloudflare Pages Function — /latest-video
 *
 * Proxies YouTube's public RSS feed to return the latest video
 * for the HaxDogma channel. No API key required.
 * Response is cached at the CDN edge for 1 hour.
 */

const CHANNEL_ID = "UCYbL_cXsaxKSvbqq8SIesVw";
const RSS_URL    = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export async function onRequestGet(): Promise<Response> {
  let xml: string;
  try {
    const res = await fetch(RSS_URL, {
      headers: { "User-Agent": "claudetoceo.com/1.0" },
    });
    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
    xml = await res.text();
  } catch (err) {
    return Response.json({ error: "Could not fetch feed." }, { status: 502 });
  }

  // Extract first <entry> block
  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
  if (!entryMatch) {
    return Response.json({ error: "No videos found." }, { status: 404 });
  }
  const entry = entryMatch[1];

  const videoId    = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ?? [])[1] ?? "";
  const title      = (entry.match(/<title>([^<]+)<\/title>/)            ?? [])[1] ?? "";
  const published  = (entry.match(/<published>([^<]+)<\/published>/)    ?? [])[1] ?? "";
  const thumbnail  = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (!videoId) {
    return Response.json({ error: "Could not parse video ID." }, { status: 500 });
  }

  return Response.json(
    { videoId, title: decodeXml(title), published, thumbnail },
    {
      headers: {
        "Content-Type":                "application/json",
        "Cache-Control":               "public, max-age=3600, s-maxage=3600",
        "Access-Control-Allow-Origin": "https://claudetoceo.com",
      },
    }
  );
}

function decodeXml(str: string): string {
  return str
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'");
}
