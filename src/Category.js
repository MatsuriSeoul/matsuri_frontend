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
                let response;

                if (category === '관광지') {
                    response = await axios.get(`http://localhost:8080/api/tourist-attractions/category/${category}`);
                } else if (category === '문화시설') {
                    response = await axios.get(`http://localhost:8080/api/cultural-facilities/category/${category}`, {
                        params: {
                            numOfRows: '10',
                            pageNo: '1'
                        }
                    });
                } else {
                    // 다른 카테고리들의 기본 처리
                    response = await axios.get(`http://localhost:8080/api/tourist-attractions/category/${category}`);
                }

                console.log('API Response:', response.data);  // 반환된 데이터를 확인하는 로그

                const uniqueEvents = response.data.filter((event, index, self) =>
                    index === self.findIndex((e) => e.contentid === event.contentid)
                );

                setEvents(uniqueEvents);
            } catch (error) {
                console.error('행사 정보 불러오기 실패 ', error);
            }
        };

        fetchEvents();
    }, [category]);

    return (
        <div>
            <h1>{category} 관련 이벤트</h1>
            <ul>
                {events.length > 0 ? (
                    events.map(event => (
                        <li key={event.contentid}>
                            <Link
                                to={`/${category === '관광지' ? 'tourist-attraction' : 'cultural-facility'}/${event.contentid}/${event.contenttypeid}/detail`}>
                                <h2>{event.title}</h2>
                                <img src={event.firstimage} alt={event.title} width="200"/>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>이벤트가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

const Category = () => {
    const { category } = useParams();
    return (
        <div>
            {category ? <CategoryEvents/> : <CategorySelection/>}
        </div>
    );
};

export default Category;
