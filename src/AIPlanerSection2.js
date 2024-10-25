import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AIPlanerSection2 = (props) => {
    const region = props.location.state?.region;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    // 카테고리 선택 핸들러
    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            if (selectedCategories.length < 4) {
                setSelectedCategories([...selectedCategories, category]);
            } else {
                alert("카테고리는 최대 4개까지 선택 가능합니다.");
            }
        }
    };

    // 카테고리 제출 핸들러
    const handleCategorySubmit = () => {
        if (selectedCategories.length < 2) {
            alert("카테고리는 최소 2개 이상 선택해야 합니다!");
            return;
        }

        // 이동하면서 state로 선택한 값 전달 (여행 기간 선택 화면으로 이동)
        history.push({
            pathname: '/plan-section3',
            state: { region, categories: selectedCategories } // 전달할 값
        });
    };

    return (
        <div>
            <h2>{region} 지역에 대한 카테고리를 선택하세요</h2>
            <div>
                {['관광지', '문화시설', '행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식'].map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryClick(category)}
                        style={{
                            margin: '5px',
                            backgroundColor: selectedCategories.includes(category) ? 'green' : ''
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button onClick={handleCategorySubmit}>카테고리 선택</button>
            {loading && <p>서버 요청 중...</p>}
        </div>
    );
};

export default AIPlanerSection2;
