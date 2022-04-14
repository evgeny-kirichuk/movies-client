import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { request } from '~utils/request';
import { IMovieResponse } from '~schemas/movie';

import { moviesApiUrl, name } from './constants';

export const getMovies = createAsyncThunk<Array<IMovieResponse>>(
	`${name}/getMovies`,
	async () => {
		const { data }: AxiosResponse<Array<IMovieResponse>> = await request({
			method: 'get',
			url: `${moviesApiUrl}/`,
			withCredentials: true,
		});

		return data;
	}
);
