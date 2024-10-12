"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BackDropCardContainer = ({ title, description, children }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  useEffect(() => {
    updateScrollButtons();
  }, [children]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by a percentage of the viewable area (e.g., 50% of the visible width)
      scrollRef.current.scrollBy({
        left: -(clientWidth * 0.5),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by a percentage of the viewable area (e.g., 50% of the visible width)
      scrollRef.current.scrollBy({
        left: clientWidth * 0.5,
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
