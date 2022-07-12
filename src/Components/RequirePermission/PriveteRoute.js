import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export const PriveteRoute = ({ children }) => {
	const { currentUser } = useAuth();
	const location = useLocation();
	if (!currentUser) {
		return (
			<Navigate
				to={"/login"}
				state={{ from: location }}
				replace
			></Navigate>
		);
	}
	return children;
};
