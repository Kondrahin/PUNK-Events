import {getCookie} from "./cookie";

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
