import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '~store/store';
import Button from '~atoms/button/Button';
import { resetPlaylist } from '~slices/playlist';
import { logout } from '~slices/auth';

import styles from './Logout.module.scss';

export const Logout: React.FC = () => {
	const { t } = useTranslation('content');
	const dispatch = useAppDispatch();

	const onLogoutClick = () => {
		dispatch(logout());
		dispatch(resetPlaylist());
	};

	return (
		<Button className={styles.logoutButton} onClick={onLogoutClick}>
			Logout
		</Button>
	);
};
