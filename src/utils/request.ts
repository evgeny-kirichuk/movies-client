import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { store } from '~store/store';
import { authTokenSelector, logout } from '~slices/auth';
import { resetPlaylist } from '~slices/playlist';

const axiosInstance = axios.create({
	baseURL: process.env.APP_API_BASE_URL,
	timeout: 25000,
	withCredentials: false,
});

const handleReject = (error: AxiosError): never => {
	if (error?.response?.status === 401) {
		store.dispatch(logout());
		store.dispatch(resetPlaylist());
	}

	throw error;
};

const authorizationHeader = (token: string) => ({
	Authorization: `Bearer ${token}`,
});

export const request = (
	options: AxiosRequestConfig
): Promise<AxiosResponse> => {
	const token = authTokenSelector(store.getState());

	const headers = token
		? {
				...authorizationHeader(token),
				...options.headers,
		  }
		: {
				...options.headers,
		  };

	return axiosInstance({
		...options,
		headers: {
			...headers,
		},
	}).catch(handleReject);
};
