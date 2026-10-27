"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import YupooImage from "./YupooImage";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-sand">
        <YupooImage
          src={images[currentImageIndex]}
          alt={`${title} — image ${currentImageIndex + 1}`}
          width={1200}
          height={900}
          className="h-auto max-h-[70vh] w-full object-contain"
          priority={currentImageIndex === 0}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/90 p-2 text-ink shadow-sm transition hover:bg-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/90 p-2 text-ink shadow-sm transition hover:bg-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        <p className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] tracking-[0.14em] text-cream">
          {currentImageIndex + 1} / {images.length}
        </p>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={`overflow-hidden rounded-xl border-2 transition ${
                index === currentImageIndex
                  ? "border-clay"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <YupooImage
                src={image}
                alt=""
                width={140}
                height={140}
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
