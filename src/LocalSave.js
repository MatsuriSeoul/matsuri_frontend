import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalSave = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchLocalEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/fetchAndSave', {
                    params: {
                        numOfRows: 10,
                        pageNo: 1,
                        cat1: 'B02',
                        cat2: 'B0201',
                        cat3: 'B02010100',
                        modifiedtime: '20230101',
                        areaCode: '1',
                        sigunguCode: '1'
                    }
                });
                console.log('Fetched Events:', response.data);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchLocalEvents();
    }, []);

    return (
        <div>
            <h1>Local Event Save</h1>
            <ul>
                {events.map(event => (
                    <li key={event.contentid}>
                        <h2>{event.title}</h2>
                        <img src={event.firstimage} alt={event.title} width="200" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocalSave;
