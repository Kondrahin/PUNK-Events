import React from 'react';
import MyNotFound from "../components/UI/MyNotFound/MyNotFound";
import {DefaultNavigation} from "../components/UI/Navigation/Navigation";

const NotFound = () => {
    return (
        <div>
            <DefaultNavigation/>
            <MyNotFound/>
        </div>
    );
};

export default NotFound;
