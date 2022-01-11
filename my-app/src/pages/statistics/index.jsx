import React, { Fragment, useEffect, useState } from "react";
import { AiFillEye } from 'react-icons/ai';
import api from "../../utils/api";
import { useAuthContext } from "../../Context/auth.context";
const Satistics = () => {
    const { logout } = useAuthContext();
    const [totalViews, setTotalViews] = useState(0);
    useEffect(() => {
        getTotalPodcastView();
    }, []);

    // calling api to get the stats about how many time other users view my podcast
    const getTotalPodcastView = () => {
        api.get(`/podcast/total/views`).then(({ data }) => {
            setTotalViews(data);
        }).catch(error => {
            if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
                alert(error.response.data)
            } else if (error && error.response && error.response.status === 500) {
                alert(error.response.data)
            } else if (error && error.response && error.response.status === 401) {
                alert(error.response.data)
                logout();
            } else {
                alert('Network Error!')
            }
        })
    }

    return (
        <Fragment>
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="card shadow mb-3">
                            <div className="card-body text-center">
                                <AiFillEye
                                    className="pointer"
                                    fontSize="2.2rem"
                                    color="#8961de"
                                />
                                <p className="card-text my-2">Total Views</p>
                                <h1 className="color1" >{totalViews}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Satistics;
