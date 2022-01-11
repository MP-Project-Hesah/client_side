import React from "react";
import { GiClick } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";
import moment from 'moment'; //moment is library for formatting  date & time 

const PodcastCard = ({ item, history, SubscribePodcast }) => {
	return (
		<div>
			<img
				src={item.photo}
				className="w-100 rounded-3"
				alt=""
			/>
			<p className="mb-0 lh-sm fw500 mt-1 color1">{item.name}</p>
			<p className="f14 lh-sm mb-0 color3">{item.userId && item.userId.name}</p>
			<p className="f10 mb-0 color3">{moment(item.date).fromNow()}</p>
			<div className="mt-1">
				<GiClick onClick={() => SubscribePodcast(item._id)} fontSize={22} className="me-4 pointer" color="#f2d249" />
				<BsPlayCircle onClick={() => history.push(`/podcast/${item._id}`)} fontSize={22} className="pointer" color="#269ae1" />
			</div>
		</div>
	);
};

export default PodcastCard;
