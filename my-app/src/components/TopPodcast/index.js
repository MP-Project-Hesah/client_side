import React from "react";
import PodcastCard from "../PodcastCard";
import "./style.css";

const TopPodcast = () => {
	return (
		<div className="top_product_container mt-4 pb-4 bg-white rounded-3">
			<h5 className="fw600 px-4 py-4 mb-0 color2">Top Podcasts</h5>

			<div className="container-fluid">
				<div className="row gy-4">
					{[1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => {
						return (
							<div className="col-6 col-md-4 col-xl-3">
								<PodcastCard />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default TopPodcast;
