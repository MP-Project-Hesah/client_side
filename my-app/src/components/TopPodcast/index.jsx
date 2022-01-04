import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/auth.context";
import api from "../../utils/api";
import PodcastCard from "../PodcastCard";
import "./style.css";

const TopPodcast = () => {
	const { logout } = useAuthContext();
	const [items, setItems] = useState([]);
	useEffect(() => {
		getListOfPodcasts();
	}, []);
	const getListOfPodcasts = () => {
		api.get('/podcast/list').then(({ data }) => {
			setItems(data);
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
		<div className="top_product_container mt-4 pb-4 bg-white rounded-3">
			<h5 className="fw600 px-4 py-4 mb-0 color2">Top Podcasts</h5>

			<div className="container-fluid">
				<div className="row gy-4">
					{items.map((item, index) => {
						return (
							<div className="col-6 col-md-4 col-xl-3" key={index}>
								<PodcastCard item={item} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default TopPodcast;
