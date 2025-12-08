import headerImg from "../assets/headerImgRoom.svg";
import houseImg from "../assets/house.svg";
import {useEffect, useState} from "react";
import {getHouseList, searchHouseByName} from "../service/HouseService.js";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";

const HouseListComponent = () => {
    const [houseList, setHouseList] = useState([]);
    const {searchName} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchName?.trim()) {
            const fetchDataBySearch = async () => {
                const dataBySearch = await searchHouseByName({
                    name_like: searchName
                })
                if (dataBySearch) {
                    setHouseList(dataBySearch);
                }
            }
            fetchDataBySearch();
        } else {
            const fetchData = async () => {
                const data = await getHouseList();
                setHouseList(data);
            }
            fetchData();
        }
    }, [searchName]);

    const handleDetail = (id) => {
        navigate(`/houses/detail/${id}`);
    }

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

                <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                    <h3 className="text-uppercase fw-bold mb-0">
                        Danh sách House nghỉ dưỡng
                    </h3>

                    <Link
                        to="/houses/add"
                        className="btn btn-success btn-sm fw-semibold shadow-sm"
                    >
                        + Thêm House
                    </Link>
                </div>

                {houseList.length === 0 && (
                    <p className="text-center text-muted">Không có house nào để hiển thị</p>
                )}

                <div className="row g-4">
                    {houseList.map(house => (
                        <div key={house.id} className="col-12 col-sm-8 col-md-6 col-lg-4">

                            <div className="card shadow-sm border-0 h-100">

                                <img
                                    src={houseImg}
                                    className="card-img-top"
                                    alt="Ảnh house"
                                    style={{height: "160px", objectFit: "contain"}}
                                />

                                <div className="card-body d-flex flex-column px-3">

                                    <h5 className="card-title fw-semibold text-primary mb-2 text-center">
                                        {house.name}
                                    </h5>

                                    <ul className="list-unstyled small mb-3">
                                        <li><strong>Diện tích:</strong> {house.area} m<sup>2</sup></li>
                                        <li><strong>Số tầng:</strong> {house.floor}</li>
                                        <li><strong>Kiểu thuê:</strong> {house.type}</li>
                                        <li><strong>Giá thuê:</strong> {house.fee.toLocaleString('vi-VN')} đ</li>
                                        <li><strong>Số người tối đa:</strong> {house.capacity}</li>
                                        <li><strong>Tiêu chuẩn:</strong> {house.standard}</li>
                                        <li><strong>Mô tả:</strong> {house.description}</li>
                                    </ul>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => handleDetail(house.id)}
                                            className="btn btn-outline-primary btn-sm w-100"
                                        >
                                            Chi tiết
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default HouseListComponent;
