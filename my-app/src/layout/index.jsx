import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import star from "../assets/star.svg";
import sun from "../assets/sun.svg";
import { BiExit } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsFillBellFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { useAuthContext } from "../Context/auth.context";

const Layout = ({ children, setMode, mode, localMode }) => {
	useEffect(() => { }, [localMode, mode]);
	const { logout,isAuthenticated } = useAuthContext()
	const [sideBar, setSideBar] = useState(false);
	const [activeNav, setActiveNav] = useState(0);

	const navigations = [
		// {"Home", "New Podcast", "Shuffle Podcast", "About us"},
		{ name: "Home", url: "/dashboard" },
		{ name: "New Podcast", url: "/newPodcast" },
		{ name: "Shuffle Podcast", url: "/shufflePodcast" },
		{ name: "About us", url: "/aboutUs" },
	];

	return (
		<div className="layout_container d-flex">
			{isAuthenticated && <Sidebar sideBar={sideBar} setSideBar={setSideBar} />}
			<div className="right_side">
				{isAuthenticated &&<div className="header_container shadow-sm d-flex justify-content-between align-items-center px-4 w-100">
					<div className="d-flex align-items-center">
						<GiHamburgerMenu
							onClick={() => setSideBar(!sideBar)}
							fontSize="1.4rem"
							className="pointer hamb color3"
						/>
						<ul className="d-none d-md-flex align-items-center ms-4 mb-0 list-unstyled">
							{navigations.map((prev, i) => {
								return (

									<li
										onClick={() => setActiveNav(i)}
										className={`${activeNav === i && "text-decoration-underline"
											} ms-4 pointer color5`}
										key={i}
									>
										<Link to={`${prev.url}`} className="text-decoration-none color5">{prev.name}</Link>
									</li>

								);
							})}
						</ul>
					</div>
					<div className="d-flex align-items-center">
						<div className="top_side d-none d-md-flex align-items-center ps-4">
							{(localMode === "1" && (
								<img
									onClick={() => {
										setMode(2);
										localStorage.setItem("modeLocal", 2);
									}}
									className="star_light pointer"
									src={star}
									alt="star"
								/>
							)) || (
									<img
										onClick={() => {
											setMode(1);
											localStorage.setItem("modeLocal", 1);
										}}
										className="star_light pointer"
										src={sun}
										alt="star"
									/>
								)}
							<BsFillBellFill
								className="ms-0 ms-md-3 pointer"
								fontSize="1.8rem"
								color="#3b3b3b"
							/>
							<IoPersonCircleSharp
								className="ms-0 ms-md-3 pointer"
								fontSize="2.2rem"
								color="#3b3b3b"
							/>
						</div>
						<BiExit
							className="ms-0 ms-md-3 pointer"
							fontSize="2rem"
							color="#3b3b3b"
							onClick={()=>logout()}
						/>
					</div>
				</div>}
				{/* CHILDREN */}
				{children}
			</div>
		</div>
	);
};

export default Layout;
