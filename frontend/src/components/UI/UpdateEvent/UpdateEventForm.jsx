import React, {useState} from "react";
import './UpdateEvent.css'
import DatetimePicker from "../datetimepicker/DatetimePicker";


const UpdateEventForm = ({update, setVisible, event}) => {

    (function () {

        var forms = document.querySelectorAll('.needs-validation')

        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    const [userEvent, updateNewUserEvent] = useState({
        title: event.title,
        description: event.description,
        scope: event.scope,
        location: event.location,
        event_datetime: event.event_datetime,
    })

    const updateEvent = (event) => {
        event.preventDefault()
        const updatedUserEvent = {...userEvent, id: Date.now()}
        update(updatedUserEvent).then()
    }

    return (
        <div className="update-form">
            <form className="row g-3 needs-validation" noValidate onSubmit={updateEvent}>
                <div className="background">
                    <div className="container">
                        <div className="screen">
                            <div className="screen-header">
                                <div className="screen-header-left">
                                    <div className="screen-header-button close"/>
                                    <div className="screen-header-button maximize"/>
                                    <div className="screen-header-button minimize"/>
                                </div>
                                <div className="screen-header-right">
                                    <div className="screen-header-ellipsis"/>
                                    <div className="screen-header-ellipsis"/>
                                    <div className="screen-header-ellipsis"/>
                                </div>
                            </div>
                            <div className="screen-body">
                                <div className="screen-body-item left">
                                    <div className="app-title">
                                        <span>Мероприятие</span>
                                    </div>
                                </div>
                                <div className="screen-body-item">
                                    <div className="app-form">
                                        <div className="app-form-group">

                                            <div className="app-form-group">
                                                <input type="text" className="app-form-control" id="validationCustom03"
                                                       placeholder="НАЗВАНИЕ" value={userEvent.title} required
                                                       onChange={event => updateNewUserEvent({
                                                           ...userEvent,
                                                           title: event.target.value
                                                       })}/>
                                                <div className="invalid-feedback">
                                                    Укажите название
                                                </div>
                                            </div>
                                        </div>
                                        <div className="app-form-group">
                                            <input type="text" className="app-form-control" placeholder="ОПИСАНИЕ"
                                                   value={userEvent.description}
                                                   onChange={event => updateNewUserEvent({
                                                       ...userEvent,
                                                       description: event.target.value
                                                   })} required/>
                                            <div className="invalid-feedback">
                                                Укажите описание
                                            </div>
                                        </div>
                                        <div className="app-form-group">
                                            <input type="text" className="app-form-control" placeholder="СФЕРА"
                                                   value={userEvent.scope} required
                                                   onChange={event => updateNewUserEvent({
                                                       ...userEvent,
                                                       scope: event.target.value
                                                   })}/>
                                            <div className="invalid-feedback">
                                                Укажите сферу
                                            </div>
                                        </div>
                                        <div className="app-form-group">
                                            <input type="text" className="app-form-control"
                                                   placeholder="МЕСТО ПРОВЕДЕНИЯ"
                                                   value={userEvent.location}
                                                   onChange={event => updateNewUserEvent({
                                                       ...userEvent,
                                                       location: event.target.value
                                                   })} required/>
                                            <div className="invalid-feedback">
                                                Укажите место проведения
                                            </div>
                                        </div>
                                        <div className="app-form-group message">
                                            <div className="input-datetime">
                                                <label>Дата проведения мероприятия:</label>
                                            </div>
                                            <DatetimePicker setTime={updateNewUserEvent} currentEvent={userEvent}/>
                                        </div>
                                        <div className="app-form-group buttons">
                                            <button className="app-form-button" onClick={() => setVisible(false)}>Отмена
                                            </button>
                                            <button className="app-form-button" type="submit">Обновить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateEventForm;
