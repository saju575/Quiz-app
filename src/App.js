import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Common/Navbar/Navbar";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import { Home } from "./Components/Home/Home/Home";
import { Login } from "./Components/Login/Login/Login";
import { Quiz } from "./Components/Quiz/Quiz/Quiz";
import { PriveteRoute } from "./Components/RequirePermission/PriveteRoute";
import { PublicRoute } from "./Components/RequirePermission/PublicRoute";
import { Result } from "./Components/Result/Result/Result";
import { SignUp } from "./Components/SignUp/SignUp/SignUp";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
	return (
		<>
			<AuthProvider>
				<Navbar />

				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/login"
						element={
							<PublicRoute>
								<Login />
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							<PublicRoute>
								<SignUp />
							</PublicRoute>
						}
					/>

					<Route
						path="/quiz/:id"
						element={
							<PriveteRoute>
								<Quiz />
							</PriveteRoute>
						}
					></Route>

					<Route
						path="/result/:id"
						element={
							<PriveteRoute>
								<Result />
							</PriveteRoute>
						}
					></Route>

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</AuthProvider>
		</>
	);
}

export default App;
