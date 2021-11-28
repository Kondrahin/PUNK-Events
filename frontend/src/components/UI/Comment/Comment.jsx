import React from 'react';
import {getHeaders} from "../../../services/api_utils";
import axios from "axios";
import {useAsync} from "react-async";
import toast from "react-hot-toast";

async function getUser(user_uuid) {
    let headers = getHeaders()
    headers.params = {
        user_uuid: user_uuid
    }
    let response = await axios.get(process.env.REACT_APP_BACKEND_API + "/user/", headers)
    return response.data["user"]
}

async function deleteComment(comment_uuid) {
    let headers = getHeaders()
    headers.params = {
        comment_uuid: comment_uuid
    }
    await axios.delete(process.env.REACT_APP_BACKEND_API + "/comments/", headers)
    toast('Комментарий успешно удален!', {icon: '✅'});
    window.location.reload();
}

const getComments = async (comments) => {
    let commentsComponentList = []

    for (let key of Object.keys(comments.comments.comments)) {
        let comment = comments.comments.comments[key];
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
                {user.uuid === comment.user_uuid &&
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-outline-danger" type="button"
                            onClick={() => deleteComment(comment.uuid)}>Удалить
                    </button>
                </div>
                }
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
