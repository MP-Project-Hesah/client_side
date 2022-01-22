import React, { useEffect, useState } from "react";
import "./style.css";
// import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import api from "../../utils/api"; // import base api url with axios
import { useAuthContext } from "../../Context/auth.context"; // import context hook 

const Admin = () => {
	// import logout function
	const { logout } = useAuthContext();
	// set podcast list
	const [podcasts, setPodcasts] = useState([])
	// set pagination object
	const [pagination, setPagination] = useState({
		total: 0,
		limit: 10,
		page: 1,
		hasPrevPage: false,
		hasNextPage: false
	})
	// use effect to call the api first time
	useEffect(() => {
		getListOfPodcast({ limit: 10, page: 1 });// calling api with default pagination
	}, []);
	const getListOfPodcast = (body) => {
		// calling api to load podcast list for admin with the owner of the podcast
		api.post('/admin/podcast/all/list', body).then(({ data }) => {
			setPodcasts(data.docs);
			// setting default pagination
			setPagination({
				total: data.totalDocs,
				limit: data.limit,
				page: data.page,
				hasPrevPage: data.hasPrevPage, 
				
				hasNextPage: data.hasNextPage
			})
		}).catch((error) => {
			// check error and set alert message
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				alert(error.response.data)
				// if user unauthorized  logout function call and user redirect to the login page
				logout();
			} else {
				alert('Network Error!')
			}
		})
	}
	const deletePodcast = (id) => {
		let prompt = window.confirm("Are you sure?"); // asking to the user that he is sure to delete the podcast
		if (!prompt) {
			return;
		}
		// delete podcast sending id as params
		api.delete(`/podcast/${id}`).then(({ data }) => {
			alert('Podcast Deleted!');
			getListOfPodcast();
		}).catch((error) => {
			if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 500) {
				alert(error.response.data)
			} else if (error && error.response && error.response.status === 401) {
				alert(error.response.data)
				// if user unauthorized  logout function call and user redirect to the login page
				logout();
			} else {
				alert('Network Error!')
			}
		})
	}
	// Set no of podcast show per page
	const onChangeLimit = (value) => {
		setPagination({
			...pagination,
			limit: Number(value)
		})
		//calling api
		getListOfPodcast({ page: pagination.page, limit: Number(value) })
	}
	// change page no to show list of podcast
	const pageChange = (value) => {
		setPagination({
			...pagination,
			page: value
		})
		// calling api
		getListOfPodcast({ page: value, limit: pagination.limit })
	}
	return (
		<div>
			{/* BOTTOM SECTION */}
			<div className="mt-4">
				<div className="container-fluid px-4 py-3">
					<div className="row gy-4">
						<div className="col-12 rounded-3">
							<div className="d-flex w-100 justify-content-between align-items-center mb-4">
								<h4>Manage Podcasts</h4>
								{/* <button className="px-4 border-0 bg-purple-dark text-white rounded-3 py-1">
									Add User
								</button> */}
							</div>

							<div className="bg-white rounded-3 w-100">
								<div className="d-flex justify-content-between align-items-center px-4 pt-4 pb-3">
									<p className="mb-0 fw600">Podcast List</p>
									<div className="position-relative">
										<input
											type="text"
											name=""
											id=""
											className="rounded-pill py-2 border-0 bg-light ps-5 text-muted"
											placeholder="search"
										/>
										<HiOutlineSearch
											className="text-muted position-absolute search-icon"
											fontSize={18}
										/>
									</div>
								</div>
								<div className="table_container">
									<table className="table table-hover table-borderless">
										<thead>
											<tr className="bg-light">
												<th className="fw500 color2 ps-4">No</th>
												<th>Podcast</th>
												<th className="fw500 color2">User</th>
												{/* <th className="fw500 color2">Role</th> */}

												<th></th>
											</tr>
										</thead>
										<tbody>
											{podcasts.map((item, i) => {
												return (
													<tr key={i} className="color5">
														<td className="ps-4">{i + pagination.page}</td>
														<td>{item.name}</td>
														<td>
															<img
																className="rounded-circle img-size me-3"
																src={item.userId.avatar || ''}
																alt=""
															/>
															{item.userId.name}
														</td>
														{/* <td>jack-kalis@gmail.com</td> */}
														{/* <td>{i + 1}</td> */}
														{/* <td className="text-end">
															<button className="px-4 bg-light border border-1 border-gray rounded-1 text-muted">
																<div className="d-flex align-items-center f14 py-1">
																	<FiEdit className="me-2" /> Edit
																</div>
															</button>
														</td> */}
														<td className="text-center">
															<button onClick={() => deletePodcast(item._id)} className="px-3 bg-light border border-1 border-gray rounded-1 text-muted">
																<div className="d-flex align-items-center f14 py-1">
																	<MdDelete className="me-2" /> Delete
																</div>
															</button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								<div className="d-flex flex-column flex-md-row justify-content-between align-items-center ps-4 pe-5 pt-4 pb-3">
									<p className="mb-0 text-muted">
										{/* Rows per page:{" "} */}
										<select
											name="limit"
											id="limit"
											className="border-0 text-muted bg-transparent"
											value={pagination.limit}
											onChange={(e) => onChangeLimit(e.target.value)}
										>
											<option value="10">10</option>
											<option value="5">5</option>
											<option value="2">2</option>
											<option value="1">1</option>
										</select>
									</p>
									<div className="d-flex align-items-center mt-2 mt-md-0">
										<p className="mb-0 small text-muted me-3">
											{pagination.page}-{pagination.limit} of {pagination.total} Items
										</p>
										<button
											onClick={() => pageChange(pagination.page - 1)}
											style={{ background: 'none', border: 'none' }}
											disabled={!pagination.hasPrevPage}
										><IoIosArrowBack className="text-muted me-1" /></button>
										<button
											onClick={() => pageChange(pagination.page + 1)}
											disabled={!pagination.hasNextPage}
											style={{ background: 'none', border: 'none' }}
										><IoIosArrowForward className="text-muted" /></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
