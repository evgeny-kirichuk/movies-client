import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '~atoms/button/Button';

import styles from './Login.module.scss';

export const LoginButton: React.FC = () => {
	const { t } = useTranslation('content');
	const navigate = useNavigate();
	const location = useLocation();

	const openLogin = () => {
		navigate({
			pathname: location.pathname,
			search: '?login=true',
		});
	};

	return (
		<Button className={styles.loginButton} onClick={openLogin}>
			{t('login')}
		</Button>
	);
};
