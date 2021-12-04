import React, {useState} from 'react';
import axios from "axios";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import toast from 'react-hot-toast';
import {zoomIn} from 'react-animations';
import CreateEventForm from "../components/UI/CreateEvent/CreateEventForm";
import Radium, {StyleRoot} from 'radium';
import {getHeaders} from "../services/api_utils";
import {CreateEventsNavigation} from "../components/UI/Navigation/Navigation";

const CreateEvent = () => {

    const styles = {
        zoomIn: {
            animation: 'x 0.5s',
            animationName: Radium.keyframes(zoomIn, 'bounce')
        }
    }

    const [createEventModal, setCreateEventModal] = useState(false)

    async function createEvent(event) {

        let headers = getHeaders()
        const newEvent = {
            title: event.title,
            description: event.description,
            scope: event.scope,
            location: event.location,
            event_datetime: event.event_datetime
        }

        try {
            var response = await axios.post(process.env.REACT_APP_BACKEND_API + "/events/", newEvent, headers)
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
        setCreateEventModal(false)
        toast('Мероприятие успешно создано!', {icon: '✅'});
        return response.data
    }


    return (
        <div className="CreateEvent">
            <CreateEventsNavigation/>
            <h1 className="display-4">Для того, чтобы создать мероприятие, нажмите на кнопку ниже.</h1>
            <div className="position-absolute top-50 start-50 translate-middle">
                <MyButton onClick={() => setCreateEventModal(true)}>Создать мероприятие</MyButton>
            </div>
            <MyModal visible={createEventModal} setVisible={setCreateEventModal}>
                <StyleRoot>
                    <div className="CreateForm" style={styles.zoomIn}>
                        <CreateEventForm create={createEvent} setVisible={setCreateEventModal}/>
                    </div>
                </StyleRoot>
            </MyModal>
        </div>
    );
}

export default CreateEvent;
