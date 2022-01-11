import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/auth.context";
import api from "../../utils/api";
import PodcastCard from "../PodcastCard";
import "./style.css";
import swal from 'sweetalert';
const TopPodcast = ({ history }) => {
	const { logout, SubScribeList } = useAuthContext();
	const [items, setItems] = useState([]);
	useEffect(() => {
		getListOfPodcasts();
	}, []);
	// get all podcast list
	const getListOfPodcasts = () => {
		api.get('/podcast/all/list').then(({ data }) => {
			setItems(data);
		}).catch(error => {
			// check error and alert msg
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
	// call api to subscribe the podcast by passing podcast id
	const SubscribePodcast = (id) => {
		api.get(`/subscribe/${id}`).then(({ data }) => {
			swal(data);
			SubScribeList();
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
	return (
		<div className="top_product_container mt-4 pb-4 bg-white rounded-3">
			<h5 className="fw600 px-4 py-4 mb-0 color2">Top Podcasts</h5>

			<div className="container-fluid">
				<div className="row gy-4">
					{items.map((item, index) => {
						return (
							<div className="col-6 col-md-4 col-xl-3" key={index}>
								<PodcastCard item={item} history={history} SubscribePodcast={SubscribePodcast} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default TopPodcast;
