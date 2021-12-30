import React from "react";
// import { AiOutlineHeart } from "react-icons/ai";
// import { GiClick } from "react-icons/gi";
// import { BsPlayCircle } from "react-icons/bs";
import {AioutlineHeart} from "react-icons/ai";
import {GiClick} from "react-icons/gi";
import {BsPlayCircle} from "react-icons/bs";

const PodcastCard = () => {
	return (
		<div>
			<img
				src="https://images.unsplash.com/photo-1593697820826-2e76c9720a99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
				className="w-100 rounded-3"
				alt=""
			/>
			<p className="mb-0 lh-sm fw500 mt-1 color1">Podcast Title</p>
			<p className="f14 lh-sm mb-0 color3">Mr. Mohammed </p>
			<p className="f10 mb-0 color3">1 Month ago</p>
			<div className="mt-1">
				<AiOutlineHeart
					fontSize={22}
					className="me-2 pointer"
					color="#fe0000"
				/>
				<GiClick fontSize={22} className="me-2 pointer" color="#f2d249" />
				<BsPlayCircle fontSize={22} className="pointer" color="#269ae1" />
			</div>
		</div>
	);
};

export default PodcastCard;
