// IMPORTING CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

// IMPORTING ROUTER AND SWITCH
import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import MyPodcast from "./pages/MyPodcast";
import NewPodcast from "./pages/NewPodcast";

function App() {
	const [mode, setMode] = useState(1);

	const location = useLocation().pathname;

	let localMode = localStorage.getItem("modeLocal");

	useEffect(() => {
		if (!localMode) {
			localStorage.setItem("modeLocal", 1);
			setMode(1);
		} else {
			console.log("object");
		}

		if (!localMode) {
			document.body.style.background = "#f5f6f8";
		} else if (localMode == 1) {
			document.body.style.background = "#f5f6f8";
		} else if (localMode && localMode == 2) {
			document.body.style.background = "#212121";
		}
	}, [localMode, mode]);

	return (
		<div
			className={`${
				(!localMode && "light") || (localMode == 1 && "light") || "dark"
			}`}
		>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
			</Switch>

			{location !== "/" && (
				<Layout localMode={localMode} mode={mode} setMode={setMode}>
					<Switch>
						<Route exact path="/dashboard">
							<Home localMode={localMode} />
						</Route>
						<Route exact path="/admin">
							<Admin />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/myPodcast">
							<MyPodcast />
						</Route>
						<Route exact path="/newPodcast">
							<NewPodcast />
						</Route>
					</Switch>
				</Layout>
			)}
		</div>
	);
}

export default App;
