"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlayCircle, Plus } from "lucide-react";
import { getMediaData } from "@/utils/tmdb/getMediaData";
import Loader from "@/components/common/Loader";
import OptimizedImage from "@/components/common/OptimizedImage";
import BackDropCardContainer from "@/components/common/BackDropCard/BackDropCardContainer";
import CastCard from "@/components/common/BackDropCard/CastCard";
import TrailerCard from "@/components/common/BackDropCard/TrailerCard";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [mediaData, setMediaData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMediaData(
          Number(id),
          type as "movie" | "tv",
          false,
          false,
          true,
          true
        );
        setMediaData(data);
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchData();
  }, [id, type]);

  if (!mediaData) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loader className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary" />
      </div>
    );
  }

  const { details, actors, trailers } = mediaData;
  console.log(mediaData);

  return (
    <div className="">
      <div className="p-3">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] 2xl:w-[250px]">
            <OptimizedImage
              src={
                `https://image.tmdb.org/t/p/w500${details.poster_path}` || ""
              }
              alt={`${details.title || details.name} Poster`}
              width={1000}
              height={720}
              className="rounded-lg shadow-lg aspect-[2/3] overflow-hidden"
            />
          </div>
          <div className="-full space-y-4">
            <h1 className="text-4xl font-bold">
              {details.title || details.name}
            </h1>
            <p className="text-zinc-400">
              {details.directors
                ? `Directed by ${details.directors.join(", ")}`
                : ""}
            </p>
            <p className="text-primary">
              {details.release_date || details.first_air_date} •{" "}
              {details.runtime || details.episode_run_time?.[0]} min •{" "}
              {details.adult ? "R" : "PG-13"}
            </p>
            <p className="text-zinc-400">
              {details.genres.map((genre: any) => genre.name).join(", ")}
            </p>

            <div className="flex space-x-4 mt-4">
              <Button className="bg-primary">
                <PlayCircle className="mr-2 h-4 w-4" /> Play
              </Button>
              <Button
                variant="outline"
                className="bg-zinc-800 hover:bg-zinc-700"
              >
                <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
              </Button>
            </div>

            <p className="text-sm max-w-3xl">{details.overview}</p>
          </div>
        </div>

        <BackDropCardContainer title="Cast & Crew" description="">
          {actors.length > 0 &&
            actors
              .filter((actor: any) => actor.profileUrl)
              .slice(0, 10)
              .map((actor: any) => (
                <CastCard
                  key={actor.id}
                  imageUrl={actor.profileUrl || ""}
                  title={actor.name}
                  description={actor.character}
                />
              ))}
        </BackDropCardContainer>

        <BackDropCardContainer title="Trailers" description="">
          {trailers.length > 0 &&
            trailers
              .slice(0, 6)
              .map((trailer: any, index: number) => (
                <TrailerCard
                  key={index}
                  title={trailer.name}
                  url={trailer.url}
                  description={""}
                />
              ))}
        </BackDropCardContainer>
      </div>
    </div>
  );
};

export default DetailsPage;
