import React from 'react';
import {getHeaders} from "../../../services/api_utils";
import axios from "axios";
import {useAsync} from "react-async";

async function getUser(user_uuid) {
    let headers = getHeaders()
    headers.params = {
        user_uuid: user_uuid
    }
    let response = await axios.get(process.env.REACT_APP_BACKEND_API + "/user/", headers)
    return response.data["user"]
}

const getComments = async (comments) => {
    let commentsComponentList = []

    for (let key of Object.keys(comments.comments.comments)) {
        var comment = comments.comments.comments[key];
        let created_datetime = new Date(comment.created_datetime)
        let user = await getUser(comment.user_uuid)
        commentsComponentList.push(
            <div className="card p-3" key={comment.uuid}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                                    <span><small
                                        className="font-weight-bold text-primary">{user.full_name}</small> <small
                                        className="font-weight-bold">{comment.data}</small></span></div>
                </div>
                <div className="action d-flex justify-content-between mt-2 align-items-center">
                    <ul className="list-inline media-detail pull-left">
                        <div className="icons align-items-center">
                            <i className="fa fa-calendar"
                               aria-hidden="true">{created_datetime.toLocaleDateString()}</i>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }

    return commentsComponentList
}

const Comment = (comments) => {

    const {data, error, isPending} = useAsync({promiseFn: getComments, comments: comments})

    if (error) {
        console.log(error)
    }
    if (isPending) return "Loading..."
    if (data) {
        return (
            <div>
                {data}
            </div>
        );
    }
};

export default Comment;
