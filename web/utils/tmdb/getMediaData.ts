const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const fetchFromTMDB = async (endpoint: string, params: any = {}, fallback = false) => {
  try {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    const queryParams = {
      api_key: API_KEY,
      language: fallback ? undefined : "en-US",
      ...params,
    };

 
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] !== undefined) {
        url.searchParams.append(key, queryParams[key]);
      }
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error fetching from TMDB: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
};

export const getMediaData = async (
  id: number,
  type: 'movie' | 'tv',
  isAllPoster: boolean,
  isAllBackdrop: boolean,
  isAllTrailers: boolean,
  isAllActorsList: boolean
) => {
  try {
    let mediaDetails = await fetchFromTMDB(`/${type}/${id}`);
    if (!mediaDetails || Object.keys(mediaDetails).length === 0) {
      mediaDetails = await fetchFromTMDB(`/${type}/${id}`, {}, true);
    }

    const mediaData: any = {
      details: mediaDetails,
      posters: [],
      backdrops: [],
      trailers: [],
      actors: [],
    };

    if (isAllPoster || isAllBackdrop) {
      let imagesData = await fetchFromTMDB(`/${type}/${id}/images`);
      if ((!imagesData.posters || imagesData.posters.length === 0) && 
          (!imagesData.backdrops || imagesData.backdrops.length === 0)) {
        imagesData = await fetchFromTMDB(`/${type}/${id}/images`, {}, true);
      }

      if (isAllPoster) {
        mediaData.posters = imagesData.posters.map((poster: any) => ({
          url: `${IMAGE_BASE_URL}${poster.file_path}`,
        }));
      }
      if (isAllBackdrop) {
        mediaData.backdrops = imagesData.backdrops.map((backdrop: any) => ({
          url: `${IMAGE_BASE_URL}${backdrop.file_path}`,
        }));
      }
    }

    if (isAllTrailers) {
      let videosData = await fetchFromTMDB(`/${type}/${id}/videos`);
      if (!videosData.results || videosData.results.length === 0) {
        videosData = await fetchFromTMDB(`/${type}/${id}/videos`, {}, true);
      }
      const trailers = videosData.results
        .filter((video: any) => video.type === "Trailer")
        .map((trailer: any) => ({
          name: trailer.name,
          url: `https://www.youtube.com/watch?v=${trailer.key}`,
        }));
      mediaData.trailers = trailers;
    }

    if (isAllActorsList) {
      let creditsData = await fetchFromTMDB(`/${type}/${id}/credits`);
      if (!creditsData.cast || creditsData.cast.length === 0) {
        creditsData = await fetchFromTMDB(`/${type}/${id}/credits`, {}, true);
      }
      mediaData.actors = creditsData.cast.map((actor: any) => ({
        name: actor.name,
        character: actor.character,
        profileUrl: actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : null,
      }));
    }

    return mediaData;
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
    throw error;
  }
};
