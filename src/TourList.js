import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TourList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events/fetch', {
                    params: {
                        serviceKey: '13jkaARutXp/OwAHynRnYjP7BJuMVGIZx2Ki3dRMaDlcBqrfZHC9Zk97LCCuLyKfiR2cVhyWy59t96rPwyWioA==',
                        numOfRows: 10,
                        pageNo: 1,
                        eventStartDate: '20240101'
                    }
                });


                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setEvents(response.data);
                } else {
                    console.log('행사를 찾을수 없거나 데이터 포맷 실패', response.data);
                    setEvents([]);
                }
            } catch (error) {
                console.error('행사 적용 실패', error);
                setError('행사 적용 실패');
            }
        };

        fetchEvents();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>이벤트 목록</h1>
            {events.length === 0 ? (
                <p>표시할 이벤트가 없습니다.</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event.contentid}>
                            <h2>{event.title}</h2>
                            <p>{event.addr1}</p>
                            <p>{event.eventstartdate} - {event.eventenddate}</p>
                            {event.firstimage && <img src={event.firstimage} alt={event.title} />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TourList;
