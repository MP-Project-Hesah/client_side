import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import avt from "../../assets/avt.svg";
import { FaRegTimesCircle } from "react-icons/fa";
import "./style.css";
import { useAuthContext } from "../../Context/auth.context";

const Sidebar = ({ sideBar, setSideBar }) => {
	const { user } = useAuthContext()
	useEffect(() => {
		if (sideBar) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [sideBar]);

	const [activeNav, setActiveNav] = useState(0);
	const navigations = ["Home", "New Podcast", "Shuffle Podcast", "About us"];

	return (
		<div
			className={`${(sideBar && "sidebarActive") || "nonActiveSidebar"
				} sidebar_container`}
		>
			<div className="top_side d-flex align-items-center justify-content-between ps-4 pe-3 w-100">
				<div className="d-flex align-items-center">
					<img src={user && user.avatar || avt} alt="" style={{ width: '30px' }} />
					<p className="mb-0 ms-3 fw600 color3">PODIFY</p>
				</div>
				<FaRegTimesCircle
					onClick={() => setSideBar(!sideBar)}
					fontSize="1.8rem"
					className="pointer hamb color3"
				/>
			</div>
			<div className="home_side px-3 pt-3 pb-1">
				<p className="fw600 color2 ps-3 mb-3">Home</p>
				<NavLink to="/dashboard" activeClassName="activeNav">
					<div className="d-flex align-items-center position-relative">
						<div className="img1"></div>
						<p className="mb-0">Podcast</p>
					</div>
				</NavLink>
			</div>
			<hr />
			<div className="manage_side px-3 pt-2 pb-1">
				<p className="fw600 color2 ps-3 mb-3">Manage</p>
				<NavLink to="/myPodcast" activeClassName="activeNav">
					<div className="d-flex align-items-center position-relative">
						<div className="img2"></div>
						<p className="mb-0">My Podcast</p>
					</div>
				</NavLink>
				<NavLink to="/statistics" activeClassName="activeNav">
					<div className="mt-1 d-flex align-items-center position-relative">
						<div className="img4"></div>
						<p className="mb-0">Statistics</p>
					</div>
				</NavLink>
			</div>

			<div className="manage_side px-3 pt-2 pb-1 mt-4">
				<p className="fw600 color2 ps-3 mb-3"></p>
				<ul className="d-flex flex-column d-md-none align-items-start ms-5 mb-0 list-unstyled">
					{navigations.map((prev, i) => {
						return (
							<li
								onClick={() => setActiveNav(i)}
								className={`${activeNav === i && "text-decoration-underline"} ${i !== 0 && "mt-3"
									} pointer color5`}
								key={i}
							>
								{prev}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
