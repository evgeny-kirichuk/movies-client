import React from 'react';

import { ThemeProvider } from '~theme';
import NetworkStatusProvider from '~utils/NetworkStatusProvider';
import CrashMessage from '~molecules/crashMessage/CrashMessage';
import ErrorBoundary from '~molecules/errorBoundary/errorBoundary';
import AppRoutes from '~routes/AppRouter';

const ViewEntrypoint: React.FunctionComponent = () => {
	return (
		<NetworkStatusProvider>
			<ThemeProvider>
				<ErrorBoundary errorScreen={<CrashMessage />}>
					<AppRoutes />
				</ErrorBoundary>
			</ThemeProvider>
		</NetworkStatusProvider>
	);
};

export default ViewEntrypoint;
