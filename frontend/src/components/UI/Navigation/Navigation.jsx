import React from 'react';

export const LoginNavigation = () => {
    return (
        <div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link disabled" aria-current="page" href="login" aria-disabled="true">Вход</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="create">Создать мероприятие</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="events">Активные мероприятия</a>
                </li>
            </ul>
        </div>
    );
};

export const EventsNavigation = () => {
    return (
        <div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="login">Вход</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../create">Создать мероприятие</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" aria-current="page" href="events" aria-disabled="true">Активные
                        мероприятия</a>
                </li>
            </ul>
        </div>
    );
};


export const CreateEventsNavigation = () => {
    return (
        <div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="login">Вход</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="create" aria-disabled="true">Создать мероприятие</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="events">Активные мероприятия</a>
                </li>
            </ul>
        </div>
    );
};


export const DefaultNavigation = () => {
    return (
        <div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="../login">Вход</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../create">Создать мероприятие</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="../events">Активные мероприятия</a>
                </li>
            </ul>
        </div>
    );
};
