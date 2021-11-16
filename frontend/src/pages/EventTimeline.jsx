import '../App.css';
import Timeline from "../components/UI/timeline/Timeline";
import axios from "axios";
import {getCookie} from "../services/cookie";
import {useAsync} from "react-async"

const getEvents = async () => {
    let headers = getHeaders()
    const response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events/", headers)
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

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div className="EventTimeline" style={{backgroundColor:"black"}}>
                <Timeline usersEvents={data}/>f
            </div>
        );
    }
    return null
}

export default EventTimeline;
