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
								<p className="mb-0 fw-bold">Music:</p>
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
															src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
																<svg
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
																</svg>
																Share
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
