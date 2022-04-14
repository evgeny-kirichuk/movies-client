import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '~atoms/button/Button';
import Portal from '~atoms/portal/Portal';
import { useAppDispatch } from '~store/store';
import {
	IAuthError,
	resetAuthError,
	signup,
	useAuthError,
	useAuthLoading,
} from '~slices/auth';

import styles from './SignUp.module.scss';

export const SignupForm: React.FC = () => {
	const { t } = useTranslation('content');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const error = useAuthError() as IAuthError | null;
	const loading = useAuthLoading();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [secondPassword, setSecondPassword] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');

	useEffect(() => {
		if (loading === 'rejected') {
			setEmailError('');
			setPasswordError('');

			if (error?.email) {
				setEmailError(error.email.msg);
			}
			if (error?.password) {
				setPasswordError(error.password.msg);
			}
			if (error?.secondPassword) {
				setPasswordError(error.secondPassword.msg);
			}
		}

		if (loading === 'fulfilled') {
			setEmailError('');
			setPasswordError('');
			closeSignup();
		}
	}, [loading]);

	const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onSecondPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSecondPassword(e.target.value);
	};

	const closeSignup = () => {
		setEmail('');
		setPassword('');
		setSecondPassword('');
		dispatch(resetAuthError());
		navigate({
			pathname: location.pathname,
			search: '',
		});
	};

	const onSignup = () => {
		setEmailError('');
		setPasswordError('');
		let invalidated = false;
		if (password === '' && email === '') {
			invalidated = true;
			setPasswordError('empty_password');
			setEmailError('empty_email');
		}
		if (password === '') {
			invalidated = true;
			setPasswordError('empty_password');
		}
		if (email === '') {
			invalidated = true;
			setEmailError('empty_email');
		}
		if (password !== secondPassword) {
			invalidated = true;
			setPasswordError('password_doesnt_match');
		}
		if (invalidated) {
			return;
		}

		dispatch(signup({ email, password, secondPassword }));
	};

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSignup();
		}
	};

	return (
		<Portal display={true} onWrapperClick={closeSignup}>
			<div className={styles.signupGrid}>
				<h1>Sign up</h1>
				<div className={styles.formField}>
					<input
						onKeyDown={onKeyDownHandler}
						onChange={onUsernameChange}
						value={email}
						placeholder="email"
						type="email"
						autoComplete="off"
					/>
					{emailError && (
						<span className={styles.error}>
							{t(`validation.${emailError}`)}
						</span>
					)}
				</div>
				<input
					onKeyDown={onKeyDownHandler}
					onChange={onPasswordChange}
					value={password}
					placeholder="password"
					type="new-password"
					autoComplete="off"
				/>
				<div className={styles.formField}>
					<input
						onKeyDown={onKeyDownHandler}
						onChange={onSecondPasswordChange}
						value={secondPassword}
						placeholder="confirm password"
						type="new-password"
						autoComplete="off"
					/>
					{passwordError && (
						<span className={styles.error}>
							{t(`validation.${passwordError}`)}
						</span>
					)}
				</div>
				<Button onClick={onSignup}>Sign up</Button>
			</div>
		</Portal>
	);
};
