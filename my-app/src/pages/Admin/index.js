import React from "react";
import "./style.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Admin = () => {
	return (
		<div>
			{/* BOTTOM SECTION */}
			<div className="mt-4">
				<div className="container-fluid px-4 py-3">
					<div className="row gy-4">
						<div className="col-12 rounded-3">
							<div className="d-flex w-100 justify-content-between align-items-center mb-4">
								<h4>Manage Users</h4>
								<button className="px-4 border-0 bg-purple-dark text-white rounded-3 py-1">
									Add User
								</button>
							</div>

							<div className="bg-white rounded-3 w-100">
								<div className="d-flex justify-content-between align-items-center px-4 pt-4 pb-3">
									<p className="mb-0 fw600">User List</p>
									<div className="position-relative">
										<input
											type="text"
											name=""
											id=""
											className="rounded-pill py-2 border-0 bg-light ps-5 text-muted"
											placeholder="search user"
										/>
										<HiOutlineSearch
											className="text-muted position-absolute search-icon"
											fontSize={18}
										/>
									</div>
								</div>
								<div className="table_container">
									<table class="table table-hover table-borderless">
										<thead>
											<tr className="bg-light">
												<th className="fw500 color2 ps-4">No</th>
												<th className="fw500 color2">Profile</th>
												<th className="fw500 color2">Email</th>
												<th className="fw500 color2">Role</th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => {
												return (
													<tr key={i} className="color5">
														<td className="ps-4">{i + 1}</td>
														<td>
															<img
																className="rounded-circle img-size me-3"
																src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzU0TzPs9_dXeFrcFPXeWl4Ue6u5dkfd-39sploKT915Ms5tg-pmiZlrkOi9ZFAU6xvK8&usqp=CAU"
																alt=""
															/>
															Randy Substimus
														</td>
														<td>jack-kalis@gmail.com</td>
														<td>{i + 1}</td>
														<td className="text-end">
															<button className="px-4 bg-light border border-1 border-gray rounded-1 text-muted">
																<div className="d-flex align-items-center f14 py-1">
																	<FiEdit className="me-2" /> Edit
																</div>
															</button>
														</td>
														<td className="text-center">
															<button className="px-3 bg-light border border-1 border-gray rounded-1 text-muted">
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
										Rows per page:{" "}
										<select
											name=""
											id=""
											className="border-0 text-muted bg-transparent"
										>
											<option value="10">10</option>
											<option value="5">5</option>
											<option value="2">2</option>
										</select>
									</p>
									<div className="d-flex align-items-center mt-2 mt-md-0">
										<p className="mb-0 small text-muted me-3">
											1-10 of 50 Items
										</p>
										<IoIosArrowBack className="text-muted me-1" />
										<IoIosArrowForward className="text-muted" />
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
