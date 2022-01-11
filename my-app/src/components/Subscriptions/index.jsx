import React, { useEffect } from "react";
import active from "../../assets/recentActivity/active.svg";
import noneActive from "../../assets/recentActivity/noneActive.svg";
import activeD from "../../assets/recentActivity/activeD.svg";
import noneActiveD from "../../assets/recentActivity/noneActiveD.svg";
import "./style.css";
import { useAuthContext } from "../../Context/auth.context";
import api from "../../utils/api";
import swal from 'sweetalert';
const Subscriptions = ({ localMode }) => {
	const { logout, subItems, SubScribeList } = useAuthContext();
	useEffect(() => {
		SubScribeList();// calling subscription api
	}, [])
	let img_Func = function (i) {
		let img_;
		if (!localMode) {
			img_ = (i !== 0 && <img src={active} alt="" />) || (
				<img src={active} alt="" />
			);
		} else if (localMode == 1) {
			img_ = (i !== 0 && <img src={active} alt="" />) || (
				<img src={active} alt="" />
			);
		} else {
			img_ = (i !== 0 && <img src={activeD} alt="" />) || (
				<img src={activeD} alt="" />
			);
		}
		return img_;
	};
	// calling api to unscribe the podcast by passing podcast id
	const UnSubscribed = (id) => {
		api.get(`/unsubscribe/${id}`).then(({ data }) => {
			swal(data);
			SubScribeList();
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
		<div className="subscription_container bg-white rounded-1">
			<div className="d-flex justify-content-between align-items-center px-4 pt-4">
				<p className="mb-0 color2 fw500">My Subscription</p>
			</div>
			<hr />

			<div className="px-4">
				{subItems && subItems.map((item, index) => {
					return (
						item.podcast && <div className="d-flex pb-2 pointer" onClick={() => UnSubscribed(item._id)} key={index}>
							<div className="mt-1">{img_Func(index)}</div>
							<div className="ps-4">
								<p
									className={`${(index === 0 && "color1") || "color1"} fw500 mb-0`}
								>
									{item.podcast && item.podcast.name}
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
