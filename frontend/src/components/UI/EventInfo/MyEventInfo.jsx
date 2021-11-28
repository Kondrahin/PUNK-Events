import React from 'react';
import './MyEventInfo.css'
import CommentsBlock from "../CommentsBlock/CommentsBlock";
import {getHeaders, getModeratorsUUIDS} from "../../../services/api_utils";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useAsync} from "react-async";

async function deleteEvent(event_uuid, navigate) {
    let headers = getHeaders()
    headers.params = {
        event_uuid: event_uuid
    }
    try {
        var response = await axios.delete(process.env.REACT_APP_BACKEND_API + "/events/", headers)
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403) {
                toast('Войдите в свой аккаунт!', {icon: '🔒'});
                return
            }
        } else if (error.request) {
            toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
            return
        } else {
            toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
            return
        }
        toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
        return
    }
    toast('Мероприятие успешно удалено!', {icon: '✅'});
    navigate('/events/')
    return response.data
}


async function getEvent({data, navigate}) {
    let button = null
    const moderators_uuids = await getModeratorsUUIDS()

    let eventInfo = data[0]
    let user = data[1].data.user
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    let event_datetime = new Date(eventInfo.event_datetime)

    if (user.uuid === eventInfo.creator || user.uuid in moderators_uuids) {
        button = <button type="submit" onClick={() => deleteEvent(eventInfo.uuid, navigate)}
                         className="btn btn-normal position-absolute top-0">Удалить мероприятие</button>
    }

    return (
        <div>
            <div className="position-static">
                <div className="position-absolute start-50 p-5 translate-middle-x">
                    <h1 className="display-1">{eventInfo.title}</h1>
                </div>
                <div className="description">
                    <p className="lead">
                        {eventInfo.description}
                    </p>

                </div>
                <div className="position-absolute top-50 start-50 translate-middle-x">
                    <h6 className="lead"><b>Место проведения:</b> {eventInfo.location} <br/></h6>
                    <h6 className="lead"><b>Дата проведения:</b> {event_datetime.toLocaleDateString("ru", options)}</h6>
                </div>

            </div>
            {button}
            <div className="comments"><CommentsBlock comments={eventInfo.comments} event_uuid={eventInfo.uuid}/></div>
        </div>
    );
}


const MyEventInfo = ({eventData}) => {
    const navigate = useNavigate();


    const {data, error, isPending} = useAsync({promiseFn: getEvent, navigate: navigate, data: eventData})

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div>
                {data}
            </div>
        );
    }
    return null
};

export default MyEventInfo;
