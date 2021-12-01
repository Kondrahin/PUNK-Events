import {getCookie} from "./cookie";
import axios from "axios";

export function getHeaders() {
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


export async function getModeratorsUUIDS() {
    let headers = getHeaders()
    let response = await axios.get(process.env.REACT_APP_BACKEND_API + "/moderators", headers)
    let moderators = response.data["moderators"]
    let moderators_uuids = []
    for (let value of moderators.values()) {
        moderators_uuids.push(value.uuid);
    }
    return moderators_uuids
}
