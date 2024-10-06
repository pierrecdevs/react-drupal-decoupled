import { useMovies } from '../../contexts/MovieProvider'
import Movie from './Movie';

const MovieList = () => {
    const {movies} = useMovies();
    return (
        <>
            {movies && (
                <div className="movie-list">
                    {movies?.map(movie => (
                        <Movie 
                            key={movie.id}
                            director={movie.director}
                            poster={movie.poster}
                            runtime={movie.runtime}
                            synopsis={movie.synopsis}
                            title={movie.title}
                            year={movie.year}  />
                    ))}
                </div>
            )}
        </>
    )
}

export default MovieList