import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';
import { IncludedItem, JsonApiData, MovieApiResponse, MovieContentNode } from '../interfaces/MovieResponseInterface';
const USE_SECURE_API = import.meta.env.VITE_USE_SECURE_API;
const API_URL = USE_SECURE_API === 'TRUE' ? import.meta.env.VITE_API_SECURE_URL : import.meta.env.VITE_API_URL;

interface NormalizedMovie {
  title: string;
  id: string;
  poster: string | undefined;
  year: number;
  runtime: string;
  synopsis: string;
  director: string;
}

interface MovieContextType {
  movies: NormalizedMovie[] | undefined;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

type MovieProviderProps = {
  children: ReactNode;
};

const normalizeMovies = (data: JsonApiData<MovieContentNode>[], included: IncludedItem[]): NormalizedMovie[] => {
  // const movies: NormalizedMovie[] = [];
  console.log(import.meta.env);
  return data.map((item) => {
    const posterMedia: IncludedItem | undefined = included
      .filter(
        include => include.id === item.relationships.field_poster?.data.id
      )
      .shift();
    const posterFile = included
      .filter(
        include =>
          include.id === posterMedia?.relationships?.field_media_image?.data.id
      )
      .shift();

    return {
      title: item.attributes.title,
      id: item.id,
      poster: `${API_URL}/${posterFile?.attributes.uri?.url}`,
      year: item.attributes.field_year,
      runtime: item.attributes.field_running_time,
      synopsis: item.attributes.field_synopsis.processed,
      director: item.attributes.field_director,
    };
  });

  // return movies;
};

const fetchMovies = async (): Promise<MovieApiResponse | undefined> => {
  try {
    console.log('Fetching from', API_URL);
    const response = await fetch(`${API_URL}/api/node/movie?include=field_poster.field_media_image`);

    if (!response.ok) {
      throw new Error(`Network error! Response: ${response.status}`);
    }

    const data = await response.json();
    return data as MovieApiResponse;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const MovieProvider = ({ children }: MovieProviderProps) => {
  const { data, error, isLoading } = useQuery<MovieApiResponse | undefined>('movies', fetchMovies);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  const normalizedMovies = data ? normalizeMovies(data.data, data.included || []) : undefined;

  return (
    <MovieContext.Provider value={{ movies: normalizedMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
