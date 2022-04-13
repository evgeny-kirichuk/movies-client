import React, {useEffect} from 'react';
import { UserRoles } from '~/contants/userRoles';
import {useNavigate} from "react-router-dom";
import { useAuthData } from "~slices/auth/selectors";

const PrivateRoute: React.FC<{adminOnly?: boolean}> =
	({ adminOnly = false, children }) => {
	const navigate = useNavigate();
	const {loggedIn, userRole} = useAuthData();

	useEffect(() => {
		const invalidatedByRole = adminOnly ? userRole !== UserRoles.admin : false;
		if (!loggedIn || invalidatedByRole) {
			navigate('/');
		}
	}, [loggedIn, userRole]);


	return loggedIn ? (
		<>
			{children}
		</>
	) : null;
}


export default PrivateRoute;
