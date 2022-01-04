import React from "react";
import HomeRightSideSearch from "../../components/HomeRightSideSearch";
import HomeSlider from "../../components/HomeSlider";
import Subscriptions from "../../components/Subscriptions";
import TopPodcast from "../../components/TopPodcast";

const Dashboard = ({ localMode }) => {
	return (
		<div>
			{/* BOTTOM SECTION */}
			<div className="chart_container_upper mt-4">
				<div className="container-fluid px-4 py-3">
					<div className="row gy-4">
						<div className="col-12 col-xl-8 rounded-3">
							<HomeSlider />
							<TopPodcast />
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

export default Dashboard;
