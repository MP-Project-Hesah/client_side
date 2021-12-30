 import Login from "./pages/Login";
// import "./styles/style.css";
// IMPORTING ROUTER AND SWITCH
import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
function App() {
	const [mode, setMode] = useState(1);


	let localMode = localStorage.getItem("modeLocal");

	useEffect(() => {
		if (!localMode) { //local mode
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
		<div>




      
		</div>
	);

}
export default App;
 