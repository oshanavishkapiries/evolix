"use client";
import { useEffect, useState } from "react";
import BackDropCardContainer from "@/components/common/BackDropCard/BackDropCardContainer";
import LandScapeCard from "@/components/common/BackDropCard/LandScapeCard";
import PortalCard from "@/components/common/BackDropCard/PortalCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

interface Backdrop {
  file_path: string;
  iso_639_1: string | null;
}

const YourComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviesWithEnglishBackdrops = async () => {
      const API_KEY = "1cf50e6248dc270629e802686245c2c8";
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      const moviesWithEnglishBackdrops = await Promise.all(
        data.results.map(async (movie: Movie) => {
          const backdropRes = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${API_KEY}`
          );
          const backdropData = await backdropRes.json();
          const englishBackdrop = backdropData.backdrops.find(
            (backdrop: Backdrop) => backdrop.iso_639_1 === "en"
          );
          return {
            ...movie,
            backdrop_path: englishBackdrop
              ? englishBackdrop.file_path
              : movie.backdrop_path,
          };
        })
      );
      setMovies(moviesWithEnglishBackdrops);
    };

    fetchMoviesWithEnglishBackdrops();
  }, []);

  return (
    <>
      <BackDropCardContainer
        title="What's On Now"
        description="Now Playing (English Backdrops)"
      >
        {movies.length > 0 &&
          movies
            .slice(0, 12)
            .map((movie) => (
              <LandScapeCard
                key={movie.id}
                imageUrl={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                title={movie.title}
                description={movie.release_date?.slice(0, 4)}
                linkUrl={`/movie/${movie.id}`}
              />
            ))}
      </BackDropCardContainer>
      <BackDropCardContainer title="Popular Movies" description="on evolix">
        {movies.length > 0 &&
          movies
            .slice(0, 12)
            .map((movie) => (
              <PortalCard
                key={movie.id}
                imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                title={movie.title}
                description={movie.release_date?.slice(0, 4)}
                linkUrl={`/movie/${movie.id}`}
              />
            ))}
      </BackDropCardContainer>
    </>
  );
};

export default YourComponent;
