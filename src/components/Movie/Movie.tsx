import PropTypes from 'prop-types';
import './Movie.css';

type MovieProps = {
    title: string;
    poster?: string;
    year: number;
    runtime: string;
    synopsis: string;
    director: string;
};

const Movie = ({title, poster, year, runtime, synopsis, director}: MovieProps) => {
  return (
    <div className="movie">
      <img src={poster} alt={`${title} poster`} className="movie__poster" />
      <h3>{title} ({year})</h3>
      <div dangerouslySetInnerHTML={{__html: synopsis}}></div>
      <div>
        <div><strong>Director: {director}</strong> </div>
        <div><strong>Runtime: {runtime}</strong></div>
      </div>
    </div>
  )
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  runtime: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
};

export default Movie;