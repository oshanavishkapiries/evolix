import React from "react";
import OptimizedImage from "../OptimizedImage";

interface ICastCard {
  imageUrl: string;
  title: string;
  description: string;
}

const CastCard = ({ imageUrl, title, description }: ICastCard) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <div className="w-[100px] sm:w-[130px] md:w-[150px] lg:w-[170px] xl:w-[190px] 2xl:w-[200px] relative aspect-square overflow-hidden rounded-full mb-3 shadow-lg">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="objet-cover w-full h-full object-center"
          width={500}
          height={500}
        />
      </div>
      {/* Title and description */}
      <h1 className="text-white font-semibold pl-3">{title}</h1>
      <p className="pl-3 text-white/75">{description}</p>
    </div>
  );
};

export default CastCard;
