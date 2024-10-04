import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate  } from "react-router-dom";

const EditNotice = () => {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지 경로를 저장
    const [newImages, setNewImages] = useState([]); // 새로 업로드할 파일을 저장
    const [imagePreviews, setImagePreviews] = useState([]); // 새로 업로드한 이미지의 미리보기
    const [deletedImageIds, setDeletedImageIds] = useState([]); // 삭제된 이미지 ID를 저장
    const [attachments, setAttachments] = useState([]); // 새로 추가할 첨부파일
    const [existingAttachments, setExistingAttachments] = useState([]); // 기존 첨부파일

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/notice/${noticeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTitle(response.data.title);
                setContent(response.data.content);
                setExistingImages(response.data.images || []); // 기존 이미지 경로를 저장
                setExistingAttachments(response.data.files || []);
            } catch (error) {
                console.error('Error fetching notice', error);
            }
        };
        fetchNotice();
    }, [noticeId]);

    useEffect(() => {
        if (newImages.length > 0) {
            const newImagePreviews = newImages.map(image => URL.createObjectURL(image));
            setImagePreviews(newImagePreviews);
        } else {
            setImagePreviews([]);
        }
    }, [newImages]);

    const handleImageChange = (event) => {
        setNewImages(Array.from(event.target.files)); // 새로 선택된 파일을 업데이트
    };

    const handleAttachmentChange = (e) => {
        setAttachments(Array.from(e.target.files)); // 다중 첨부파일 허용
    };

    const handleDeleteExistingImage = async (index) => {
        const removedImage = existingImages[index];

        // 서버에 이미지 삭제 요청
        try {
            await axios.delete(`/api/notice/image/${removedImage.id}`);
            console.log("이미지 삭제 완료:", removedImage.id);

            // 삭제 성공 시 프론트엔드에서도 이미지 제거
            const updatedImages = existingImages.filter((_, imgIndex) => imgIndex !== index);
            setExistingImages(updatedImages);
        } catch (error) {
            console.error("이미지 삭제 오류:", error);
        }
    };

    const handleDeleteExistingAttachment = async (index) => {
        const removedAttachment = existingAttachments[index];

        try {
            await axios.delete(`/api/notice/file/${removedAttachment.id}`);
            setExistingAttachments(existingAttachments.filter((_, fileIndex) => fileIndex !== index));
        } catch (error) {
            console.error("첨부파일 삭제 오류:", error);
        }
    };

    useEffect(() => {
        console.log("삭제된 이미지 ID 목록 업데이트됨:", deletedImageIds);
    }, [deletedImageIds]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        // 남아 있는 기존 이미지, 첨부파일 정보 유지
        existingImages.forEach((image) => {
            formData.append('existingImageIds', image.id);
        });

        existingAttachments.forEach((file) => {
            formData.append('existingFileIds', file.id);
        });

        // 새로 추가된 이미지 및 첨부파일 추가
        newImages.forEach((image) => {
            formData.append('images', image);
        });

        attachments.forEach((file) => {
            formData.append('files', file);
        });


        try {
            await axios.put(`/api/notice/edit/${noticeId}`, formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            alert("공지사항이 수정되었습니다.");
            navigate(`/notice/${noticeId}`);
        } catch (error) {
            console.error('Error updating notice', error);
        }
    };

    return (
        <div>
            <h2>공지사항 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>본문:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label>기존 이미지:</label>
                    <div>
                        {existingImages.map((image, index) => (
                            <div key={index} style={{display: 'inline-block', marginRight: '10px'}}>
                                <img
                                    src={image.imagePath} // 기존 이미지 경로 사용
                                    alt={`Existing ${index}`}
                                    style={{width: '100px', height: '100px', marginRight: '10px'}}
                                />
                                <button type="button" onClick={() => handleDeleteExistingImage(index)}>X</button>
                                {/* 삭제 버튼 */}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label>새 이미지 첨부:</label>
                    <input type="file" multiple onChange={handleImageChange}/>
                    <br/>
                    <div>
                        {imagePreviews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index}`}
                                 style={{width: '100px', height: '100px', marginRight: '10px'}}/>
                        ))}
                    </div>
                </div>
                <div>
                    <label>기존 첨부파일:</label>
                    <div>
                        {existingAttachments.map((file, index) => (
                            <div key={index}>
                                <a href={`/uploads/${file.filePath}`} download>{file.fileName}</a>
                                <button type="button" onClick={() => handleDeleteExistingAttachment(index)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label>새 첨부파일:</label>
                    <input type="file" multiple onChange={handleAttachmentChange}/>
                </div>
                <div>
                    <button type="submit">저장</button>
                </div>
            </form>
        </div>
    );
};

export default EditNotice;
