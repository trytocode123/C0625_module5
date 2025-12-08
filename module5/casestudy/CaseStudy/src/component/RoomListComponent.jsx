import {useEffect, useState} from "react";
import {getRoomList, searchRoomByName} from "../service/RoomService.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import roomImg from '../assets/room.svg';
import headerImg from '../assets/headerImgRoom.svg';
import {useParams} from "react-router";

const RoomListComponent = () => {
    const [roomList, setRoomList] = useState([]);
    const {searchName} = useParams();
    useEffect(() => {
        if (searchName?.trim()) {
            const fetchDataBySearch = async () => {
                const dataBySearch = await searchRoomByName({
                    name_like: searchName
                })
                if(dataBySearch) {
                    console.log(dataBySearch);
                    setRoomList(dataBySearch);
                }
            }
            fetchDataBySearch();
        } else {
            const fetchData = async () => {
                const data = await getRoomList();
                setRoomList(data);
            }
            fetchData();
        }
    }, [searchName]);

    return (
        <div className="bg-light py-4">
            <div className="container">
                <div className="w-100 overflow-hidden" style={{height: "160px"}}>
                    <img
                        src={headerImg}
                        className="w-100"
                        style={{objectFit: "cover", height: "100%"}}
                        alt="Header"
                    />
                </div>
                <h3 className="text-center text-uppercase fw-bold mb-4">
                    Danh sách Room nghỉ dưỡng
                </h3>

                {roomList.length === 0 && (
                    <p className="text-center text-muted">Không có phòng nào để hiển thị</p>
                )}

                <div className="row g-4">
                    {roomList.map(room => (
                        <div key={room.id} className="col-12 col-sm-8 col-md-6 col-lg-4">

                            <div className="card-title mb-2 text-center" style={{
                                wordBreak: "keep-all",
                                whiteSpace: "normal",
                                textAlign: "center"
                            }}>

                                <img
                                    src={roomImg} className="card-img-top"
                                    alt="Ảnh phòng"
                                />

                                <div className="card-body d-flex flex-column px-3">

                                    <h5 className="card-title fw-semibold text-primary mb-2 text-center">
                                        {room.name}
                                    </h5>

                                    <ul className="list-unstyled small mb-3">
                                        <li><strong>Diện tích:</strong> {room.area} m<sup>2</sup></li>
                                        <li><strong>Kiểu thuê:</strong> {room.type}</li>
                                        <li><strong>Giá thuê:</strong> {room.fee.toLocaleString('vi-VN')} đ</li>
                                        <li><strong>Số người tối đa:</strong> {room.capacity}</li>
                                        <li><strong>Tiêu chuẩn:</strong> {room.standard}</li>
                                    </ul>

                                    <div className="mt-auto">
                                        <a className="btn btn-sm btn-outline-primary w-100">
                                            Chi tiết
                                        </a>
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomListComponent;
