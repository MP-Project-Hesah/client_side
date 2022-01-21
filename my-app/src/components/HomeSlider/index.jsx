import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// configure Swiper to use modules
SwiperCore.use([Navigation]);

const HomeSlider = () => {
	const sldierImages = [
		"https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202009/MIT-Podcast-Site-01.jpg?itok=jjvv0dyd",
		"https://images.unsplash.com/photo-1590602846989-e99596d2a6ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
		"https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
	];

	return (
		<Swiper navigation={true}>
			{sldierImages.map((item, i) => {
				return (
					<SwiperSlide key={i}>
						<img src={item} alt="" className="w-100" />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default HomeSlider;
