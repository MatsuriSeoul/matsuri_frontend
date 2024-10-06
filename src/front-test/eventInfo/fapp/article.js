import { Link } from 'react-router-dom';

const BoxList =[
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
]

const Article = () =>{
    return(
        <>
            <section className="sec sec1">
                <Link to={'free'}>
                    <p className="more-btn">더보기 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></p>
                </Link>
                <div className="sec1-container container">
                    <div className="title-hashtag">
                        <div className="design-point"></div>
                        <h1 className="title">무료 행사</h1>
                        <p className="sub-title">운영자가 추천하는 무료 행사입니다.</p>
                        <div className="hashtag">
                            <p>#공짜로</p>
                            <p>#즐길 수 있다고??</p>
                            <p>#궁금하지않아?</p>
                            <p>#여기에 다 있어!!</p>
                        </div>
                    </div>
                    <div className="img-list">
                            {BoxList.slice(0, 6).map((item) => (
                                <div className="box">
                                    <div className="img">
                                        <div className="like-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                                        </div>
                                    </div>
                                    <h1 className="title">신나는 캠핑</h1>
                                    <p className="address">대전 중구</p>
                                </div>
                            ))}
                    </div>
                </div> 
            </section>    
            <section className="sec sec2">
                <Link to={'paid'}>
                    <p className="more-btn">더보기 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></p>
                </Link>
                <div className="sec2-container container">
                    <div className="title-hashtag">
                        <div className="design-point"></div>
                        <h1 className="title">유료 행사</h1>
                        <p className="sub-title">운영자가 추천하는 유료 행사입니다.</p>
                        <div className="hashtag">
                            <p>#내.돈.내.산</p>
                            <p>#유료인 만큼</p>
                            <p>#더 재밌는 행사가</p>
                            <p>#많을 거예요</p>
                        </div>
                    </div>
                    <div className="img-list">
                            {BoxList.slice(0, 6).map((item) => (
                                <div className="box">
                                    <div className="img">
                                        <div className="like-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                                        </div>
                                    </div>
                                    <h1 className="title">신나는 캠핑</h1>
                                    <p className="address">대전 중구</p>
                                </div>
                            ))}
                    </div>
                </div> 
            </section>    
        </>
    )
}
export default Article;