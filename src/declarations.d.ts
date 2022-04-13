declare module '*.png';
declare module '*.svg';
declare module '*.scss';
declare module '*.js';

type Loading = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface GenericState<
	T = {},
	M = undefined,
	E = import('@reduxjs/toolkit').SerializedError
	> {
	data: T;
	meta?: M;
	loading: Loading;
	error?: E | import('@reduxjs/toolkit').SerializedError | null;
}
