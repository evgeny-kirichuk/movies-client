import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserRoles } from '~/contants/userRoles';
import { useAuthData } from '~slices/auth/selectors';

const PrivateRoute: React.FC<{ adminOnly?: boolean }> = ({
	adminOnly = false,
	children,
}) => {
	const navigate = useNavigate();
	const { loggedIn, userRole } = useAuthData();

	useEffect(() => {
		const invalidatedByRole = adminOnly ? userRole !== UserRoles.admin : false;
		if (!loggedIn || invalidatedByRole) {
			navigate('/');
		}
	}, [loggedIn, userRole]);

	return loggedIn ? <>{children}</> : null;
};

export default PrivateRoute;
