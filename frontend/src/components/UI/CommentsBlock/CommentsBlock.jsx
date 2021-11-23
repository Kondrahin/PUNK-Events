import React, {useState} from 'react';
import './CommentsBlock.css'
import axios from "axios";
import toast from "react-hot-toast";
import {getHeaders} from "../../../services/api_utils";
import Comment from "../Comment/Comment";


const CommentsBlock = ({comments, event_uuid}) => {

    const [commentData, setCommentData] = useState()

    async function createComment(comment_data) {
        let headers = getHeaders()
        headers.params = {
            event_uuid: event_uuid
        }
        try {
            var response = await axios.post(process.env.REACT_APP_BACKEND_API + "/comments/", comment_data, headers)
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
        toast('Комментарий успешно опубликован!', {icon: '✅'});
        window.location.reload();
        return response.data
    }


    const postComment = (event) => {
        event.preventDefault()
        createComment(commentData).then()
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={postComment}>
                            <h3 className="pull-left">Оставить комментарий</h3>
                            <fieldset>
                                <div className="row">
                                    <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                    <textarea className="form-control" id="message" placeholder="Your comment"
                                              required="" value={commentData} onChange={event => setCommentData(event.target.value)}/>
                                    </div>
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn-normal">Подтвердить</button>
                        </form>
                        <div className="header">
                            <h4>Комментарии</h4>
                        </div>
                        <div>
                            <Comment comments={comments}/>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default CommentsBlock;
