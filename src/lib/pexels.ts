const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY ?? "";
const BASE = "https://api.pexels.com/v1";

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    portrait: string;
    landscape: string;
    small: string;
    tiny: string;
  };
  alt: string;
}

export interface PexelsCollection {
  id: string;
  title: string;
  description: string;
  media_count: number;
  photos_count: number;
}

async function pexelsFetch<T>(path: string): Promise<T | null> {
  if (!API_KEY || API_KEY === "PASTE_YOUR_KEY_HERE") return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Authorization: API_KEY },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json() as T;
  } catch {
    return null;
  }
}

export async function getMyCollections(): Promise<PexelsCollection[]> {
  const data = await pexelsFetch<{ collections: PexelsCollection[] }>(
    "/collections/?per_page=20"
  );
  return data?.collections ?? [];
}

export async function getCollectionPhotos(
  id: string,
  perPage = 30
): Promise<PexelsPhoto[]> {
  const data = await pexelsFetch<{ media: PexelsPhoto[] }>(
    `/collections/${id}/media?type=photos&per_page=${perPage}`
  );
  return data?.media ?? [];
}

export async function getPhotoById(id: number): Promise<PexelsPhoto | null> {
  return pexelsFetch<PexelsPhoto>(`/photos/${id}`);
}

export async function getPhotosByIds(ids: number[]): Promise<PexelsPhoto[]> {
  const results = await Promise.all(ids.map((id) => getPhotoById(id)));
  return results.filter((p): p is PexelsPhoto => p !== null);
}

export function isApiKeySet(): boolean {
  return !!API_KEY && API_KEY !== "PASTE_YOUR_KEY_HERE";
}
