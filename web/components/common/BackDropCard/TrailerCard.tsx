import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OptimizedImage from "../OptimizedImage";

interface TrailerCardProps {
  title: string;
  description: string;
  url?: string;
}

const TrailerCard: React.FC<TrailerCardProps> = ({
  title,
  description,
  url,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="flex flex-col justify-center items-start">
          <CardContent className="p-0 w-[210px] sm:w-[220px] md:w-[280px] lg:w-[300px] xl:w-[320px] 2xl:w-[450px] relative aspect-video overflow-hidden rounded-md shadow-lg group">
            {/* Play button container */}
            <div
              className="z-[4] transition-all rounded-md duration-[250ms] ease-in-out absolute top-0 left-0 
        w-full h-full flex justify-center items-center bg-black/30 opacity-0 hover:opacity-100
        hover:border-2 hover:border-primary hover:bg-black/70 cursor-pointer"
            >
              <Image
                src="/img/playicon.png"
                alt="Play"
                width={40}
                height={40}
              />
            </div>

            {/* Dynamic Image */}
            <OptimizedImage
              src={getYouTubeThumbnail(url || "")}
              alt={title}
              className="z-[3] object-cove transition-transform duration-300 group-hover:scale-105"
              width={1000}
              height={720}
            />
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="p-3 rounded-md shadow-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{title}</DialogTitle>
        </DialogHeader>
        {url ? (
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={url.replace("watch?v=", "embed/")}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </div>
        ) : (
          <p>Trailer not available</p>
        )}
        <p className="mt-4">{description}</p>
      </DialogContent>
    </Dialog>
  );
};

export default TrailerCard;
