import React, { useState } from 'react';
import axios from 'axios';

const LocalSave = () => {
    const [events, setEvents] = useState([]);

    const fetchLocalEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events/fetchAndSave', {
                params: {
                    numOfRows: '10',
                    pageNo: '1'
                }
            });
            console.log('Fetched Events:', response.data);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching local events:', error);
        }
    };

    return (
        <div>
            <h1>Local Event Save</h1>
            <button onClick={fetchLocalEvents}>지역 API 불러오기</button>
            {events.length > 0 && (
                <ul>
                    {events.map((event) => (
                        <li key={event.contentid}>
                            {event.title} - {event.addr1}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocalSave;