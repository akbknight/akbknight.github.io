"use client";

import { useState, useEffect } from "react";
import { PexelsPhoto, getPhotosByIds, isApiKeySet } from "@/lib/pexels";
import { MY_PHOTO_IDS, PEXELS_STATS } from "@/data/my-photos";

export interface PexelsState {
  photos: PexelsPhoto[];
  loading: boolean;
  hasKey: boolean;
  views: string;
  totalPhotos: string;
}

export function usePexelsPhotos(): PexelsState {
  const [state, setState] = useState<PexelsState>({
    photos: [],
    loading: true,
    hasKey: false,
    views: PEXELS_STATS.views,
    totalPhotos: PEXELS_STATS.totalPhotos,
  });

  useEffect(() => {
    const hasKey = isApiKeySet();
    if (!hasKey) {
      setState((s) => ({ ...s, loading: false, hasKey: false }));
      return;
    }

    async function load() {
      setState((s) => ({ ...s, loading: true, hasKey: true }));
      try {
        // Fetch all @akbknight photos by their known IDs in parallel
        const photos = await getPhotosByIds(MY_PHOTO_IDS);
        setState({
          photos,
          loading: false,
          hasKey: true,
          views: PEXELS_STATS.views,
          totalPhotos: PEXELS_STATS.totalPhotos,
        });
      } catch {
        setState((s) => ({ ...s, loading: false }));
      }
    }

    load();
  }, []);

  return state;
}
