import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewComponent = ({ query }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reviews`, {
                    params: { title: query },
                });
                setReviews(response.data);
            } catch (error) {

            }
        };

        fetchReviews();
    }, [query]);

    // 링크 클릭 시 최종 URL을 확인하는 함수
    const handleLinkClick = async (link) => {
        try {
            const response = await axios.get(link, {
                maxRedirects: 0, // 리디렉션이 발생할 때 이를 확인하기 위해 설정
                validateStatus: function (status) {
                    return status >= 200 && status < 400; // 2xx, 3xx 응답을 허용
                },
            });
            if (response.status === 302 || response.status === 301) {
                window.open(response.headers.location, '_blank');
            } else {
                window.open(link, '_blank');
            }
        } catch (error) {

            window.open(link, '_blank'); // 오류가 발생할 경우 원래 링크 열기
        }
    };

    return (
        <div className='info-box review-list'>
            {reviews.length > 0 ? (
                <div>
                    {reviews.slice(0, 8).map((review, index) => (
                    <a href="#"
                       onClick={() => handleLinkClick(review.link)}
                       rel="noopener noreferrer">
                            <h3 className='review'>{review.title}</h3>
                    </a>
                    ))}
                </div>

            ) : (
                <p className='txt-x'>리뷰 데이터를 불러올 수 없습니다.</p>
            )}
        </div>
    );
};

export default ReviewComponent;
