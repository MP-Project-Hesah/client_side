import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import api from "../../utils/api";
import { useAuthContext } from "../../Context/auth.context";
import "./style.css";
import swal from 'sweetalert';

const LoginForm = ({ signin, setSignInUp, history }) => {
	const { login, logout } = useAuthContext();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [gender, setGender] = useState('');
	const [username, setUserName] = useState('');
	const [name, setName] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		let body = {};
		if (signin) {
			body = {
				email,
				password
			}
			signIn(body);
		} else {
			if (password !== confirmPassword) {
				swal('Password must match');
				return;
			}
			body = {
				email,
				password,
				confirmPassword,
				gender, username, name
			}
			signUp(body);
		}
	}
	const signIn = (body) => {
		api.post('/login', body).then(({ data }) => {
			login(data);
			if(data.payload.role==='admin'){
				history.push('/admin');
			}else{
				history.push('/dashboard');
			}
		}).catch((error) => {
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				swal(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				swal(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				swal(error.response.data)
				logout();
			} else {
				swal('Network Error!')
			}
		})
	}
	const signUp = (body) => {
		api.post('/register', body).then((result) => {
			setSignInUp(false);
			resetForm();
			swal( name ,"Successfully register!");

		}).catch((error) => {
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				swal(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				swal(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				swal(error.response.data)
				logout();
			} else {
				swal('Network Error!')
			}
		})
	}
	const resetForm = () => {
		setEmail('');
		setPassword('');
		setConfirmPassword('');
		setUserName('');
		setName('');
		setGender('');
	}
	return (
		<div className="login_form shadow-sm pb-4">
			<div className="container-fluid">
				<div className="px-4">
					{(signin && (
						<h4 className="f24 pt-4 fw600 text-center">Sign in</h4>
					)) || <h4 className="f24 pt-4 fw600 text-center">Sign up</h4>}
				</div>
				<hr />
				<form onSubmit={onSubmit}>
					<div className="px-4">
						<label htmlFor="Email">Email address</label>
						<br />
						<input
							className="w-100 px-3 mt-1 f14"
							type="email"
							placeholder="Hesah@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<br />
						<br />
						<div className="d-flex justify-content-between align-items-end">
							<label htmlFor="Password">Password</label>
							{signin}
								{/* // <label className="f12 color1 mb-0 fw600 pointer">
									
								// </label> */}
							
						</div>
						<div className="position-relative">
							<input
								className="w-100 px-3 mt-1 f14"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
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
											
										</label>
									)}
								</div>
								<div className="position-relative">
									<input
										className="w-100 px-3 mt-1 f14"
										type="password"
										placeholder="Password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>

									<MdRemoveRedEye className="eye pointer" fontSize="1.1rem" />
								</div>
								<br />
								<div className="d-flex justify-content-between align-items-end">
									<label htmlFor="username">User Name</label>
								</div>
								<div className="position-relative">
									<input
										className="w-100 px-3 mt-1 f14"
										type="text"
										placeholder="User Name"
										value={username}
										onChange={(e) => setUserName(e.target.value)}
										required
									/>

									<MdRemoveRedEye className="eye pointer" fontSize="1.1rem" />
								</div>
								<br />
								<div className="d-flex justify-content-between align-items-end">
									<label htmlFor="Password">Name</label>
								</div>
								<div className="position-relative">
									<input
										className="w-100 px-3 mt-1 f14"
										type="text"
										placeholder="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
								<br />
								<div className="d-flex justify-content-between align-items-end">
									<label htmlFor="gender">Gender</label>
								</div>
								<div className="position-relative">
									<input
										className="w-100 px-3 mt-1 f14"
										type="text"
										placeholder="Gender"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
										required
									/>
								</div>
							</>
						)}
					</div>
					<hr />

					<div className="px-4">
						{(signin && (
							<button type="submit" className="w-100 border-0 text-white f14">
								Sign in
							</button>
						)) || (
								<button
									type="submit"
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

