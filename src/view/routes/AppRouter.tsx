import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Main from '~mainLayout/main/Main';
import LazyRoute from '~routes/LazyRoute';
import PrivateRoute from '~routes/PrivateRoute';

const MoviesScreen = lazy(
	() => import(/*webpackChunkName: "Movies"*/ '~pages/movies/Movies')
);
const PlaylistScreen = lazy(
	() => import(/*webpackChunkName: "Playlist"*/ '~pages/playlist/Playlist')
);

const AppRoutes: React.FunctionComponent = () => (
	<React.Suspense fallback={null}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />}>
					<Route
						path="movies"
						element={
								<LazyRoute>
									<MoviesScreen />
								</LazyRoute>
						}
					/>
					<Route
						path="my-list"
						element={
							<PrivateRoute>
								<LazyRoute>
									<PlaylistScreen />
								</LazyRoute>
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/movies" />} />
				</Route>

				<Route index element={<Navigate to="/movies" />} />
			</Routes>
		</BrowserRouter>
	</React.Suspense>
);

export default AppRoutes;
