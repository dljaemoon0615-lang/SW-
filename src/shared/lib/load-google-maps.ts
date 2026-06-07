import { Loader } from "@googlemaps/js-api-loader";

let loaderPromise: Promise<typeof google> | null = null;
let cachedKey: string | null = null;

export async function fetchGoogleMapsApiKey(): Promise<string | null> {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  if (fromEnv) return fromEnv;

  try {
    const res = await fetch("/api/config/google-maps");
    if (!res.ok) return null;
    const json = (await res.json()) as { apiKey?: string | null };
    return json.apiKey?.trim() || null;
  } catch {
    return null;
  }
}

export async function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  if (loaderPromise && cachedKey === apiKey) {
    return loaderPromise;
  }

  cachedKey = apiKey;
  const loader = new Loader({
    apiKey,
    version: "weekly",
  });
  loaderPromise = loader.load();
  return loaderPromise;
}
