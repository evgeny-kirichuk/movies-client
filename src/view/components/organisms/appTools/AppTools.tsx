import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cn from 'classnames';

import Button from '~atoms/button/Button';

import styles from './AppTools.module.scss';

const AppTools = () => {
	const { t } = useTranslation('content');
	const [crashed, setCrashed] = useState(false);
	const lang = i18next.language;

	const Crash = () => {
		return (
			// @ts-expect-error notDefinedVariable is not defined
			<div>{notDefinedVariable}</div>
		);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.crash}>
				<Button
					onClick={() => setCrashed(true)}
					className={cn(styles.marginTop8, styles.crashButton)}
				>
					{t('tools.crash_button_text')}
				</Button>
				{crashed && <Crash />}
			</div>
			<div className={styles.lang}>
				<Button
					aria-label={t('aria_label.change_language_to_ru')}
					onClick={() => i18next.changeLanguage('ru')}
					className={cn(styles.marginTop8, styles.leftButton, {
						[styles.active]: lang === 'ru',
					})}
				>
					{t('tools.internationalization_ru')}
				</Button>
				<Button
					aria-label={t('aria_label.change_language_to_eng')}
					onClick={() => i18next.changeLanguage('en')}
					className={cn(styles.marginTop8, styles.rightButton, {
						[styles.active]: lang === 'en',
					})}
				>
					{t('tools.internationalization_eng')}
				</Button>
			</div>
		</div>
	);
};

export default AppTools;
