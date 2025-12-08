import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {getVillaList, searchVillaByName} from "../service/VillaService.js";
import villaImg from '../assets/villa.svg'
import headerImg from "../assets/headerImgRoom.svg";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

const VillaListComponent = () => {
    const [villaList, setVillaList] = useState([]);
    const {searchName} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchName?.trim()) {
            const fetchDataBySearch = async () => {
                const dataBySearch = await searchVillaByName({
                    name_like: searchName
                })
                if (dataBySearch) {
                    setVillaList(dataBySearch);
                }
            }
            fetchDataBySearch();
        } else {
            const fetchData = async () => {
                const data = await getVillaList();
                setVillaList(data);
            };
            fetchData();
        }
    }, [searchName]);


    const handleDetail = (id) => {
        navigate(`/villas/detail/${id}`);
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

                {/* Tiêu đề + nút thêm */}
                <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                    <h3 className="text-uppercase fw-bold mb-0">
                        Danh sách Villa nghỉ dưỡng
                    </h3>

                    <button
                        onClick={() => navigate('/villas/add')}
                        className="btn btn-success btn-sm fw-semibold shadow-sm"
                    >
                        + Thêm Villa
                    </button>
                </div>

                {villaList.length === 0 && (
                    <p className="text-center text-muted">Không có villa nào để hiển thị</p>
                )}

                <div className="row g-4 justify-content-center">
                    {villaList.map(villa => (
                        <div key={villa.id} className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className="card shadow-sm border-0 h-100">

                                <img
                                    src={villaImg}
                                    className="card-img-top"
                                    alt="Ảnh villa"
                                    style={{height: "160px", objectFit: "contain"}}
                                />

                                <div className="card-body d-flex flex-column px-3">
                                    <h5 className="card-title fw-semibold text-primary mb-2 text-center">
                                        {villa.name}
                                    </h5>

                                    <ul className="list-unstyled small mb-3">
                                        <li><strong>Diện tích:</strong> {villa.area} m<sup>2</sup></li>
                                        <li><strong>Kiểu thuê:</strong> {villa.type}</li>
                                        <li><strong>Giá thuê:</strong> {villa.fee.toLocaleString('vi-VN')} đ</li>
                                        <li><strong>Số người tối đa:</strong> {villa.capacity}</li>
                                        <li><strong>Tiêu chuẩn:</strong> {villa.standard}</li>
                                        <li><strong>Khu hồ bơi:</strong> {villa.arePool} m<sup>2</sup></li>
                                        <li><strong>Số tầng:</strong> {villa.floor}</li>
                                        <li><strong>Mô tả:</strong> {villa.description}</li>
                                    </ul>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => handleDetail(villa.id)}
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
    );
};

export default VillaListComponent;
