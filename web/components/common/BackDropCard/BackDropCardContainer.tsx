"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";

const BackDropCardContainer = ({ title, description, children }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const windowWidth = useWindowWidth();

  let cardWidth = 200;
  let visibleCards = 2;

  if (windowWidth >= 1536) {
    cardWidth = 400;
    visibleCards = 6;
  } else if (windowWidth >= 1280) {
    cardWidth = 320;
    visibleCards = 5;
  } else if (windowWidth >= 1024) {
    cardWidth = 300;
    visibleCards = 4;
  } else if (windowWidth >= 768) {
    cardWidth = 280;
    visibleCards = 3;
  } else if (windowWidth >= 640) {
    cardWidth = 220;
    visibleCards = 2;
  }

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -(cardWidth * visibleCards),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: cardWidth * visibleCards,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-auto p-4">
      {/* Title Container */}
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-2xl">{title}</h1>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            className={`px-1 bg-transparent hover:bg-transparent text-white/75 hover:text-primary ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft />
          </Button>
          <Button
            className={`px-1 bg-transparent hover:bg-transparent text-white/75 hover:text-primary ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      {/* Card Set */}
      <div className="w-full h-auto">
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="w-full h-auto flex flex-row overflow-x-auto no-scrollbar gap-6"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackDropCardContainer;
