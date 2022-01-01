import React from "react";
import "./style.css";
import HomeRightSideSearch from "../../components/HomeRightSideSearch";
import Subscriptions from "../../components/Subscriptions";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const MyPodcast = ({ localMode }) => {
	return (
		<div>
			{/* BOTTOM SECTION */}
			<div className="mt-4">
				<div className="container-fluid px-4 py-3">
					<div className="row gy-4">
						<div className="col-12 col-xl-8 rounded-3 my-podcast-container">
							{[1, 1, 1, 1].map(() => {
								return (
									<div className="container-fluid py-3 rounded-3 shadow mb-4">
										<h4 className="color2">My First Podcast</h4>
										<div className="row gy-4">
											<div className="col-12 col-sm-5">
												<img
													className="w-100 rounded-3"
													src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
													alt=""
												/>
											</div>
											<div className="col-12 col-sm-7">
												<h6 className="fw500 color5">
													Lorem ipsum dolor sit amet consectetur, adipisicing
													elit. Magnam, fuga.
												</h6>
												<div className="mt-3">
													{[1, 1, 1, 1].map(() => {
														return (
															<div className="color3 mt-1">
																<BsFillPlayFill /> Episode 00
															</div>
														);
													})}
													<div className="color3 fw600 mt-3">
														<AiOutlinePlus /> New Episode
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="col-12 col-xl-4">
							<div className="recent_activity">
								<HomeRightSideSearch />
								<Subscriptions localMode={localMode} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyPodcast;
