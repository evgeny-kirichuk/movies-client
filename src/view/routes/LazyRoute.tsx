import React from 'react';

import { Loader } from '~atoms/loader/Loader';

const LazyRoute: React.FC = ({ children }) => (
	<React.Suspense fallback={<Loader style={{ minHeight: 500 }} delay={100} />}>
		{children}
	</React.Suspense>
);

export default LazyRoute;
