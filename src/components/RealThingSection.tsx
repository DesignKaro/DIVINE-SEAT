"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "sanctuary-living",
    title: "Sanctuary Living",
    subtitle: "Organic forms blending seamlessly into architectural spaces",
    image: "/images/gallery/01.png",
  },
  {
    id: "cork-foundation",
    title: "Sculptural Cork Foundation",
    subtitle: "High-density renewable cork carved for grounded stability",
    image: "/images/gallery/02.png",
  },
  {
    id: "linen-cushion",
    title: "Organic Linen Cushion",
    subtitle: "Breathable botanical textile with precision contour tailoring",
    image: "/images/gallery/03.png",
  },
  {
    id: "mindful-presence",
    title: "Daily Practice Altar",
    subtitle: "A dedicated seat that invites stillness and effortless posture",
    image: "/images/gallery/04.png",
  },
];

export default function RealThingSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollDistance = container.offsetWidth > 768 ? 400 : 310;
      container.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
      setTimeout(updateScrollState, 350);
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollDistance = container.offsetWidth > 768 ? 400 : 310;
      container.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
      setTimeout(updateScrollState, 350);
    }
  };

  return (
    <section
      id="real-thing"
      data-header-theme="dark"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 overflow-hidden flex flex-col items-center justify-center min-h-[580px] lg:min-h-[660px]"
    >
      {/* Background Lifestyle Image with Light Clean Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/real-thing-bg-v2.png"
          alt="A closer look at the real thing background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center brightness-[0.96] contrast-[1.02]"
        />
        {/* Soft, gentle dark tint for high clarity & natural warmth */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/35" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-[820px] mx-auto mb-8 sm:mb-10 lg:mb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
          >
            <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.2em] uppercase text-[#D8CCBD]/90">
              /SANCTUARY GALLERY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="font-display font-normal text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.06] tracking-[-0.015em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          >
            A closer look at the real thing
          </motion.h2>
        </div>

        {/* Horizontal Card Showcase Grid / Carousel */}
        <div className="w-full relative px-2 sm:px-4">
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollState}
            className="flex gap-5 sm:gap-6 lg:gap-7 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="shrink-0 w-[290px] sm:w-[350px] lg:w-[390px] snap-start"
              >
                {/* White Frame Card with Smooth Rounded Corners */}
                <div className="bg-white p-2.5 sm:p-3 rounded-[20px] sm:rounded-[24px] shadow-2xl transition-transform duration-400 hover:scale-[1.015]">
                  
                  {/* Photo with natural aspect ratio and rounded corners */}
                  <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#E2DCD2]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 290px, (max-width: 1200px) 350px, 390px"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Caption & Title on White Bottom Panel */}
                  <div className="pt-3.5 pb-2.5 px-3">
                    <h3 className="font-sans font-bold text-[15px] sm:text-[16.5px] text-[#1E140D] tracking-[-0.01em]">
                      {item.title}
                    </h3>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel Bottom Circular Controls (‹ ›) (Non-Infinite, Reactive, Borderless) */}
        <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12">
          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Previous image"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1E140D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-white/20 disabled:hover:text-white"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Next image"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1E140D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-white/20 disabled:hover:text-white"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

      </div>
    </section>
  );
}
