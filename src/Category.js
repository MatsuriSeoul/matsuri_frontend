/*
* 카테고리 선택 페이지
* */
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
                } else if (category === '행사') {
                    response = await axios.get(`http://localhost:8080/api/events/category/${category}`, {
                        params: {
                            numOfRows: '10',
                            pageNo: '1'
                        }
                    });
                } else if (category === '여행코스') {
                    response = await axios.get(`http://localhost:8080/api/travel-courses/category/${category}`, {
                        params: {
                            numOfRows: '10',
                            pageNo: '1'
                        }
                    });
                } else if (category === '레포츠') {
                    response = await axios.get(`http://localhost:8080/api/leisure-sports/category/${category}`, {
                        params: {
                            numOfRows: '10',
                            pageNo: '1'
                        }
                    });
                } else if (category === '숙박') {
                    response = await axios.get(`http://localhost:8080/api/local-events/category/${category}`, {
                        params: {
                            numOfRows: '10',
                            pageNo: '1'
                        }
                    });
                } else if (category === '쇼핑') {
                    response = await axios.get(`http://localhost:8080/api/shopping-events/category/${category}`, {
                        params: {
                            numOfRows: '10',
                            pageNo: '1'
                        }
                    });
                } else if (category === '음식') {
                    response = await axios.get(`http://localhost:8080/api/food-events/category/${category}`, {
                        params: {
                            numOfRows: '10',
                            pageNo: '1'
                        }
                    });
                }

                const uniqueEvents = response.data.filter((event, index, self) =>
                    index === self.findIndex((e) => e.contentid === event.contentid)
                );

                setEvents(uniqueEvents);
            } catch (error) {
                console.error('이벤트 정보 불러오기 실패 ', error);
            }
        };

        fetchEvents();
    }, [category]);

    const renderEventLink = (event) => {
        if (category === '관광지') {
            return (
                <Link to={`/tourist-attractions/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        } else if (category === '문화시설') {
            return (
                <Link to={`/cultural-facilities/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        } else if (category === '행사') {
            return (
                <Link to={`/events/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        } else if (category === '여행코스') {
            return (
                <Link to={`/travel-courses/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        } else if (category === '레포츠') {
            return (
                <Link to={`/leisure-sports/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        } else if (category === '숙박') {
            return (
                <Link to={`/local-events/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        } else if (category === '쇼핑') {
            return (
                <Link to={`/shopping-events/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        } else if (category === '음식') {
            return (
                <Link to={`/food-events/${event.contentid}/${event.contenttypeid}/detail`}>
                    <h2>{event.title}</h2>
                    <img src={event.firstimage} alt={event.title} width="200" />
                </Link>
            );
        }
    };

    return (
        <div>
            <h1>{category} 관련 이벤트</h1>
            <ul>
                {events.length > 0 ? (
                    events.map(event => (
                        <li key={event.contentid}>
                            {renderEventLink(event)}
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
            {category ? <CategoryEvents /> : <CategorySelection />}
        </div>
    );
};

export default Category;
