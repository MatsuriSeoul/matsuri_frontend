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
                {foodEvents.slice(0, 8).map((event, index) => (
                    <Link to={`/eventDetailPage/sigungu/${event.contentid}/${event.contenttypeid || event.contentTypeId}`}>
                        <div className="box" key={index}>
                            <div className="img"
                                 style={{
                                     backgroundImage: `url(${event.firstimage || event.firstImage || event.first_image || event[1] || '/img/default_img.jpeg'})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                 }}
                            >
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