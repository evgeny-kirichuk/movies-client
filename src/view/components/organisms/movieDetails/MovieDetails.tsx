import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useLoggedIn } from '~slices/auth/selectors';
import { Loader } from '~atoms/loader/Loader';
import { PlusIcon } from '~icons/PlusIcon';
import Portal from '~atoms/portal/Portal';
import Button from '~atoms/button/Button';
import VolumeButton from '~atoms/VolumeButton/VolumeButton';
import {
	addToPlaylist,
	deleteFromPlaylist,
	useIsMovieInList,
} from '~slices/playlist';
import { resetActiveMovie, useActiveMovie } from '~slices/movies';
import { useAppDispatch } from '~store/store';
import { isIOS } from '~utils/isIOS';

import styles from './MovieDetails.module.scss';

export const MovieDetails: React.FC = () => {
	const { t } = useTranslation('content');
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();
	const activeMovie = useActiveMovie();
	const inList = useIsMovieInList(activeMovie?._id || '');
	const [muted, setMuted] = useState(isIOS());
	const releaseDate = new Date(activeMovie?.releaseDate || '');
	const releaseYear = releaseDate.getFullYear();

	const listHandler = () => {
		if (isLoggedIn) {
			if (inList) {
				dispatch(deleteFromPlaylist(activeMovie?._id || ''));
			} else {
				dispatch(addToPlaylist(activeMovie?._id || ''));
			}
		} else {
			navigate({
				pathname: location.pathname,
				search: `?login=true&toQuery=movieId=${activeMovie?._id}`,
			});
		}
	};

	const resetActiveMovieHandler = () => {
		dispatch(resetActiveMovie());
		navigate({
			pathname: location.pathname,
			search: '',
		});
	};

	return (
		<Portal display={!!activeMovie} onWrapperClick={resetActiveMovieHandler}>
			<div className={styles.wrapper}>
				<div className={styles.videoWrapper}>
					<Loader
						delay={300}
						style={{
							position: 'absolute',
							top: 0,
							width: '100%',
							height: '100%',
							zIndex: 1,
						}}
					/>
					<Button
						onClick={resetActiveMovieHandler}
						className={styles.closeButton}
					>
						<PlusIcon />
					</Button>
					<video playsInline loop width="100%" muted={muted} autoPlay>
						<source src={activeMovie?.trailerLink} type="video/mp4" />
						<track default kind="captions" />
						Your browser does not support the video tag.
					</video>
					<div className={styles.overlay}>
						<div className={styles.shortDetails}>
							<span className={styles.title}>{activeMovie?.title}</span>
							<span className={styles.description}>
								{`${activeMovie?.genre}, ${releaseYear}`}
							</span>
						</div>
						<div className={styles.volumeButtonContainer}>
							<VolumeButton onClick={() => setMuted(!muted)} muted={muted} />
						</div>
					</div>
				</div>
				<div className={styles.details}>
					<span>{activeMovie?.description}</span>
				</div>
				<div className={styles.controls}>
					<Button onClick={listHandler} className={styles.addButton}>
						{`${inList ? 'Remove from' : 'Add to'} My list`}
					</Button>
				</div>
			</div>
		</Portal>
	);
};
