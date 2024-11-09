import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailViewComponent = () => {
    const { contenttypeid, contentid } = useParams();
    const [viewCount, setViewCount] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const addDetailViewAndFetchCount = async () => {
            try {
                if (!token) {
                    return;
                }

                // 조회수 증가 요청
                await axios.post(
                    `/api/detail-view/${contenttypeid}/${contentid}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // 조회수 가져오기 요청
                const response = await axios.get(
                    `/api/detail-view/${contenttypeid}/${contentid}/count`
                );
                setViewCount(response.data.viewCount);
            } catch (error) {
                console.error('조회수 증가 및 가져오기 실패:', error);
            }
        };

        addDetailViewAndFetchCount();
    }, [contenttypeid, contentid, token]);

    return (
        <div>
            <p>{viewCount}</p>
        </div>
    );
};

export default DetailViewComponent;
