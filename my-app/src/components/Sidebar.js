import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// import { FaRegTimesCircle } from "react-icons/fa";

const Sidebar = ({ sideBar, setSideBar }) => {
	// useEffect(() => {
	// 	if (sideBar) {
	// 		document.body.style.overflow = "hidden";
	// 	} else {
	// 		document.body.style.overflow = "auto";
	// 	}
	// }, [sideBar]);

	// const [activeNav, setActiveNav] = useState(0);
	// const navigations = ["Home", "New Podcast", "Shuffle Podcast", "About us"];

	return (
		<div
			className={`${
				(sideBar && "sidebarActive") || "nonActiveSidebar"
			} sidebar_container`}
		>
			
		</div>
	);
};

export default Sidebar;
