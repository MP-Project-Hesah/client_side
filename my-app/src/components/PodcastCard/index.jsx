import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GiClick } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";

const PodcastCard = ({item}) => {
	return (
		<div>
			<img
				src={item.photo}
				className="w-100 rounded-3"
				alt=""
			/>
			<p className="mb-0 lh-sm fw500 mt-1 color1">{item.name}</p>
			<p className="f14 lh-sm mb-0 color3">Mr. Jack</p>
			<p className="f10 mb-0 color3">1 Month ago</p>
			<div className="mt-1">
				<GiClick fontSize={22} className="me-2 pointer" color="#f2d249" />
				<BsPlayCircle fontSize={22} className="pointer" color="#269ae1" />
			</div>
		</div>
	);
};

export default PodcastCard;
