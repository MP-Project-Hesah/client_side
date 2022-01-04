import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/auth.context";

ReactDOM.render(
	<AuthProvider>
	<Router>
		<Suspense fallback={<div>loading</div>}>
			<App />
		</Suspense>
	</Router>
	</AuthProvider>,
	document.getElementById("root")
);
