import './App.css';
import React, {useState} from 'react';
import axios from "axios";
import MyGoogleLogin from "./API/GoogleLogin";
import CreateEvent from "./components/UI/create_event/CreateEvent";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";
import toast, {Toaster} from 'react-hot-toast';

function App() {

    const [authResponse, setAuthResponse] = useState()
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
                    alert("You need login first.")
                }
            } else if (error.request) {
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
        <div className="App">
            <MyGoogleLogin authResponse={authResponse} setAuthResponse={setAuthResponse}/>
            <MyButton onClick={() => setCreateEventModal(true)}/>
            <MyModal visible={createEventModal} setVisible={setCreateEventModal}>
                <CreateEvent create={createEvent} setVisible={setCreateEventModal}/>
            </MyModal>
            <Toaster/>
        </div>
    );
}

export default App;
