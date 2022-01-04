import React, { useEffect, useState } from "react";
import "./style.css";
import PopUp from "../../components/PopUp";
import api from "../../utils/api";
import { useAuthContext } from "../../Context/auth.context";

const Podcast = ({ history }) => {
	const [popup, setPopup] = useState(false);
	const [item, setItem] = useState(null);
	const { logout } = useAuthContext();
	useEffect({
		// getpodCastInfo();
	}, [])
	const getpodCastInfo = () => {
		api.get('').then(({ data }) => {
			setItem(data);
		}).catch(error => {
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				alert(error.response.data)
				logout();
			} else {
				alert('Network Error!')
			}
		})
	}
	return (
		<div className="profile-container">
			{popup && <PopUp setPopup={setPopup} />}

			{/* BOTTOM SECTION */}
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
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Voluptatum, commodi!
								</h1>
								<p className="color2">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Voluptate numquam labore quidem tempora eos illum
									reprehenderit omnis dicta consequatur asperiores eligendi
									possimus quae ab, quia incidunt eveniet! Nostrum, sint
									adipisci veniam animi quae optio ratione quia quibusdam est
								</p>
								<button
									onClick={() => setPopup(true)}
									className="text-white btn bg-purple-dark"
								>
									Add new episode
								</button>
							</div>
							<div className="col-12 col-md-6 ps-0 ps-0 pe-0">
								<img
									className="w-100"
									src="https://images.unsplash.com/photo-1593697909683-bccb1b9e68a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
									alt=""
								/>
							</div>
						</div>

						<div className="row mt-5">
							<h1 className="mb-5 color2">Episodes:</h1>
							<div className="col-sm-10 col-md-8">
								<div className="row gy-4">
									{[1, 1, 1, 1, 1, 1, 1].map((item, i) => {
										return (
											<div className="col-12 px-4">
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
																	Posted on February 25, 2017
																</small>
																<h5 className="color5 fw-bold">
																	Lorem, ipsum dolor.
																</h5>
															</div>
															<div className="d-flex align-items-center">
																<svg
																	stroke="currentColor"
																	fill="currentColor"
																	stroke-width="0"
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
															key={i}
															src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_alert_chime_short_musical_notification_cute_child_like_001_64918.mp3?_=1"
															controls="true"
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
								<textarea
									cols={10}
									type="text"
									name=""
									id=""
									className="form-control bg-input"
									placeholder="Write your comment here"
									rows={4}
								/>
								<button className=""></button>
								<div className="row gy-4">
									{[1, 1, 1, 1, 1, 1, 1].map((item, i) => {
										return (
											<div className="col-12 px-4">
												<div className="row bg-white shadow rounded-3 py-3">
													<div className="col-2 pe-0">
														<img
															className="w-100 rounded-3 shadow-sm"
															src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?compress=1&resize=400x300"
															alt=""
														/>
													</div>
													<div className="col-10">
														<div className="d-flex justify-content-between mb-1">
															<h6 className="color2 text-decoration-underline fw-bold mb-0">
																Sharton
															</h6>
															<p className="color2 mb-0">2/2/2019 - 4:30 PM</p>
														</div>
														<p className="color5 mb-0 f14">
															"Lorem ipsum, dolor sit amet consectetur
															adipisicing elit. Veniam ullam, veritatis non
															repellendus molestias ad vitae perspiciatis quos
															minima esse beatae, eligendi cum fugiat excepturi
															et suscipit natus tempora?"
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
