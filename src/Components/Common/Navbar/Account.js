import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import classes from "./Account.module.css";
export const Account = () => {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/");
	};
	return (
		<div className={classes.account}>
			{currentUser ? (
				<>
					<span className="material-icons-outlined" title="Account">
						account_circle
					</span>
					<span>{currentUser.displayName}</span>
					<span
						onClick={() => handleLogout()}
						className="material-icons-outlined"
						title="Logout"
					>
						{" "}
						logout{" "}
					</span>
				</>
			) : (
				<>
					<Link to={"/signup"} className="text-base">
						Signup
					</Link>
					<Link to={"/login"} className="text-base">
						Login
					</Link>
				</>
			)}
		</div>
	);
};
