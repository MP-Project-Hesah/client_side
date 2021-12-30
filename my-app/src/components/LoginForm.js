import React from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { NavLink } from "react-router-dom";

const LoginForm = ({ signin, setSignInUp }) => {

	return (
		<div className="login_form shadow-sm pb-4">
			<div className="container-fluid">
				<div className="px-4">
					{(signin && (
						<h4 className="f24 pt-4 fw600 text-center">Sign in</h4>
					)) || <h4 className="f24 pt-4 fw600 text-center">Sign up</h4>}
				</div>
				<hr />

				<form>
					<div className="px-4">
						<label htmlFor="Email">Email address</label>
						<br />
						<input
							className="w-100 px-3 mt-1 f14"
							type="email"
							placeholder="Hessah@gmail.com"
						/>
						<br />
						<br />
						<div className="d-flex justify-content-between align-items-end">
							<label htmlFor="Password">Password</label>
							{signin && (
								<label className="f12 color1 mb-0 fw600 pointer">
									Forgot password?
								</label>
							)}
						</div>
						<div className="position-relative">
							<input
								className="w-100 px-3 mt-1 f14"
								type="text"
								placeholder="Password"
							/>

							<MdRemoveRedEye className="eye pointer" fontSize="1.1rem" />
						</div>
						{!signin && (
							<>
								<br />
								<div className="d-flex justify-content-between align-items-end">
									<label htmlFor="Password">Confirm Password</label>
									{signin && (
										<label className="f12 color1 mb-0 fw600 pointer">
											Forgot password?
										</label>
									)}
								</div>
								<div className="position-relative">
									<input
										className="w-100 px-3 mt-1 f14"
										type="text"
										placeholder="Password"
									/>

									<MdRemoveRedEye className="eye pointer" fontSize="1.1rem" />
								</div>
							</>
						)}
					</div>
					<hr />

					<div className="px-4">
						{(signin && (
							<NavLink to="/dashboard">
								<button className="w-100 border-0 text-white f14">
									Sign in
								</button>
							</NavLink>
						)) || (
							<button
								onClick={() => setSignInUp(true)}
								className="w-100 border-0 text-white f14"
							>
								Sign up
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
