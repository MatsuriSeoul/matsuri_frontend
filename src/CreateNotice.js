import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const CreateNotice = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [attachment, setAttachment] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (images.length > 0) {
            const newImagePreviews = images.map(image => URL.createObjectURL(image));
            setImagePreviews(newImagePreviews);
        } else {
            setImagePreviews([]);
        }
    }, [images]);


    const handleImageChange = (event) => {
        setImages(Array.from(event.target.files));
    };

    // const handleAttachmentChange = (e) => {
    //     setAttachment(e.target.files[0]);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        images.forEach((image,index) => {
            formData.append(`images`, image); // `images` 배열로 다중 이미지 추가
        });
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            await axios.post('/api/notice', formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}` ,
                        'Content-Type': 'multipart/form-data'
                    }
                }
                );
            alert("공지사항 업로드 완료.");
            setTitle('');
            setContent('');
            setImages([]);
            setImagePreviews([]);
            history.push('/');
        } catch (error) {
            console.log('공지사항 업로드 에러',error);
        }

    };
    return (
        <div>
            <h1>Create Notice</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목 :</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div>
                    <label>본문 :</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required/>
                </div>
                <div>
                    <label>이미지 첨부:</label>
                    <input type="file" multiple onChange={handleImageChange}/>
                    <br/>
                    <div>
                        {imagePreviews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index}`}
                                 style={{width: '100px', height: '100px'}}/>
                        ))}
                    </div>
                </div>
                {/*<div>*/}
                {/*    <label>첨부파일 업로드:</label>*/}
                {/*    <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"*/}
                {/*           onChange={handleAttachmentChange}/>*/}
                {/*</div>*/}
                <button type="submit">작성</button>
            </form>
        </div>
    );
};

export default CreateNotice;