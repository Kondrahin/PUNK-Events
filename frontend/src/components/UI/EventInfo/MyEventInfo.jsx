import React, {useState} from 'react';
import './MyEventInfo.css'
import CommentsBlock from "../CommentsBlock/CommentsBlock";
import {getHeaders, getModeratorsUUIDS} from "../../../services/api_utils";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useAsync} from "react-async";
import Radium, {StyleRoot} from "radium";
import MyModal from "../modal/MyModal";
import {zoomIn} from "react-animations";
import UpdateEventForm from "../UpdateEvent/UpdateEventForm";
import {hasKeyValue} from "../../../services/js_utils";
import ParticipantsList from "../ParticipantsList/ParticipantsList";


function showParticipantsList(setParticipantsList, participantsList) {
    if (participantsList.length === 0) {
        toast('Участники не найдены', {icon: '🙁'});
        return null
    }
    setParticipantsList(true)
}

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
        }
        toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
        return
    }
    toast('Мероприятие успешно удалено!', {icon: '✅'});
    navigate('/events/')
    return response.data
}

async function addParticipant(event_uuid, user_uuid) {
    let headers = getHeaders()
    headers.params = {
        event_uuid: event_uuid,
        participant_uuid: user_uuid
    }
    try {
        var response = await axios.put(process.env.REACT_APP_BACKEND_API + "/events/participants", {}, headers)
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            if (error.response.status === 403) {
                toast('Войдите в свой аккаунт!', {icon: '🔒'});
                return
            }
        }
        toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
        return
    }
    toast('Участник успешно добавлен!', {icon: '✅'});
    window.location.reload()
    return response.data
}


async function deleteParticipant(event_uuid, user_uuid) {
    let headers = getHeaders()
    headers.params = {
        event_uuid: event_uuid,
        participant_uuid: user_uuid
    }
    try {
        var response = await axios.delete(process.env.REACT_APP_BACKEND_API + "/events/participants", headers)
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403) {
                toast('Войдите в свой аккаунт!', {icon: '🔒'});
                return
            }
        }
        toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
        return
    }
    toast('Участник успешно удален!', {icon: '✅'});
    window.location.reload()
    return response.data
}

async function getEvent({data, navigate, setUpdateEventModal, setParticipantsList}) {
    let buttons = null
    let willGoButtons = []
    const moderators_uuids = await getModeratorsUUIDS()

    let eventInfo = data[0]
    let user = data[1].data.user
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    let event_datetime = new Date(eventInfo.event_datetime)

    if (user.uuid === eventInfo.creator || user.uuid in moderators_uuids) {
        buttons = (
            <div className="btn-group position-absolute top-0 end-0" role="group" aria-label="Basic outlined example">
                <button type="submit" className="btn btn-outline-primary"
                        onClick={() => deleteEvent(eventInfo.uuid, navigate)}>Удалить
                </button>
                <button type="submit" className="btn btn-outline-primary"
                        onClick={() => setUpdateEventModal(true)}>Изменить
                </button>
            </div>
        )
    }
    if (hasKeyValue(eventInfo.participants, "uuid", user.uuid)) {
        willGoButtons = (
            <div>
                <button type="submit" className="btn btn-outline-primary me-md-3"
                        onClick={() => showParticipantsList(setParticipantsList, eventInfo.participants)}>Показать
                    список участников
                </button>
                <button type="submit" className="btn btn-outline-danger me-md-3"
                        onClick={() => deleteParticipant(eventInfo.uuid, user.uuid)}>Не пойду
                </button>
            </div>
        )
    } else {
        willGoButtons = (
            <div>
                <button type="submit" className="btn btn-outline-primary me-md-3"
                        onClick={() => showParticipantsList(setParticipantsList, eventInfo.participants)}>Показать
                    список участников
                </button>
                <button type="submit" className="btn btn-outline-success me-md-3"
                        onClick={() => addParticipant(eventInfo.uuid, user.uuid)}>Пойду
                </button>
            </div>
        )
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
                <div className="button">
                    {willGoButtons}
                </div>
            </div>
            {buttons}
            <div className="comments"><CommentsBlock comments={eventInfo.comments} event_uuid={eventInfo.uuid}/></div>
        </div>
    );
}


const MyEventInfo = ({eventData}) => {

    const navigate = useNavigate();
    const [updateEventModal, setUpdateEventModal] = useState(false)
    const [participantsList, setParticipantsList] = useState(false)

    let eventInfo = eventData[0]

    async function updateEvent(event) {
        let headers = getHeaders()
        headers.params = {
            event_uuid: eventInfo.uuid
        }
        const updatedEvent = {
            title: event.title,
            description: event.description,
            scope: event.scope,
            location: event.location,
            event_datetime: event.event_datetime
        }
        try {
            await axios.put(process.env.REACT_APP_BACKEND_API + "/events/", updatedEvent, headers)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast('Войдите в свой аккаунт!', {icon: '🔒'});
                    return
                }
            }
            toast('Что-то пошло не так, попробуйте позже...', {icon: '😥'});
            return
        }
        setUpdateEventModal(false)
        toast('Мероприятие успешно изменено!', {icon: '✅'});
        window.location.reload()
    }

    const styles = {
        zoomIn: {
            animation: 'x 0.5s',
            animationName: Radium.keyframes(zoomIn, 'bounce'),
        }
    }

    const {data, error, isPending} = useAsync({
        promiseFn: getEvent,
        navigate: navigate,
        data: eventData,
        setUpdateEventModal: setUpdateEventModal,
        setParticipantsList: setParticipantsList
    })

    if (isPending) return "Loading..."
    if (data) {
        return (
            <div>
                <div className="UpdateForm">
                    <MyModal visible={updateEventModal} setVisible={setUpdateEventModal}>
                        <StyleRoot>
                            <div style={styles.zoomIn}>
                                <UpdateEventForm update={updateEvent} setVisible={setUpdateEventModal}
                                                 event={eventInfo}/>
                            </div>
                        </StyleRoot>
                    </MyModal>
                </div>
                {participantsList && <div className="ParticipantsList">
                    <MyModal visible={participantsList} setVisible={setParticipantsList}>
                        <StyleRoot>
                            <div style={styles.zoomIn}>
                                <ParticipantsList participantsList={eventInfo.participants}/>
                            </div>
                        </StyleRoot>
                    </MyModal>
                </div>
                }
                {data}
            </div>
        );
    }
    return null
};

export default MyEventInfo;
