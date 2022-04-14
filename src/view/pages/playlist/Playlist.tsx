import React, { useEffect } from 'react';

import { usePlaylist } from '~slices/playlist';
import styles from '~pages/playlist/Playlist.module.scss';
import Movie from '~molecules/movie/Movie';
import { setActiveMovie } from '~slices/movies';

const Playlist: React.FC = ({}) => {
	const movies = usePlaylist();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.wrapper}>
			<span className={styles.listTitle}>My List</span>
			<div className={styles.movies}>
				{movies.map((movie) => (
					<Movie onClick={setActiveMovie} key={movie.title} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default Playlist;
