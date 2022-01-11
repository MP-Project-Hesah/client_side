import React, { useState } from "react";
import "./style.css";
import cross from "../../assets/cross.svg";
import api from "../../utils/api";
import { useAuthContext } from "../../Context/auth.context";
import swal from 'sweetalert';
//pop up for add new episode 

const PopUp = ({ setPopup, podcastId,getListOfPodcasts }) => {
	const { logout } = useAuthContext()
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [audio, setAudio] = useState('');
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
		formData.append('description', description);
		formData.append('audio', audio)
		api.post(`/episode/${podcastId}`, formData, Config).then(result => {
			swal('Episode Added!');
			getListOfPodcasts();
			setPopup(false);
		}).catch(error => {
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
	return (
		<div className="pop-up-container">
			<div className="inner-pop-up radius">
				<div
					className={`pop-up-header bg-color7 d-flex align-items-center ${"justify-content-between"} p-3`}
				>
					<p className="f20 color1 fw600 text-decoration-underline">
						Add Episode
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
						<label htmlFor="name">Name:</label>
						<br />
						<input type="text" name="name" id="name"
							className="form-control" value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<br />
						<label htmlFor="description">Description:</label>
						<br />
						<textarea
							rows={4}
							type="text"
							name="description"
							id="description"
							className="form-control"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<br />
						<label htmlFor="file">Attachments:</label>
						<br />
						<input type="file" name="file" id="file" className="form-control" accept="audio/*"
							onChange={(e) => setAudio(e.target.files[0])}
							required />
						<br />
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
