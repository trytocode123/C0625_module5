import {Link} from "react-router";

const HomeComponent = () => {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-white">

                            <div
                                className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                                style={{
                                    width: 90,
                                    height: 90,
                                    background: "#eef7fb",
                                    color: "#1f6f8b",
                                    fontSize: 36,
                                    fontWeight: 700
                                }}
                            >
                                ⚽
                            </div>

                            <h3 className="fw-semibold text-primary mb-2">
                                Chào mừng đến với trang quản lý cầu thủ
                            </h3>

                            <p className="text-muted small mb-0">
                                Hệ thống giúp theo dõi thông tin cầu thủ, giá trị chuyển nhượng và quản lý chi tiết hiệu quả.
                            </p>

                            <div className="mt-4">
                                <Link to="/players" className="btn btn-primary px-4">
                                    Xem danh sách cầu thủ
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
