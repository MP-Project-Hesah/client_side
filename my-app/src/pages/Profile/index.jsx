import React, { useState } from "react";
import "./style.css";
import { BsFacebook } from "react-icons/bs";
import {
	// AiFillInstagram,
	AiFillYoutube,
	// AiFillLinkedin,
	AiFillTwitterCircle,
} from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import PopUp from '../../components/updatePopup';
import { useAuthContext } from "../../Context/auth.context";
import moment from "moment";

// default image 
const noImage = "https://i.stack.imgur.com/y9DpT.jpg";

const Profile = () => {
	const [popup, setPopup] = useState(false);
	const { user } = useAuthContext();

	//open the facebook profile
	const openFacebook=()=>{
		if(user && user.facebook){
			window.open(user.facebook,'_self');
		}
	}
	const openWhatsapp=()=>{
		if(user && user.Whatsapp){
			window.open(user.Whatsapp,'_self');
		}
	}
	return (
		<div className="profile-container">
			{popup && <PopUp setPopup={setPopup} />}
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
								src={user && user.avatar || noImage}
								alt=""
							/>
							{/* <p className="text-muted mt-3 mb-2">Lorem ipsum dolor sit.</p> */}
							<h1 className="display-5 fw600">{user && user.name}</h1>
							<p className="text-muted f18 fw600">{user && user.profession}</p>
						</div>

						<div className="row mt-5">
							<div className="col-14">
								<button onClick={() => setPopup(true)} className="text-white btn btn-lg px-4 bg-purple-dark mb-4">Update</button>
							</div>
							<div className="col-4">
								<h1 className="display-9 fw500">Profile</h1>
							</div>
							<div className="col-8">
								<h4 className="fw500">Bio</h4>
								<p className="color5">
									{user && user.bio}
								</p>
							</div>
							<div className="col-4 mt-5">
								<h1 className="display-8 fw500">Date Of Birth</h1>
							</div>
							<div className="col-6 mt-5">
								<h4>{moment(user.DOB).format('MM / DD / YYYY')}</h4>
							</div>
							<div className="col-4 mt-5">
								<h1 className="display-6 fw500">My Social Media</h1>
							</div>
							<div className="col-8 mt-5">
								<BsFacebook onClick={() => openFacebook()} fontSize={40} className="me-2 pointer" color="#0676e8" />
								{/* <AiFillInstagram 
									fontSize={48}
									className="me-2"
									color="#cf004b"
								/>
								<AiFillLinkedin
									fontSize={45}
									className="me-2"
									color="#0961b8"
								/> */}
								<IoLogoWhatsapp onClick={()=> openWhatsapp()} 
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
