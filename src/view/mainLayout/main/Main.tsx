import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from "~store/store";

import { Footer } from '~view/mainLayout/footer/Footer';
import { Header } from '~view/mainLayout/header/Header';
import { OnlineStatusContext } from '~utils/NetworkStatusProvider';
import Portal from '~atoms/portal/Portal';
import RootModal from '~modals/RootModal';
import { OfflineMessage } from '~molecules/offlineMessage/OfflineMessage';

import styles from './Main.module.scss';
import { getMovies } from "~slices/movies";
import { getPlaylist } from "~slices/playlist";
import {useLoggedIn} from "~slices/auth";

const Main: React.FC = () => {
	const dispatch = useAppDispatch();
	const loggedIn = useLoggedIn()
	const online = useContext(OnlineStatusContext);
	const [showOfflineMessage, setShowOfflineMessage] = useState(!online);

	const closeOfflineMessage = () => setShowOfflineMessage(false);

	useEffect(() => {
		dispatch(getMovies());

		if (loggedIn) {
			dispatch(getPlaylist());
		}
	}, [])

	useEffect(() => {
		setShowOfflineMessage(!online);
	}, [online]);

	return (
		<div className={styles.mainWrapper}>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
			<Portal display={showOfflineMessage} onWrapperClick={closeOfflineMessage}>
				<OfflineMessage onOkClick={closeOfflineMessage} />
			</Portal>
			<RootModal />
		</div>
	);
};

export default Main;
