// import './App.css';
import React, {useState} from 'react';
import axios from "axios";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import toast, {Toaster} from 'react-hot-toast';
import {zoomIn} from 'react-animations';
import styled, {keyframes} from 'styled-components';
import CreateEventForm from "../components/UI/create_event/CreateEventForm";


const CreateEvent = ({authResponse}) => {

    const ZoomIn = styled.div`animation: 0.5s ${keyframes`${zoomIn}`}`;

    const [createEventModal, setCreateEventModal] = useState(false)

    function getHeaders() {
        if (authResponse) {
            return {
                headers: {
                    Authorization: "Bearer " + JSON.stringify(authResponse)
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
            const response = await axios.post(process.env.REACT_APP_BACKEND_API + "/events/", newEvent, headers)
            return response.data
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast('Войдите в свой аккаунт!', {icon: '❌'});
                    alert("You need login first.")
                }
            } else if (error.request) {
                toast('Попробуйте позже...', {icon: '😥'});
                alert("Please try again later")
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
        setCreateEventModal(false)
        toast('Мероприятие успешно создано!', {icon: '✅'});
    }


    return (
        <div className="CreateEvent">
            <MyButton onClick={() => setCreateEventModal(true)}/>
            <MyModal visible={createEventModal} setVisible={setCreateEventModal}>
                <ZoomIn>
                    <CreateEventForm create={createEvent} setVisible={setCreateEventModal}/>
                </ZoomIn>
            </MyModal>
            <Toaster/>
        </div>
    );
}

export default CreateEvent;
