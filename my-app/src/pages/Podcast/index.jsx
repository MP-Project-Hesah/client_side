import React, { useEffect, useState } from "react";
import "./style.css";
import PopUp from "../../components/PopUp";
import api from "../../utils/api";
import { useAuthContext } from "../../Context/auth.context";
import moment from 'moment'; // moment is used for converting time and show current time
// default image
const noImage = "https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?compress=1&resize=400x300";
const Podcast = ({ match: { params: { id } } }) => {
	const [popup, setPopup] = useState(false);
	const [item, setItem] = useState(null);
	const [comment, setComment] = useState([]);
	const [episode, setEpisode] = useState([]);
	const [ncomment, setncomment] = useState('');
	const [show, setShow] = useState(false)
	const { logout, user } = useAuthContext();

	useEffect(() => {
		getpodCastInfo(); // get podcast detail data from server
		podcastView(); // user view the podcast 
	}, [])
	useEffect(() => {
		// check the current user owner of the podcast or not and show add episode button
	//	هل هذا اليوزر هو صاحب البودكاست? عشان يوريني ىيو ايبسود
		if (item && (user.id === item.userId)) {
			setShow(true);
		}
	}, [item]);
	const podcastView = () => {
		api.get(`/podcast/view/${id}`).then(({ data }) => {
			console.log(data);
		}).catch(error => {
			// check error and alert msg
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				alert(error.response.data);
				// logout and redirect to login page
				logout();
			} else {
				alert('Network Error!')
			}
		})
	}
	const getpodCastInfo = () => {
		api.get(`/podcast/${id}`).then(({ data }) => {
			setItem(data);
			setComment(data.comment);
			setEpisode(data.episode);
		}).catch(error => {
			// check error and alert msg
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				alert(error.response.data)
				// logout and redirect to login page
				logout();
			} else {
				alert('Network Error!')
			}
		})
	}
	const onSubmit = (e) => {
		e.preventDefault();
		api.post(`/comment/${id}`, { comment: ncomment }).then(({ data }) => {
			alert('New comment added!');
			resetForm();
			getpodCastInfo();
		}).catch(error => {
			// check error and alert msg
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				alert(error.response.data);
				// logout and redirect to login page
				logout();
			} else {
				alert('Network Error!')
			}
		})
	}
	const resetForm = () => {
		setncomment('');
	}
	return (
		<div className="profile-container">
			{popup && <PopUp setPopup={setPopup} podcastId={id} getListOfPodcasts={getpodCastInfo} />}
			<img
				className="bg-banner w-100"
				src="https://images.unsplash.com/photo-1528457213615-b42528b7d61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
				alt=""
			/>

			<div className="profile-content container-fluid px-4 py-3 color2">
				<div className="row gy-4">
					<div className="col-12 rounded-3">
						<div className="bg-white shadow row gy-3 gy-md-0 align-items-center">
							<div className="col-12 col-md-6">
								<p className="mb-0 fw-bold">Podcast:</p>
								<h1 className="mb-3 color1">
									{item && item.name}
								</h1>
								<p className="color2">
									{item && item.description}
								</p>
								{
									show && <button
										onClick={() => setPopup(true)}
										className="text-white btn bg-purple-dark mb-3"
									>
										Add new episode
									</button>
								}
							</div>
							<div className="col-12 col-md-6 ps-0 ps-0 pe-0">
								<img
									className="w-100"
									src={item && item.photo}
									alt="podcast_photo"
								/>
							</div>
						</div>
						<div className="row mt-5">
							<h1 className="mb-5 color2">Episodes:</h1>
							<div className="col-sm-10 col-md-8">
								<div className="row gy-4">
									{episode.map((item, i) => {
										return (
											<div className="col-12 px-4" key={i}>
												<div className="row shadow rounded-3">
													<div className="col-3 ps-0">
														<img
															className="w-100 rounded-3"
															src="data:image/jpeg;base64,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"
															alt=""
														/>
													</div>
													<div className="col-9 ps-0">
														<div className="d-flex justify-content-between align-items-start mt-1">
															<div>
																<small className="text-secondary">
																	Posted on {moment(item.date).format('MMMM DD , YYYY')}
																	{/* February 25, 2017 */}

																</small>
																<h5 className="color5 fw-bold">
																	{item.name}
																</h5>
															</div>
															<div className="d-flex align-items-center">
																{/* <svg
																	stroke="currentColor"
																	fill="currentColor"
																	strokeWidth="0"
																	viewBox="0 0 448 512"
																	height="1em"
																	width="1em"
																	xmlns="http://www.w3.org/2000/svg"
																	className="me-1"
																>
																	<path d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
																</svg> */}
																
															</div>
														</div>
														<audio
															className="w-100"
															src={item.url}
															controls={true}
														></audio>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>

						<div className="row mt-5 pt-5">
							<h1 className="mb-2 color2">Comments:</h1>
							<div className="col-sm-10 col-md-8 col-lg-6">
								<form onSubmit={onSubmit}>
									<textarea
										cols={10}
										type="text"
										name="comment"
										id="comment"
										className="form-control bg-input mb-3"
										placeholder="Write your comment here"
										rows={4}
										value={ncomment}
										onChange={(e) => setncomment(e.target.value)}
										required
									/>
									<div >
										<button type="submit" className="text-white btn bg-purple-dark mb-3">Add Comment</button>
									</div>
								</form>
								<div className="row gy-4">
									{comment.map((item, i) => {
										return (
											<div className="col-12 px-4" key={i}>
												<div className="row bg-white shadow rounded-3 py-3">
													<div className="col-2 pe-0">
														<img
															className="w-100 rounded-3 shadow-sm"
															src={item.userId.avatar || noImage}
															alt=""
														/>
													</div>
													<div className="col-10">
														<div className="d-flex justify-content-between mb-1">
															<h6 className="color2 text-decoration-underline fw-bold mb-0">
																{item.userId.name}
															</h6>
															<p className="color2 mb-0">
																{/* 2/2/2019 - 4:30 PM */}
																{moment(item.date).format('DD/MM/YYYY - hh:mm A')}
															</p>
														</div>
														<p className="color5 mb-0 f14">
															{item.comment}
														</p>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Podcast;
