import Image from "next/image";
import OptimizedImage from "../OptimizedImage";

interface LandScapeCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const LandScapeCard: React.FC<LandScapeCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-start">
      <div className="w-[200px] sm:w-[220px] md:w-[280px] lg:w-[300px] xl:w-[320px] 2xl:w-[450px] relative aspect-video overflow-hidden rounded-md mb-3 shadow-lg">
        {/* Play button container */}
        <div
          className="z-[4] transition-all rounded-md duration-[250ms] ease-in-out absolute top-0 left-0 
        w-full h-full flex justify-center items-center bg-black/30 opacity-0 hover:opacity-100
        hover:border-2 hover:border-primary hover:bg-black/70 cursor-pointer"
        >
          <Image src="/img/playicon.png" alt="Play" width={40} height={40} />
        </div>

        {/* Dynamic Image */}
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="z-[3]"
          width={1000}
          height={720}
        />
      </div>

      {/* Title and description */}
      <h1 className="text-white font-semibold pl-3">{title}</h1>
      <p className="pl-3">{description}</p>
    </div>
  );
};

export default LandScapeCard;
