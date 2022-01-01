import React from "react";
import "./style.css";

const MyPodcast = () => {
	return (
		<div>
			{/* BOTTOM SECTION */}
			<div className="mt-4">
				<div className="container-fluid px-4 py-3">
					<div className="row gy-4">
						<div className="col-12 rounded-3 my-podcast-container">
							<div className="d-flex justify-content-between align-items-center">
								<h2 className="mb-0 color5">New Podcast</h2>
								<button className="px-4 border-0 bg-purple-dark text-white rounded-pill py-1">
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
									name=""
									id=""
									cols="30"
									rows="6"
								></textarea>
								<div className="text-end">4 / 100</div>
							</div>
							<div>
								<label className="color2" htmlFor="">
									Podcast Description
								</label>
								<textarea
									className="w-100 rounded-3 bg-transparent"
									name=""
									id=""
									cols="30"
									rows="6"
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
											<img
												className="w-100 rounded-3"
												src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
												alt=""
											/>
										</div>
										<div className="col-12 col-sm-8 align-self-center">
											<p className="text-center color5">
												Lorem ipsum dolor sit amet, consectetur adipisicing
												elit. Minima, sequi. Lorem ipsum dolor sit amet.
											</p>
											<div className="d-flex justify-content-center">
												<button className="px-4 border-0 bg-purple-dark text-white rounded-pill py-2">
													Upload cover art
												</button>
												<button className="px-4 border border-1 border-dark text-muted rounded-pill py-2 ms-3">
													Download art
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyPodcast;
