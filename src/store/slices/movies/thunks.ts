import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { request } from '~utils/request';
import { moviesApiUrl } from './constants';
import { name } from './constants';
import {IMovieResponse} from "~schemas/movie";

export const getMovies = createAsyncThunk<
	Array<IMovieResponse>
	>(`${name}/getMovies`, async () => {
	const {
		data,
	}: AxiosResponse<Array<IMovieResponse>> = await request({
		method: 'get',
		url: `${moviesApiUrl}/`,
		withCredentials: true,
	});

	return data;
});
