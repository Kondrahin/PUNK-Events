import '../App.css';
import Timeline from "../components/UI/timeline/Timeline";
import axios from "axios";
import {getCookie} from "../services/cookie";
import {useEffect, useState} from "react";
import { useAsync } from "react-async"

const getEvents = async () => {
    let headers = getHeaders()
    const response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events/", headers)
    // console.log(response.data["events"])
    // setUsersEvents(response.data["events"])
    return response.data["events"]
}

function getHeaders() {
    let token = JSON.parse(getCookie("token"))
    if (token) {
        return {
            headers: {
                Authorization: "Bearer " + JSON.stringify(token)
            }
        }
    }
    return {}
}

const EventTimeline = () => {

    const {data, error, isPending} = useAsync({promiseFn: getEvents})

    // useEffect(() => {
    //     You need to restrict it at some point
    //     This is just dummy code and should be replaced by actual
    //     if (!usersEvents) {
    //         getEvents();
    //     }
    // }, []);

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div className="EventTimeline">
                <Timeline usersEvents={data}/>
            </div>
        );
    }
    return null
}

export default EventTimeline;
