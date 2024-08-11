import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const categories = [
    { id: '관광지', name: '관광지' },
    { id: '문화시설', name: '문화시설' },
    { id: '행사', name: '행사' },
    { id: '여행코스', name: '여행코스' },
    { id: '레포츠', name: '레포츠' },
    { id: '숙박', name: '숙박' },
    { id: '쇼핑', name: '쇼핑' },
    { id: '음식', name: '음식' }
];

const CategorySelection = () => {
    return (
        <div>
            <h1>카테고리 선택</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CategoryEvents = () => {
    const { category } = useParams();
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/category/${category}`);
                console.log('Fetched Events:', response.data);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, [category]);

    return (
        <div>
            <h1>{category} 관련 이벤트</h1>
            <ul>
                {events.slice(0, 99).map(event => (
                    <li key={event.contentid}>
                        <Link to={`/tourist-attraction/${event.contentid}/${event.contenttypeid}/detail`}>
                            <h2>{event.title}</h2>
                            <img src={event.firstimage} alt={event.title} width="200" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Category = () => {
    const { category } = useParams();
    return (
        <div>
            {category ? <CategoryEvents /> : <CategorySelection />}
        </div>
    );
};

export default Category;
