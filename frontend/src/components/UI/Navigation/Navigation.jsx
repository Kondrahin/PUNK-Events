import React from 'react';
import './Navigation.sass'

export const LoginNavigation = () => {
    return (
        <div>
            <input type="checkbox" id="menu" name="menu" className="menu-checkbox"/>
            <div className="menu">
                <label className="menu-toggle" htmlFor="menu"><span>Toggle</span></label>
                <ul>
                    <li>
                        <a href="#">Вход</a>
                    </li>
                    <li>
                        <a href="create">Создать мероприятие</a>
                    </li>
                    <li>
                        <a href="events/own">Мои мероприятия</a>
                    </li>
                    <li>
                        <a href="events">Активные мероприятия</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const UserEventsNavigation = () => {
    return (
        <div>
            <input type="checkbox" id="menu" name="menu" className="menu-checkbox"/>
            <div className="menu">
                <label className="menu-toggle" htmlFor="menu"><span>Toggle</span></label>
                <ul>
                    <li>
                        <a href="../login">Вход</a>
                    </li>
                    <li>
                        <a href="../create">Создать мероприятие</a>
                    </li>
                    <li>
                        <a href="#">Мои мероприятия</a>
                    </li>
                    <li>
                        <a href="../events">Активные мероприятия</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const EventsNavigation = () => {
    return (
        <div>
            <input type="checkbox" id="menu" name="menu" className="menu-checkbox"/>
            <div className="menu">
                <label className="menu-toggle" htmlFor="menu"><span>Toggle</span></label>
                <ul>
                    <li>
                        <a href="login">Вход</a>
                    </li>
                    <li>
                        <a href="create">Создать мероприятие</a>
                    </li>
                    <li>
                        <a href="../events/own">Мои мероприятия</a>
                    </li>
                    <li>
                        <a href="#">Активные мероприятия</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};


export const CreateEventsNavigation = () => {
    return (
        <div>
            <input type="checkbox" id="menu" name="menu" className="menu-checkbox"/>
            <div className="menu">
                <label className="menu-toggle" htmlFor="menu"><span>Toggle</span></label>
                <ul>
                    <li>
                        <a href="login">Вход</a>
                    </li>
                    <li>
                        <a href="#">Создать мероприятие</a>
                    </li>
                    <li>
                        <a href="events/own">Мои мероприятия</a>
                    </li>
                    <li>
                        <a href="events">Активные мероприятия</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};


export const DefaultNavigation = () => {
    return (
        <div>
            <input type="checkbox" id="menu" name="menu" className="menu-checkbox"/>
            <div className="menu">
                <label className="menu-toggle" htmlFor="menu"><span>Toggle</span></label>
                <ul>
                    <li>
                        <a href="../login">Вход</a>
                    </li>
                    <li>
                        <a href="../create">Создать мероприятие</a>
                    </li>
                    <li>
                        <a href="../events/own">Мои мероприятия</a>
                    </li>
                    <li>
                        <a href="../events">Активные мероприятия</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
