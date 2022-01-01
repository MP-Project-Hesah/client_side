import React from "react";
import active from "../../assets/recentActivity/active.svg";
import noneActive from "../../assets/recentActivity/noneActive.svg";
import activeD from "../../assets/recentActivity/activeD.svg";
import noneActiveD from "../../assets/recentActivity/noneActiveD.svg";
import "./style.css";

const Subscriptions = ({ localMode }) => {
	var img_Func = function (i) {
		var img_;
		if (!localMode) {
			img_ = (i !== 0 && <img src={noneActive} alt="" />) || (
				<img src={active} alt="" />
			);
		} else if (localMode == 1) {
			img_ = (i !== 0 && <img src={noneActive} alt="" />) || (
				<img src={active} alt="" />
			);
		} else {
			img_ = (i !== 0 && <img src={noneActiveD} alt="" />) || (
				<img src={activeD} alt="" />
			);
		}
		return img_;
	};

	return (
		<div className="subscription_container bg-white rounded-3">
			<div className="d-flex justify-content-between align-items-center px-4 pt-4">
				<p className="mb-0 color2 fw500">My Subscription</p>
			</div>
			<hr />

			<div className="px-4">
				{[1, 1, 1, 1, 1, 1, 1].map((p, i) => {
					return (
						<div className="d-flex pb-1">
							<div className="mt-1">{img_Func(i)}</div>
							<div className="ps-4">
								<p
									className={`${(i === 0 && "color1") || "color3"} fw500 mb-0`}
								>
									Foot created a new payment plan: MoloAIO Renewal Subscription.
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Subscriptions;