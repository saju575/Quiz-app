import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export const PublicRoute = ({ children }) => {
	const { currentUser } = useAuth();
	const location = useLocation();
	if (currentUser) {
		return (
			<Navigate to={"/"} state={{ from: location }} replace></Navigate>
		);
	}
	return children;
};
