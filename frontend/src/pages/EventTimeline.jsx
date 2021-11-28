import '../App.css';
import Timeline from "../components/UI/timeline/Timeline";
import axios from "axios";
import {useAsync} from "react-async"
import {getHeaders} from "../services/api_utils";
import {EventsNavigation} from "../components/UI/Navigation/Navigation";

const getEvents = async () => {
    let headers = getHeaders()
    const response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events/", headers)
    return response.data["events"]
}

const EventTimeline = () => {

    const {data, error, isPending} = useAsync({promiseFn: getEvents})

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div className="EventTimeline" style={{backgroundColor: "black"}}>
                <EventsNavigation/>
                <Timeline usersEvents={data}/>
            </div>

        );
    }
    return null
}

export default EventTimeline;
