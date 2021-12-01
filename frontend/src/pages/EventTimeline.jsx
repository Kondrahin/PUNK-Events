import '../App.css';
import Timeline from "../components/UI/timeline/Timeline";
import axios from "axios";
import {useAsync} from "react-async"
import {getHeaders} from "../services/api_utils";
import {EventsNavigation} from "../components/UI/Navigation/Navigation";
import toast from "react-hot-toast";
import React from "react";

const getEvents = async () => {
    let headers = getHeaders()
    try {
        var response = await axios.get(process.env.REACT_APP_BACKEND_API + "/events/", headers)
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

const EventTimeline = () => {

    const {data, error, isPending} = useAsync({promiseFn: getEvents})

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div>
                <EventsNavigation/>
                <div className="EventTimeline" style={{backgroundColor: "lightgray"}}>
                    <Timeline usersEvents={data}/>
                </div>
            </div>
        );
    }
    return (
        <div>
            <EventsNavigation/>
            <div className="position-absolute top-50 start-50 translate-middle">
                <h1>Мероприятий не найдено!</h1>
                <h2>Перейдите на страницу создания мероприятий и создайте мероприятие</h2>
            </div>
        </div>
    )
}

export default EventTimeline;
