import Image from "next/image";

const LandScapeCard = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-start">
      <div className="w-[200px] sm:w-[220px] md:w-[280px] lg:w-[300px] xl:w-[320px] 2xl:w-[450px] relative aspect-video overflow-hidden rounded-md mb-3 shadow-lg">
        {/* Play button container */}
        <div
          className="z-[4] transition-all rounded-md  duration-[250ms] ease-in-out absolute top-0 left-0 
        w-full h-full flex justify-center items-center bg-black/30 opacity-0 hover:opacity-100
        hover:border-2 hover:border-primary hover:bg-black/70 cursor-pointer"
        >
          <Image src="/img/playicon.png" alt="play" width={40} height={40} />
        </div>

        {/* Image */}
        <Image
          src="https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F8797b4be-a984-40ed-ab65-7f58cc1fd8ab%2F_Plex_1920x1080__Christmas_About_Image.jpg"
          alt="backdrop"
          layout="fill"
          objectFit="cover"
          className="z-[3]"
        />
      </div>

      {/* Title and description */}
      <h1 className="text-white font-semibold pl-3">Apartment 212</h1>
      <p className="pl-3">Today at 8:15AM</p>
    </div>
  );
};

export default LandScapeCard;
