"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, ExternalLink, ArrowRight } from "lucide-react";
import { usePexelsPhotos } from "@/hooks/usePexelsPhotos";
import { PexelsPhoto } from "@/lib/pexels";

const PLACEHOLDER_PHOTOS: Partial<PexelsPhoto>[] = [
  {
    id: 5531421,
    src: {
      large: "https://images.pexels.com/photos/5531421/pexels-photo-5531421.jpeg?auto=compress&cs=tinysrgb&w=800",
      medium: "https://images.pexels.com/photos/5531421/pexels-photo-5531421.jpeg?auto=compress&cs=tinysrgb&w=500",
    } as PexelsPhoto["src"],
    alt: "Architecture & geometry photography by Akshay Kumar",
    url: "https://www.pexels.com/photo/5531421/",
  },
  {
    id: 5156157,
    src: {
      large: "https://images.pexels.com/photos/5156157/pexels-photo-5156157.jpeg?auto=compress&cs=tinysrgb&w=800",
      medium: "https://images.pexels.com/photos/5156157/pexels-photo-5156157.jpeg?auto=compress&cs=tinysrgb&w=500",
    } as PexelsPhoto["src"],
    alt: "Street & documentary photography by Akshay Kumar",
    url: "https://www.pexels.com/photo/5156157/",
  },
  {
    id: 5156156,
    src: {
      large: "https://images.pexels.com/photos/5156156/pexels-photo-5156156.jpeg?auto=compress&cs=tinysrgb&w=800",
      medium: "https://images.pexels.com/photos/5156156/pexels-photo-5156156.jpeg?auto=compress&cs=tinysrgb&w=500",
    } as PexelsPhoto["src"],
    alt: "Atmospheric landscape photography by Akshay Kumar",
    url: "https://www.pexels.com/photo/5156156/",
  },
  {
    id: 9257002,
    src: {
      large: "https://images.pexels.com/photos/9257002/pexels-photo-9257002.jpeg?auto=compress&cs=tinysrgb&w=800",
      medium: "https://images.pexels.com/photos/9257002/pexels-photo-9257002.jpeg?auto=compress&cs=tinysrgb&w=500",
    } as PexelsPhoto["src"],
    alt: "Urban light & shadow photography by Akshay Kumar",
    url: "https://www.pexels.com/photo/9257002/",
  },
];

export const PersonalGallery = () => {
  const { photos: apiPhotos, loading, views } = usePexelsPhotos();
  const photos = apiPhotos.length >= 4 ? apiPhotos.slice(0, 4) : (PLACEHOLDER_PHOTOS as PexelsPhoto[]);

  return (
    <section id="photography" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="section-label mb-3">04 · Personal Dimension &amp; Life</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Photography &amp; Creative Practice
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl">
            A quiet visual practice exploring architectural symmetry, urban light, and documentary moments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-code text-zinc-600 dark:text-zinc-300">
            {loading ? "Loading…" : (
              <>
                <strong className="text-sky-600 dark:text-sky-400 font-semibold">{views}</strong> verified views on Pexels
              </>
            )}
          </span>
          <Link
            href="/life"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            <span>Essays &amp; Journal</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 4 Curated Photo Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, idx) => {
          const imgSrc = photo.src?.large ?? photo.src?.medium ?? "";
          const pexelsUrl = photo.url ?? "https://www.pexels.com/@akbknight/gallery/";

          return (
            <a
              key={photo.id ?? idx}
              href={pexelsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${photo.alt ?? "photograph"} on Pexels`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-900 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Image
                src={imgSrc}
                alt={photo.alt ?? "Photography by Akshay Kumar"}
                fill
                className="object-cover transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[10px] font-mono-code text-white flex items-center gap-1">
                  <span>Pexels</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
