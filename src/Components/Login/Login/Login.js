import loginImg from "../../../assets/images/login.svg";
import { Illustration } from "../../Common/Illustration/Illustration";
import { LoginForm } from "../LoginForm/LoginForm";
export const Login = () => {
	return (
		<>
			<div className="container1">
				<h1>Login to your account</h1>
				<div className="column">
					<Illustration>
						<img src={loginImg} alt="Signup" />
					</Illustration>
					<LoginForm />
				</div>
			</div>
		</>
	);
};
