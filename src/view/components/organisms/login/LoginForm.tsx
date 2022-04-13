import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {useAppDispatch} from "~store/store";
import {getPlaylist} from "~slices/playlist";
import {
	IAuthError,
	login,
	resetAuthError,
	useAuthError,
	useAuthLoading
} from '~slices/auth';
import Button from '~atoms/button/Button';
import Portal from '~atoms/portal/Portal';

import styles from './Login.module.scss';

interface ILoginProps {
	toPath: string | null;
	toQuery: string | null;
}

export const LoginFrom: React.FC<ILoginProps> = ({
	toPath,
	toQuery,
	}) => {
	const { t } = useTranslation('content');
	const dispatch = useAppDispatch()
	const navigate = useNavigate();
	const error = useAuthError() as IAuthError | null;
	const loading = useAuthLoading();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');

	useEffect(() => {
		if (loading === 'rejected') {
			setEmailError('');
			setPasswordError('');

			if (error?.email) {
				setEmailError(error.email.msg)
			}
			if (error?.password) {
				setPasswordError(error.password.msg)
			}
			if (error?.secondPassword) {
				setPasswordError(error.secondPassword.msg)
			}
		}

		if (loading === 'fulfilled') {
			setEmailError('');
			setPasswordError('');
			dispatch(getPlaylist())
				.then(() => closeLogin(toPath, toQuery));
		}
	}, [loading]);

	const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}
	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	const closeLogin = (toP: string | null = null, toQ: string | null = null) => {
		setEmail('');
		setPassword('');
		setEmailError('');
		setPasswordError('');
		dispatch(resetAuthError());
		navigate({
			pathname: toP || location.pathname,
			search: toQ || '',
		});
	}

	const onLogin = () => {
		setEmailError('');
		setPasswordError('');
		let invalidated = false;
		if (password === '' && email === '') {
			invalidated = true;
			setPasswordError('empty_password')
			setEmailError('empty_email')
		}
		if (password === '') {
			invalidated = true;
			setPasswordError('empty_password')
		}
		if (email === '') {
			invalidated = true;
			setEmailError('empty_email')
		}
		if (invalidated) {
			return;
		}
		dispatch(login({email, password})).then()
	}

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onLogin();
		}
	}

	return (
			<Portal display={true} onWrapperClick={closeLogin}>
				<div className={styles.loginGrid}>
					<h1>Login</h1>
					<div className={styles.formField}>
						<input
							onKeyDown={onKeyDownHandler}
							autoFocus={true}
							onChange={onUsernameChange}
							value={email}
							placeholder="email"
							type="text"
						/>
						{emailError && (
							<span className={styles.error}>
								{t(`validation.${emailError}`)}
							</span>
						)}
					</div>
					<div className={styles.formField}>
						<input
							onKeyDown={onKeyDownHandler}
							onChange={onPasswordChange}
							placeholder="password"
							value={password}
							type="password"
						/>
						{passwordError && (
							<span className={styles.error}>
							{t(`validation.${passwordError}`)}
						</span>
						)}
					</div>
					<Button
						onClick={onLogin}
					>
						Login
					</Button>
				</div>
			</Portal>
	)
};
