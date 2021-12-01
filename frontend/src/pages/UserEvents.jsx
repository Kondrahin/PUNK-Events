import React from 'react';
import {getHeaders} from "../services/api_utils";
import axios from "axios";
import {useAsync} from "react-async";
import {UserEventsNavigation} from "../components/UI/Navigation/Navigation";
import Timeline from "../components/UI/timeline/Timeline";


const getUserEvents = async () => {
    let headers = getHeaders()
    headers.params = {
        own_events: true
    }
    const response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events", headers)
    return response.data["events"]
}


const UserEvents = () => {

    const {data, error, isPending} = useAsync({promiseFn: getUserEvents})

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div>
                <UserEventsNavigation/>
                <div className="EventTimeline" style={{backgroundColor: "lightgray"}}>
                    <Timeline usersEvents={data}/>
                </div>
            </div>
        );
    }
};

export default UserEvents;
