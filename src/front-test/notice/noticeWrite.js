import React, {useEffect, useRef, useState} from "react";
import '../../css/noticePage/noticeWrite.css';
import axios from "axios";
import {useHistory} from "react-router-dom";
const NoticeWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]); // 이미지 상태
    const [imagePreviews, setImagePreviews] = useState([]);
    const [attachment, setAttachment] = useState([]);
    const [attachmentNames, setAttachmentNames] = useState([]); // 첨부파일 이름 관리
    const history = useHistory();

    const imageInputRef = useRef(null); // 이미지 파일 input ref
    const attachmentInputRef = useRef(null); // 첨부파일 input ref

    const handleImageButtonClick = () => {
        imageInputRef.current.click(); // 이미지 파일 선택 대화상자 열기
    };

    const handleAttachmentButtonClick = () => {
        attachmentInputRef.current.click(); // 첨부파일 선택 대화상자 열기
    };

    useEffect(() => {
        if (images.length > 0) {
            const newImagePreviews = images.map((image) => URL.createObjectURL(image));
            setImagePreviews(newImagePreviews);
        } else {
            setImagePreviews([]);
        }
    }, [images]);

    // 이미지 파일 선택 핸들러
    const handleImageChange = (event) => {
        setImages(Array.from(event.target.files));
    };

    // 첨부파일 선택 핸들러
    const handleAttachmentChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setAttachment(filesArray); // 첨부파일 배열로 저장
        setAttachmentNames(filesArray.map(file => file.name)); // 첨부파일 이름 저장
    };

    // 이미지 삭제 핸들러
    const handleImageRemove = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    // 첨부파일 삭제 핸들러
    const handleAttachmentRemove = (index) => {
        setAttachment((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
        setAttachmentNames((prevNames) => prevNames.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        images.forEach((image) => {
            formData.append("images", image); // `images` 배열로 다중 이미지 추가
        });
        attachment.forEach((file) => {
            formData.append("files", file); // 첨부파일 추가
        });

        try {
            await axios.post("/api/notice", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("공지사항 업로드 완료.");
            setTitle("");
            setContent("");
            setImages([]);
            setImagePreviews([]);
            setAttachment([]);
            setAttachmentNames([]);
            history.push('/noticePage');
        } catch (error) {

        }
    };

    const handleCancle = () =>{
        history.push('/noticePage');
    }


    return (
        <div className='noticle-container'>
            <section className="notice">
                <div className="headText">
                    공지사항 작성
                </div>
                <form className="notice-container" onSubmit={handleSubmit}>
                    <div className="noticeTitleBox">
                        <div className="headTextBox">제목</div>
                        <input className="noticeTitle" type="text" placeholder="제목을 입력해주세요"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                               required
                        ></input>
                    </div>
                    <div className="noticeContentBox">
                        <div className="headTextBox">내용</div>
                        <textarea className="contentText" placeholder="내용을 입력해주세요."
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                  required
                        ></textarea>
                    </div>
                    <div className='file-container'>
                        <div className='file-name'>
                            <div className='name-container'>
                                <p className='title'>이미지 첨부: </p>
                                {imagePreviews.map((preview, index) => (
                                    <div className='name-box'>
                                        <img
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            style={{width: "20px", height: "20px", marginRight: "4px"}}
                                        />
                                        <button type="button" onClick={() => handleImageRemove(index)}>
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className='name-container'>
                                <p className='title'>첨부파일 업로드: </p>
                                {attachmentNames.map((name, index) => (
                                    <div className='name-box'>
                                        <p>{name}</p>
                                        <button type="button" onClick={() => handleAttachmentRemove(index)}>
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="file-btn">
                                <input
                                    type="file"
                                    ref={imageInputRef}
                                    multiple
                                    style={{display: 'none'}}
                                    onChange={handleImageChange}
                                />
                                <button type="button" className='btn' onClick={handleImageButtonClick}>파일선택</button>
                                <input
                                    type="file"
                                    ref={attachmentInputRef}
                                    multiple
                                    style={{display: 'none'}}
                                    onChange={handleAttachmentChange}
                                />
                                <button type="button" className='btn' onClick={handleAttachmentButtonClick}>첨부파일</button>
                            </div>
                        </div>


                        <div className="btn-wrap">
                        <button type="submit" className="btnOk">확인</button>
                        <p className="btnReset" onClick={handleCancle}>취소</p>
                    </div>
                </form>
            </section>
        </div>
    );
};
export default NoticeWrite;
