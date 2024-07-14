import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const CreateNotice = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/notice', {title, content});
            alert("공지사항 업로드 완료.");
            history.push('/notice');
        } catch (error) {
            console.log('공지사항 업로드 에러',error);
        }

    };
    return (
        <div>
            <h1>Create Notice</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title :</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div>
                    <label>Content :</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required/>
                </div>
                <button type="submit">Create Notice</button>
            </form>
        </div>
    );
};

export default CreateNotice;