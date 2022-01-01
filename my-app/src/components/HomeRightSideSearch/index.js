import React from "react";
import "./style.css";

const HomeRightSideSearch = () => {
	return (
		<div className="bg-white rounded-3">
			<div className="d-flex justify-content-between align-items-center px-4 pt-3">
				<input
					type="text"
					name=""
					id=""
					placeholder="Type of Search"
					className="w-100 border-0 rounded-3 shadow search_type px-3"
				/>
			</div>
			<br />

			<div className="px-4">
				<ol>
					{[1, 1, 1, 1, 1].map(() => {
						return <li className="py-1 color3">Lorem ipsum dolor sit amet</li>;
					})}
				</ol>
			</div>
		</div>
	);
};

export default HomeRightSideSearch;
