import React from 'react';

import { ThemeSwitch } from '~molecules/themeSwitch/ThemeSwitch';
import { useLoggedIn } from '~slices/auth/selectors';
import { Navigation } from '~organisms/navigation/Navigation';
import { LoginButton } from '~organisms/login/LoginButton';
import { SignUpButton } from '~organisms/signUp/SignUpButton';
import { Logout } from '~organisms/logout/Logout';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
	const isLoggedIn = useLoggedIn();

	return (
		<header className={styles.headerWrapper}>
			<div className={styles.headerItems}>
				<a className={styles.logoLink} href=".">
					<span className={styles.y}>Y</span>
					<span className={styles.js}>JS</span>
				</a>
				<Navigation />
				{isLoggedIn ? (
					<Logout />
				) : (
					<>
						<SignUpButton />
						<LoginButton />
					</>
				)}
				<ThemeSwitch className={styles.switchStyle} />
			</div>
		</header>
	);
};
