import React, { useEffect, useState } from "react";
import "./style.css";
import HomeRightSideSearch from "../../components/HomeRightSideSearch";
import Subscriptions from "../../components/Subscriptions";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import api from "../../utils/api";
import { useAuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import PopUp from "../../components/PopUp";

const MyPodcast = ({ localMode, history }) => {
	const [popup, setPopup] = useState(false);
	const { logout } = useAuthContext();
	const [podcastId, setPodcastId] = useState('');
	const [items, setItems] = useState([]);
	useEffect(() => {
		// calling api to get list of all podcast 
		getListOfPodcasts();
	}, []);
	const getListOfPodcasts = () => {
		api.get('/podcast/list').then(({ data }) => {
			setItems(data);
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
	const setPodCastId = (id) => {
		setPodcastId(id);
		setPopup(true)
	}
	return (
		<div>
			{/* BOTTOM SECTION */}
			<div className="mt-4">
				<div className="container-fluid px-4 py-3">
					<div className="row gy-4">
						<div className="col-12 col-xl-8 rounded-3 my-podcast-container">
							{popup && <PopUp setPopup={setPopup} podcastId={podcastId} getListOfPodcasts={getListOfPodcasts} />}
							{items.map((item, index) => (
								<div className="container-fluid py-3 rounded-3 shadow mb-4" key={index}>
									<h4 className="color2">{item.name}</h4>
									<div className="row gy-4">
										<div className="col-12 col-sm-5">
											<img
												className="w-100 rounded-3"
												src={item.photo}
												alt=""
											/>
										</div>
										<div className="col-12 col-sm-7">
											<h6 className="fw500 color5">
												<Link to={`/podcast/${item._id}`}>{item.description}</Link>
											</h6>
											<div className="mt-3">
												{item.episode.map((epi, i) => (
													<div className="color3 mt-1" key={i} >
														<BsFillPlayFill /> {epi.name} {i}
													</div>
												))}
												<div className="color3 fw600 mt-3 pointer" onClick={() => setPodCastId(item._id)}>
													<AiOutlinePlus /> New Episode
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
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
