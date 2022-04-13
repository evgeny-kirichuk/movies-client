import React, {useEffect, useMemo} from 'react';
import cn from 'classnames';
import { Loader } from "~atoms/loader/Loader";
import Skeleton from './Skeleton';
import MovieBanner from '~molecules/movieBanner/MovieBanner';
import Movie from "~molecules/movie/Movie";
import styles from './Movies.module.scss'
import { useTheme } from "~theme";
import {
	useAllMovies,
	useAllNormalizedMovies,
	useRandomMovie,
	useMoviesLoading,
	setActiveMovie,
} from "~slices/movies";

const Movies: React.FC = () => {
	const [currentTheme] = useTheme();

	const movies = useAllMovies();
	const normalizedMovies = useAllNormalizedMovies();
	const loading = useMoviesLoading();

	const randomIndex = Number((Math.random() * (movies.length - 0)).toFixed(0))
	const randomMovie = useRandomMovie(randomIndex);
	const movieForBanner = useMemo(() => randomMovie, [movies]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);


	return (
		<div className={styles.wrapper}>
			{
				loading === 'fulfilled'
					? <MovieBanner onInfoClick={setActiveMovie} movie={movieForBanner}/>
					: <Loader />
			}
			<div className={styles.moviesWrapper}>
				<div className={styles.moviesUp}>
					{
						loading === 'fulfilled'
						 ? Object.keys(normalizedMovies).map((genre, i) => (
								<div
										className={styles.category}
										key={genre}
								>
									<span className={cn(styles.genreTitle, {[styles.light]: i === 0 && currentTheme === 'light'})}>
										{genre}
									</span>
									<div
										className={styles.movies}
									>
										{normalizedMovies[genre].map(movie => (
											<Movie
												onClick={setActiveMovie}
												key={movie.title}
												movie={movie}
											/>
										))}
									</div>
								</div>
						)) : <Skeleton />
					}
				</div>
			</div>
		</div>
	);
}

export default Movies;
