import React from 'react';
import {useParams} from "react-router";
import axios from "axios";
import {useAsync} from "react-async";
import MyEventInfo from "../components/UI/EventInfo/MyEventInfo";
import {getHeaders} from "../services/api_utils";


const getEvent = async ({event_uuid}) => {
    let headers = getHeaders()
    let response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events?event_uuid="+event_uuid, headers)
    let event = response.data["events"]
    response = await axios.get(process.env.REACT_APP_BACKEND_API + "/user/", headers)
    return [event, response]
}

const EventInfo = () => {

    const { event_uuid } = useParams()
    const {data, error, isPending} = useAsync({promiseFn: getEvent, event_uuid:event_uuid})

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div>
                <MyEventInfo data={data}/>
            </div>
        );
    }
    return null
};

export default EventInfo;
