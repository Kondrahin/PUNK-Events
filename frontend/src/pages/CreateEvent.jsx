import React, {useState} from 'react';
import axios from "axios";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import toast, {Toaster} from 'react-hot-toast';
import {zoomIn} from 'react-animations';
import CreateEventForm from "../components/UI/create_event/CreateEventForm";
import {getCookie} from "../services/cookie";
import Radium, {StyleRoot} from 'radium';

const CreateEvent = () => {

    const styles = {
        zoomIn: {
            animation: 'x 0.5s',
            animationName: Radium.keyframes(zoomIn, 'bounce')
        }
    }

    const [createEventModal, setCreateEventModal] = useState(false)

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
        setCreateEventModal(false)
        toast('Мероприятие успешно создано!', {icon: '✅'});
        return response.data
    }


    return (
        <div className="CreateEvent">
            <MyButton onClick={() => setCreateEventModal(true)}>Создать мероприятие</MyButton>
            <MyModal visible={createEventModal} setVisible={setCreateEventModal}>
                <StyleRoot>
                    <div className="CreateForm" style={styles.zoomIn}>
                        <CreateEventForm create={createEvent} setVisible={setCreateEventModal}/>
                    </div>
                </StyleRoot>
            </MyModal>
            <Toaster/>
        </div>
    );
}

export default CreateEvent;
