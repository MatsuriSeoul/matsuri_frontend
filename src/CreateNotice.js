import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

const CreateNotice = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [attachment, setAttachment] = useState([]);
    const [attachmentNames, setAttachmentNames] = useState([]); // 첨부파일 이름 관리
    const navigate = useNavigate();

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
            navigate('/');
        } catch (error) {
            console.log("공지사항 업로드 에러", error);
        }
    };

    return (
        <div>
            <h1>Create Notice</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목 :</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>본문 :</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>이미지 첨부:</label>
                    <input type="file" multiple onChange={handleImageChange} />
                    <br />
                    <div>
                        {imagePreviews.map((preview, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    style={{ width: "100px", height: "100px", marginRight: "10px" }}
                                />
                                <button type="button" onClick={() => handleImageRemove(index)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label>첨부파일 업로드:</label>
                    <input type="file" multiple onChange={handleAttachmentChange} />
                    <br />
                    <div>
                        {attachmentNames.map((name, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                <p>{name}</p>
                                <button type="button" onClick={() => handleAttachmentRemove(index)}>
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">작성</button>
            </form>
        </div>
    );
};

export default CreateNotice;
