import React from 'react';
import {getHeaders} from "../services/api_utils";
import axios from "axios";
import {useAsync} from "react-async";
import {UserEventsNavigation} from "../components/UI/Navigation/Navigation";
import Timeline from "../components/UI/timeline/Timeline";
import toast from "react-hot-toast";


const getUserEvents = async () => {
    let headers = getHeaders()
    headers.params = {
        own_events: true
    }
    try {
        var response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events", headers)
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403) {
                toast('Войдите в свой аккаунт!', {icon: '🔒'});
                return
            }
            if (error.response.status === 404) {
                return null
            }
        }
        toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
        return
    }
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
    return (
        <div>
            <UserEventsNavigation/>
            <div className="position-absolute top-50 start-50 translate-middle">
                <h1>Мероприятий не найдено!</h1>
                <h2>Перейдите на страницу создания мероприятий и создайте мероприятие</h2>
            </div>
        </div>
    )
};

export default UserEvents;
