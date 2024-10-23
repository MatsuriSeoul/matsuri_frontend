import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PopularEvents = () => {
    const [popularEvents, setPopularEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clicks/popular');
                setPopularEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('인기 행사 데이터를 불러오는 중 오류 발생:', error);
                setLoading(false);
            }
        };

        fetchPopularEvents();
    }, []);

    const renderEventLink = (event) => {
        const { contentid, contenttypeid, title, image } = event;
        const getLinkPath = () => {
            switch (contenttypeid) {
                case '12':
                    return `/tourist-attraction/${contentid}/${contenttypeid}/detail`;
                case '14':
                    return `/cultural-facilities/${contentid}/${contenttypeid}/detail`;
                case '15':
                    return `/events/${contentid}/${contenttypeid}/detail`;
                case '25':
                    return `/travel-courses/${contentid}/${contenttypeid}/detail`;
                case '28':
                    return `/leisure-sports/${contentid}/${contenttypeid}/detail`;
                case '32':
                    return `/local-events/${contentid}/${contenttypeid}/detail`;
                case '38':
                    return `/shopping-events/${contentid}/${contenttypeid}/detail`;
                case '39':
                    return `/food-events/${contentid}/${contenttypeid}/detail`;
                default:
                    return '#';
            }
        };

        return (
            <div key={contentid} style={{ width: '200px', marginBottom: '20px' }}>
                <Link to={getLinkPath()}>
                    <h3>{title}</h3>
                    <img src={image} alt={title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                </Link>
            </div>
        );
    };

    return (
        <div>
            <h2>현재 사용자들이 선호하는 행사</h2>
            {loading ? <p>로딩 중...</p> :
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {popularEvents.map(renderEventLink)}
                </div>
            }
        </div>
    );
};

export default PopularEvents;
