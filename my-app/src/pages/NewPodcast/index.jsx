import React, { useState } from "react";
import { useAuthContext } from "../../Context/auth.context";
import api from "../../utils/api";
import "./style.css";
import swal from 'sweetalert';
const noImage = "https://i.stack.imgur.com/y9DpT.jpg";
const MyPodcast = ({history}) => {
	const { logout } = useAuthContext();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('Music');
	const [image, setImage] = useState('');
	const [showImage, setShowImage] = useState(noImage);

	const onSubmit = (e) => {
		e.preventDefault();
		let that = this;
		// when uploading image to server using onuploadprogress function in the headers
		const Config = {
			onUploadProgress: function (progressEvent) {
				let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				console.log(percentCompleted)
			}
		}
		// use form data when you are trying to upload image to the server
		let formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('category', category);
		formData.append('photo', image)
		// calling api to add new podcast
		api.post('/podcast', formData, Config).then(result => {
			swal("New podcast added!");
			history.push('/dashboard');
		}).catch(error => {
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
	// reset the state
	const resetForm = () => {
		setName('');
		setDescription('');
	};
	// handler on image change or select
	const handleChangeImage = (e) => {
		e.preventDefault();
		let file = e.target.files[0];
		if (file) {
			// convert image to base64
			let reader = new FileReader();
			reader.readAsDataURL(file);
			// call this function after successfully load image
			reader.onload = function () {
				// set base64 image to show to the user
				setShowImage(reader.result);
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
			setImage(file);
		}
	}
	return (
		<div>
			{/* BOTTOM SECTION */}
			<form onSubmit={onSubmit}>
				<div className="mt-4">
					<div className="container-fluid px-4 py-3">
						<div className="row gy-4">
							<div className="col-12 rounded-3 my-podcast-container">
								<div className="d-flex justify-content-between align-items-center">
									<h2 className="mb-0 color5">New Podcast</h2>
									<button type="submit" className="px-4 border-0 bg-purple-dark text-white rounded-pill py-1">
										Save
									</button>
								</div>
								<div className="border border-1 mt-2 mb-4"></div>
								<div>
									<h4 className="mb-3 color5">About your podcast</h4>

									<label className="color2" htmlFor="">
										Podcast name
									</label>
									<textarea
										className="w-100 rounded-3 bg-transparent"
										name="podcastname"
										id="podcastname"
										cols="30"
										rows="6"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									></textarea>
									<div className="text-end">4 / 100</div>
								</div>
								<div>
									<label className="color2" htmlFor="">
										Podcast Description
									</label>
									<textarea
										className="w-100 rounded-3 bg-transparent"
										name="podcastdescription"
										id="podcastdescription"
										cols="30"
										rows="6"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										required
									></textarea>
									<div className="text-end">4 / 600</div>
								</div>

								<div>
									<label className="color2" htmlFor="">
										Podcast cover art
									</label>
									<div className="p-4 border border-1 rounded-3 border-gray">
										<div className="row">
											<div className="col-12 col-sm-4">
												<label htmlFor="file" className="pointer">
													<img
														className="w-100 rounded-3"
														src={showImage}
														alt="podcast cover art"

													/>
												</label>
											</div>
											<div className="col-12 col-sm-8 align-self-center">
												{/* <p className="text-center color5">
													Lorem ipsum dolor sit amet, consectetur adipisicing
													elit. Minima, sequi. Lorem ipsum dolor sit amet.
												</p> */}
												<div className="d-flex justify-content-center">
													<label htmlFor="file" className="px-4 border-0 bg-purple-dark text-white rounded-pill py-2 pointer">
														Upload cover art
													</label>
													<input type="file" name="file" id="file" className="d-none" onChange={handleChangeImage} accept="image/*" />
													{/* <button className="px-4 border border-1 border-dark text-muted rounded-pill py-2 ms-3">
														Download art
													</button> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default MyPodcast;
