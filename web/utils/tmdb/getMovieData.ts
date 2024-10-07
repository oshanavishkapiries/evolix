import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const fetchFromTMDB = async (endpoint: string, params: any = {}, fallback = false) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: fallback ? undefined : "en-US",
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
};

export const getMovieData = async (
  movie_id: number,
  isAllPoster: boolean,
  isAllBackdrop: boolean,
  isAllTrailers: boolean,
  isAllActorsList: boolean
) => {
  try {
    let movieDetails = await fetchFromTMDB(`/movie/${movie_id}`);
    if (!movieDetails || Object.keys(movieDetails).length === 0) {
      movieDetails = await fetchFromTMDB(`/movie/${movie_id}`, {}, true);
    }

    const movieData: any = {
      details: movieDetails,
      posters: [],
      backdrops: [],
      trailers: [],
      actors: [],
    };

    if (isAllPoster || isAllBackdrop) {
      let imagesData = await fetchFromTMDB(`/movie/${movie_id}/images`);
      if ((!imagesData.posters || imagesData.posters.length === 0) && 
          (!imagesData.backdrops || imagesData.backdrops.length === 0)) {
        imagesData = await fetchFromTMDB(`/movie/${movie_id}/images`, {}, true);
      }

      if (isAllPoster) {
        movieData.posters = imagesData.posters.map((poster: any) => ({
          url: `${IMAGE_BASE_URL}${poster.file_path}`,
        }));
      }
      if (isAllBackdrop) {
        movieData.backdrops = imagesData.backdrops.map((backdrop: any) => ({
          url: `${IMAGE_BASE_URL}${backdrop.file_path}`,
        }));
      }
    }

    if (isAllTrailers) {
      let videosData = await fetchFromTMDB(`/movie/${movie_id}/videos`);
      if (!videosData.results || videosData.results.length === 0) {
        videosData = await fetchFromTMDB(`/movie/${movie_id}/videos`, {}, true);
      }
      const trailers = videosData.results
        .filter((video: any) => video.type === "Trailer")
        .map((trailer: any) => ({
          name: trailer.name,
          url: `https://www.youtube.com/watch?v=${trailer.key}`,
        }));
      movieData.trailers = trailers;
    }

    if (isAllActorsList) {
      let creditsData = await fetchFromTMDB(`/movie/${movie_id}/credits`);
      if (!creditsData.cast || creditsData.cast.length === 0) {
        creditsData = await fetchFromTMDB(`/movie/${movie_id}/credits`, {}, true);
      }
      movieData.actors = creditsData.cast.map((actor: any) => ({
        name: actor.name,
        character: actor.character,
        profileUrl: actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : null,
      }));
    }

    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};
