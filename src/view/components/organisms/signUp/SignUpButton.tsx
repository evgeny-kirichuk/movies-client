import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '~atoms/button/Button';

import styles from './SignUp.module.scss';

export const SignUpButton: React.FC = () => {
	const { t } = useTranslation('content');
	const navigate = useNavigate();
	const location = useLocation();

	const openSignup = () => {
		navigate({
			pathname: location.pathname,
			search: '?signup=true',
		});
	};

	return (
		<Button className={styles.loginButton} onClick={openSignup}>
			{t('sign_in')}
		</Button>
	);
};
