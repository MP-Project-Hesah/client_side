import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/auth.context"; // initiallize the auth user provider globally
ReactDOM.render(
	<React.StrictMode>
	<AuthProvider>
		<Router>
			<Suspense fallback={<div>loading</div>}>
				<App />
			</Suspense>
		</Router>
	</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
