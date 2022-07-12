import signupImg from "../../../assets/images/signup.svg";
import { Illustration } from "../../Common/Illustration/Illustration";
import { SignupForm } from "../SignupForm/SignupForm";

export const SignUp = () => {
	return (
		<>
			<div className="container1">
				<h1>Create an account</h1>
				<div className="column">
					<Illustration>
						<img src={signupImg} alt="Signup" />
					</Illustration>
					<SignupForm />
				</div>
			</div>
		</>
	);
};
