import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import { Button } from "../../Common/Button/Button";
import { Checkbox } from "../../Common/Checkbox/Checkbox";
import { Form } from "../../Common/Form/Form";
import { TextInput } from "../../Common/TextInput/TextInput";

export const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agree, setAgree] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { signup } = useAuth();
	const location = useLocation();
	let from = location.state?.from?.pathname || "/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return setError("Password don't match");
		}
		try {
			setError("");
			setLoading(true);
			await signup(email, password, username);
			navigate(from, { replace: true });
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError("Faild to create an account!");
		}
	};

	return (
		<Form style={{ height: "500px" }} onSubmit={handleSubmit}>
			<TextInput
				type={"text"}
				placeholder="Enter name"
				icon="person"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
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
			<TextInput
				type={"password"}
				placeholder="Confirm password"
				icon="lock_clock"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
			/>
			<Checkbox
				text="I agree to the Terms &amp; Conditions"
				value={agree}
				onChange={(e) => setAgree(e.target.value)}
				required
			/>
			<Button type="submit" disabled={loading}>
				<span>Submit Now</span>
			</Button>
			{error && <p className="error">{error}</p>}
			<div className="info">
				Already have an account? <Link to={"/login"}>Login</Link>{" "}
				instead.
			</div>
		</Form>
	);
};
