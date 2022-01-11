import React, { useState } from "react";
import "./style.css";
import cross from "../../assets/cross.svg";
import api from "../../utils/api";
import { useAuthContext } from "../../Context/auth.context";
import moment from "moment";
import swal from 'sweetalert';
const PopUp = ({ setPopup }) => {
	const { logout, user, login } = useAuthContext()
	const [name, setName] = useState(user.name || ''); // set username
	const [profession, setProfession] = useState(user.profession || ''); // if user has profession other wise empty
	const [bio, setbio] = useState(user.bio || '');
	const [DOB, setDOB] = useState(moment(user.DOB || '').format('YYYY-MM-DD')); // setting the date of birth if not exist then set the current date
	const [avatar, setAvatar] = useState('');
	const [facebook, setFacebook] = useState(user.facebook || '');;
    

	const onSubmit = (e) => {
		e.preventDefault();
		let that = this;
		const Config = {
			onUploadProgress: function (progressEvent) {
				let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				console.log(percentCompleted)
			}
		}
		let formData = new FormData();
		formData.append('name', name);
		formData.append('bio', bio);
		formData.append('avatar', avatar);
		formData.append('profession', profession);
		formData.append('DOB', DOB);//DOB date of bearth
		formData.append('facebook', facebook);
	
		// calling api to update  user info
		api.put('/update', formData, Config).then(({ data }) => {
			console.log(data);
			// swal(data);
			setPopup(false);
			// setting new information about user
			login({ token: data.token });
		}).catch((error) => {
			// check error and swal msg
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				swal(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				swal(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				swal(error.response.data)
				// logout and redirect to login page
				logout();
			} else {
				swal('Network Error!')
			}
		})
	}
	return (
		<div className="profile-pop-up-container">
			<div className="profile-inner-pop-up radius">
				<div
					className={`pop-up-header bg-color7 d-flex align-items-center ${"justify-content-between"} p-3`}
				>
					<p className="f20 color1 fw600 text-decoration-underline">
						Update Profile
					</p>
					<img
						onClick={() => setPopup(false)}
						className="pointer"
						src={cross}
						alt=""
					/>
				</div>
				<form onSubmit={onSubmit}>
					<div className={`${"pop-up-body"}`}>
						<div className="row">
							<div className="col-12 col-md-6">
								<label htmlFor="name">Name:</label>
								<br />
								<input type="text" name="name" id="name"
									className="form-control" value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<br />
							</div>
							<div className="col-12 col-md-6">
								<label htmlFor="profession">Profession:</label>
								<br />
								<input type="text" name="profession" id="profession"
									className="form-control" value={profession}
									onChange={(e) => setProfession(e.target.value)}
									required
								/>
								<br />
							</div>
							<div className="col-12">
								<label htmlFor="bio">Bio:</label>
								<br />
								<textarea
									rows={4}
									type="text"
									name="bio"
									id="bio"
									className="form-control"
									value={bio}
									onChange={(e) => setbio(e.target.value)}
									required
								/>
								<br />
							</div>
							<div className="col-12 col-md-6">
								<label htmlFor="name">DOB:</label>
								<br />
								<input type="date" name="dob" id="dob"
									className="form-control" value={DOB}
									onChange={(e) => setDOB(e.target.value)}
									required
								/>
								<br />
							</div>
							<div className="col-12 col-md-6">
								<label htmlFor="name">Facebook:</label>
								<br />
								<input type="url" name="facebook" id="facebook"
									className="form-control" value={facebook}
									onChange={(e) => setFacebook(e.target.value)}
									required
								/>
								<br />
							</div>

							<div className="col-12">
								<label htmlFor="file">Avatar:</label>
								<br />

								<input type="file" name="file" id="file" className="form-control" accept="image/*"
									onChange={(e) => setAvatar(e.target.files[0])}
								/>
								<br />
							</div>
						</div>
						<div className="text-end">
							<button type="submit" className="text-white btn bg-purple-dark">Create</button>{" "}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PopUp;
