import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

import { Button } from "../../Common/Button/Button";
import { Form } from "../../Common/Form/Form";

import { TextInput } from "../../Common/TextInput/TextInput";

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();
	const location = useLocation();
	let from = location.state?.from?.pathname || "/";

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(email, password);
			navigate(from, { replace: true });
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError("Faild to login!");
		}
	};
	return (
		<Form style={{ height: "330px" }} onSubmit={handleSubmit}>
			<TextInput
				type={"text"}
				placeholder="Enter email"
				icon="alternate_email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<TextInput
				type={"password"}
				placeholder="Enter password"
				icon="lock"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<Button type={"submit"} disabled={loading}>
				<span>Submit Now</span>
			</Button>
			{error && <p className="error">{error}</p>}
			<div className="info">
				Don't have an account? <Link to={"/signup"}>Signup</Link>{" "}
				instead.
			</div>
		</Form>
	);
};
