import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const HomeComponent = () => {
    return (
        <div className="bg-light">
            <div className="container py-5">
                <div className="row align-items-center">
                    {/* Khối text chào mừng */}
                    <div className="col-md-7 text-center text-md-start">
                        <p className="text-uppercase small text-secondary mb-2">
                            Welcome to Furama Resort
                        </p>
                        <h1 className="display-5 fw-bold mb-3">
                            Chào mừng bạn đến với khu nghỉ dưỡng Furama
                        </h1>
                        <p className="lead text-muted mb-4">
                            Tận hưởng không gian nghỉ dưỡng sang trọng, dịch vụ đẳng cấp
                            và những trải nghiệm khó quên bên bãi biển tuyệt đẹp.
                        </p>
                    </div>

                    <div className="col-md-5 mt-4 mt-md-0">
                        <div className="rounded-4 shadow-sm p-4 bg-white text-center">
                            <h5 className="fw-semibold mb-3">Ưu đãi mùa này</h5>
                            <p className="mb-1">Giảm đến 30% cho khách đặt phòng sớm</p>
                            <p className="mb-1">Miễn phí bữa sáng buffet</p>
                            <p className="mb-0">Tặng voucher spa cao cấp</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
