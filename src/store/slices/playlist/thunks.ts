import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { request } from '~utils/request';
import { playlistApiUrl } from './constants';
import { name } from './constants';
import {IMovieResponse} from "~schemas/movie";

export const getPlaylist = createAsyncThunk<
	Array<IMovieResponse>
	>(`${name}/getPlaylist`, async () => {
	const {
		data,
	}: AxiosResponse<Array<IMovieResponse>> = await request({
		method: 'get',
		url: `${playlistApiUrl}/`,
		withCredentials: true,
	});

	return data;
});

export const addToPlaylist = createAsyncThunk<
	Array<IMovieResponse>,
	string
	>(`${name}/addToPlaylist`, async (id) => {
	const {
		data,
	}: AxiosResponse<Array<IMovieResponse>> = await request({
		method: 'post',
		url: `${playlistApiUrl}/`,
		withCredentials: true,
		data: {
			id
		}
	});

	return data;
});

export const deleteFromPlaylist = createAsyncThunk<
	Array<IMovieResponse>,
	string
	>(`${name}/deleteFromPlaylist`, async (id) => {
	const {
		data,
	}: AxiosResponse<Array<IMovieResponse>> = await request({
		method: 'post',
		url: `${playlistApiUrl}/delete`,
		withCredentials: true,
		data: {
			id
		}
	});

	return data;
});
