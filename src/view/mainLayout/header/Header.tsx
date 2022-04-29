import React, { useEffect, useRef, useState } from 'react';

import { ThemeSwitch } from '~molecules/themeSwitch/ThemeSwitch';
import Button from '~atoms/button/Button';
import { useLoggedIn } from '~slices/auth/selectors';
import { Navigation } from '~organisms/navigation/Navigation';
import { LoginButton } from '~organisms/login/LoginButton';
import { SignUpButton } from '~organisms/signUp/SignUpButton';
import { Logout } from '~organisms/logout/Logout';
import { SortDownIcon } from '~icons/SortDownIcon';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
	const dropdownRef = useRef(null);
	const isLoggedIn = useLoggedIn();
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		function handleClickOutside(event: Event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<header className={styles.headerWrapper}>
			<div className={styles.headerItems}>
				<a className={styles.logoLink} href=".">
					<span className={styles.y}>Y</span>
					<span className={styles.js}>JS</span>
				</a>
				<Navigation />
				<div className={styles.flatRightControls}>
					{isLoggedIn ? (
						<Logout />
					) : (
						<>
							<SignUpButton />
							<LoginButton />
						</>
					)}
					<ThemeSwitch />
				</div>
				<div ref={dropdownRef} className={styles.hiddenRightControls}>
					<Button
						onClick={() => setShowMenu(!showMenu)}
						style={{ transform: `rotate(${showMenu ? '180deg' : '0'})` }}
					>
						<SortDownIcon />
					</Button>
					<div
						className={styles.controlsBlock}
						style={{
							height: showMenu ? '125px' : '0',
							opacity: showMenu ? '1' : '0',
						}}
					>
						{isLoggedIn ? (
							<Logout />
						) : (
							<>
								<SignUpButton />
								<LoginButton />
							</>
						)}
						<ThemeSwitch />
					</div>
				</div>
			</div>
		</header>
	);
};
