import React, { useState } from "react";
import "./style.css";

// COMPONENTS
import LoginForm from "../../components/LoginForm";

const Login = ({history}) => {
	const [signInUp, setSignInUp] = useState(false);

	return (
		<div className="login_container d-flex justify-content-center align-items-center">
			<div className="create_account_btn position-absolute">
				{(signInUp && (
					<button onClick={() => setSignInUp(false)}>Have an account</button>
				)) || (
						<button onClick={() => setSignInUp(true)}>Create an account</button>
					)}
			</div>

			{/* LOGIN FORM START */}
			{(signInUp && <LoginForm setSignInUp={setSignInUp} history={history} />) || (
				<LoginForm signin history={history} />
			)}
			{/* LOGIN FORM END */}

			<div className="footer_container">© Country Limited</div>
		</div>
	);
};

export default Login;
