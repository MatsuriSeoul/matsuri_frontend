import {Link} from "react-router-dom";

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

const Sec2 = ({foodEvents}) =>{
    return(
        <div className="hpp-sec2 hpp-sec">
            <div className="title-hashtag">
                <div className="design-point"></div>
                <h1 className="title">인기 음식점 추천</h1>
                <p className="sub-title">SNS에서 핫한 음식점</p>
                <div className="hashtag">
                    <p>#핫플</p>
                    <p>#행사</p>
                    <p>#인생샷</p>
                </div>
            </div>
            <div className="img-list">
                {foodEvents.map((event, index) => (
                    <Link to={`/eventDetailPage/food-events/${event.contentid}/${event.contenttypeid}`}>
                        <div className="box" key={index}>
                            <div className="img"
                                 style={{
                                     backgroundImage: `url(${event.firstimage || event.firstImage || event.first_image || event[1] || '/img/default_img.jpeg'})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                 }}
                            >
                                <div className="like-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                                </div>
                            </div>
                            <h1 className="title">{event.title || event[0]}</h1>
                            <p className="address">{event.addr1}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sec2;