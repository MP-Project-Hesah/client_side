// IMPORTING CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

// IMPORTING ROUTER AND SWITCH
import { Switch, Route } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { ProtectedRoute } from "./Context/auth.context";
import Layout from "./layout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import MyPodcast from "./pages/MyPodcast";
import NewPodcast from "./pages/NewPodcast";
import Podcast from "./pages/Podcast";
import Home from "./pages/Home";
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
			className={`${(!localMode && "light") || (localMode == 1 && "light") || "dark"
				}`}
		>
			<Switch>
				{location !== "/" && (
					<Layout localMode={localMode} mode={mode} setMode={setMode}>
						<Route exact path="/dashboard" component={ProtectedRoute(Home)}>
						</Route>
						<Route exact path="/admin">
							<Admin />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/myPodcast" component={ProtectedRoute(MyPodcast)}>
						</Route>
						<Route exact path="/newPodcast" component={ProtectedRoute(NewPodcast)}>
						</Route>
						<Route exact path="/podcast/:id" component={ProtectedRoute(Podcast)}>
							
						</Route>
					</Layout>
				)}

				<Route exact path="/" component={Login}>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
