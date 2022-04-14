import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { useLoggedIn } from '~slices/auth/selectors';
import Tabs from '~molecules/tabs/Tabs';
import Button from '~atoms/button/Button';

import styles from './Navigation.module.scss';

export const Navigation: React.FC<{ className?: string }> = ({ className }) => {
	const { t } = useTranslation('content');
	const isLoggedIn = useLoggedIn();
	const navigate = useNavigate();
	const location = useLocation();

	const paths = [
		{
			pathname: '/movies',
			private: false,
			adminOnly: false,
			pathlabel: t('navigation.movies'),
		},
		{
			pathname: '/my-list',
			private: true,
			adminOnly: false,
			pathlabel: t('navigation.my_list'),
		},
	];

	const activeTabIndex = paths.findIndex(
		(path) => location.pathname === path.pathname
	);

	const onNavButtonClick = (buttonIndex: number) => () => {
		if (paths[buttonIndex].private && !isLoggedIn) {
			navigate({
				pathname: location.pathname,
				search: '?login=true&toPath=/my-list',
			});
		} else {
			navigate(paths[buttonIndex].pathname);
		}
	};

	const navTabs = paths.map((path, index) => (
		<Button
			tabIndex={0}
			className={cn(styles.navButton, {
				[styles.active]: location.pathname === path.pathname,
			})}
			onClick={onNavButtonClick(index)}
			key={path.pathname}
		>
			{path.pathlabel}
		</Button>
	));

	return (
		<nav className={className}>
			<Tabs
				showIndicator={true}
				activeTabIndex={activeTabIndex}
				tabs={navTabs}
			/>
		</nav>
	);
};
