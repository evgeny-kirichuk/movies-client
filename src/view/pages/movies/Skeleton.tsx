import React from 'react';

import styles from '~pages/movies/Movies.module.scss';
import { Loader } from '~atoms/loader/Loader';

const Skeleton = () => {
	return (
		<div className={styles.category}>
			<Loader style={{ height: 30, width: 300 }} />
			<div className={styles.movies}>
				<Loader style={{ height: 170 }} />
				<Loader style={{ height: 170 }} />
				<Loader style={{ height: 170 }} />
				<Loader style={{ height: 170 }} />
				<Loader style={{ height: 170 }} />
				<Loader style={{ height: 170 }} />
			</div>
		</div>
	);
};

export default Skeleton;
