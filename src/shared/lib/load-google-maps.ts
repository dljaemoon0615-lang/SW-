let loadPromise: Promise<typeof google> | null = null;
let cachedKey: string | null = null;
let optionsSet = false;

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

async function getMapsLoader() {
  const { importLibrary, setOptions } = await import("@googlemaps/js-api-loader");
  return { importLibrary, setOptions };
}

export async function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  if (typeof window === "undefined") {
    throw new Error("Google Maps는 브라우저에서만 로드할 수 있습니다.");
  }

  if (window.google?.maps?.Map) {
    return window.google;
  }

  if (loadPromise && cachedKey === apiKey) {
    return loadPromise;
  }

  cachedKey = apiKey;
  loadPromise = (async () => {
    const { importLibrary, setOptions } = await getMapsLoader();
    if (!optionsSet) {
      setOptions({ key: apiKey, v: "weekly" });
      optionsSet = true;
    }
    await importLibrary("maps");
    if (!window.google?.maps?.Map) {
      throw new Error("Maps library loaded but google.maps.Map is unavailable.");
    }
    return window.google;
  })();

  try {
    return await loadPromise;
  } catch (error) {
    loadPromise = null;
    cachedKey = null;
    throw error;
  }
}
