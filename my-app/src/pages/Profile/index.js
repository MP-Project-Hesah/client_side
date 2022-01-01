import React from "react";
import "./style.css";
import { BsFacebook } from "react-icons/bs";
import {
	AiFillInstagram,
	AiFillYoutube,
	AiFillLinkedin,
	AiFillTwitterCircle,
} from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const Profile = () => {
	return (
		<div className="profile-container">
			{/* BOTTOM SECTION */}
			<img
				className="bg-banner w-100"
				src="https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80"
				alt=""
			/>

			<div className="profile-content container-fluid px-4 py-3 color2">
				<div className="row gy-4">
					<div className="col-12 rounded-3">
						<div className="d-flex flex-column justify-content-center align-items-center">
							<img
								className="avtar rounded-circle"
								src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
								alt=""
							/>
							<p className="text-muted mt-3 mb-2">Lorem ipsum dolor sit.</p>
							<h1 className="display-5 fw600">Stephnie S.</h1>
							<p className="text-muted f18 fw600">Graphic Designer</p>
						</div>

						<div className="row mt-5">
							<div className="col-4">
								<h1 className="display-5 fw500">Profile</h1>
							</div>
							<div className="col-8">
								<h4 className="fw500">Bio</h4>
								<p className="color5">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
									officia commodi aliquid reprehenderit quod ducimus in officiis
									voluptatibus totam laborum aliquam doloribus vel aut, deleniti
									cumque nesciunt, sapiente maxime recusandae nostrum et
									architecto. Quos quasi repellendus pariatur ab nesciunt.
									<br />
									<br />
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
									officia commodi aliquid reprehenderit quod ducimus in officiis
									voluptatibus totam laborum aliquam doloribus vel aut, deleniti
									cumque nesciunt, sapiente maxime recusandae nostrum et
									architecto. Quos quasi repellendus pariatur ab nesciunt.
								</p>
							</div>
							<div className="col-4 mt-5">
								<h1 className="display-6 fw500">Date Of Birth</h1>
							</div>
							<div className="col-8 mt-5">
								<h4>12 / 01 / 2000</h4>
							</div>
							<div className="col-4 mt-5">
								<h1 className="display-6 fw500">My Social Media</h1>
							</div>
							<div className="col-8 mt-5">
								<BsFacebook fontSize={40} className="me-2" color="#0676e8" />
								<AiFillInstagram
									fontSize={48}
									className="me-2"
									color="#cf004b"
								/>
								<AiFillLinkedin
									fontSize={45}
									className="me-2"
									color="#0961b8"
								/>
								<IoLogoWhatsapp
									fontSize={45}
									className="me-2"
									color="#2fe664"
								/>
								<AiFillTwitterCircle
									fontSize={45}
									className="me-2"
									color="#1c99e6"
								/>
								<AiFillYoutube fontSize={50} className="me-2" color="#f10002" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
