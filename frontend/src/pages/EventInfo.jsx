import React from 'react';
import {useParams} from "react-router";
import axios from "axios";
import {useAsync} from "react-async";
import MyEventInfo from "../components/UI/EventInfo/MyEventInfo";
import {getHeaders} from "../services/api_utils";


const getEvent = async ({event_uuid}) => {
    let headers = getHeaders()
    const response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events?event_uuid="+event_uuid, headers)
    return response.data["events"]
}

const EventInfo = () => {

    const { event_uuid } = useParams()
    const {data, error, isPending} = useAsync({promiseFn: getEvent, event_uuid:event_uuid})

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div>
                <MyEventInfo eventInfo={data}/>
            </div>
        );
    }
    return null
};

export default EventInfo;
