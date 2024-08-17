import React, { useState } from "react";
import axios from "axios";

const CreateComment = ({noticeId}) => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Notice ID:', noticeId);
        console.log('작성자 :', author);
        console.log('Content:', content);
        try {
            await axios.post('/api/comment', {content, noticeId, author});
            alert("댓글이 작성되었습니다.");
            setContent('');
        } catch (error) {
            console.log('댓글 작성을 실패하였습니다.',error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>내용 :</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>
            <div>
                <label>작성자 :</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <button type="submit">댓글 작성</button>
        </form>
    );
};

export default CreateComment;