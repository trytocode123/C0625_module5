import {ErrorMessage, Field, Form, Formik} from "formik";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useState} from "react";


import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router";
import {Button} from "react-bootstrap";
import * as Yup from "yup";
import {getProductList} from "../service/ProductService.js";
import {addOrder} from "../service/OriginService.js";

const AddProductComponent = () => {
    const [productList, setProductList] = useState([]);

    const init = {
        id: 0,
        orderCode: "",
        total: "",
        quantity: "",
        product: "",
    };

    useEffect(() => {
        const fetchDataOrigin = async () => {
            const data = await getProductList();
            setProductList(data)
        };
        fetchDataOrigin();
    }, []);

    const navigate = useNavigate();

    const handleAdd = async (values) => {
        const dataFormat = {
            ...values,
            product: JSON.parse(values.product)
        }
        const isAdded = await addOrder(dataFormat);
        if (isAdded) {
            toast.success("Thêm mới đơn hàng thành công!", {
                theme: "colored",
                closeOnClick: true,
                autoClose: 2000,
            });
            console.log(dataFormat)
            navigate("/productList");
        } else {
            toast.error("Thêm mới đơn hàng thất bại!", {
                theme: "colored",
                closeOnClick: true,
                autoClose: 2000,
            });
        }
    };

    const validation = Yup.object({
        orderCode: Yup.string().required("Yêu cầu nhập mã đơn hàng!"),
        buyDate: Yup.date().required("Yêu cầu nhập ngày mua").typeError("Yêu cầu nhập đúng định dạng!"),
        total: Yup.number().required("Yêu cầu nhập tổng thanh toán!"),
        quantity: Yup.number().min(1, "Số lượng phải lớn hơn 0!").required("Yêu cầu nhập số lượng!").typeError("Yêu cầu nhập số!"),
        product: Yup.string().required("Yêu cầu chọn sản phẩm!")
    })

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-7 w-100">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0 text-center">Thêm mới đơn hàng</h5>
                        </div>

                        <div className="card-body">
                            <Formik initialValues={init} onSubmit={handleAdd} validationSchema={validation}>
                                {() => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="orderCode" className="form-label">
                                                Mã đơn hàng
                                            </label>
                                            <Field
                                                id="orderCode"
                                                name="orderCode"
                                                className="form-control"
                                                placeholder="VD: H001"
                                            />
                                            <ErrorMessage className={'text-danger'} name={'orderCode'}
                                                          component={'small'}/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="buyDate" className="form-label">
                                                Ngày mua
                                            </label>
                                            <Field
                                                id="buyDate"
                                                name="buyDate"
                                                type="date"
                                                className="form-control"
                                            />
                                            <ErrorMessage name={'buyDate'} component={'small'}
                                                          className={'text-danger'}/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="total" className="form-label">
                                                Tổng tiền
                                            </label>
                                            <Field
                                                id="total"
                                                name="total"
                                                className="form-control"
                                            />
                                            <ErrorMessage className={'text-danger'} name={'total'}
                                                          component={'small'}/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="quantity" className="form-label">
                                                Số lượng
                                            </label>
                                            <Field
                                                id="quantity"
                                                name="quantity"
                                                className="form-control"
                                            />
                                            <ErrorMessage name={'quantity'} component={'small'}
                                                          className={'text-danger'}/>
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="product" className="form-label">
                                                Sản phẩm
                                            </label>
                                            <Field
                                                as="select"
                                                id="product"
                                                name="product"
                                                className="form-select"
                                            >
                                                <option value="">-- Chọn sản phẩm --</option>
                                                {productList.map((product) => (
                                                    <option key={product.id} value={JSON.stringify(product)}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2">
                                            <Link to={'/productList'} className="btn btn-outline-secondary">
                                                Hủy
                                            </Link>
                                            <Button type="submit" className="btn btn-primary">
                                                Lưu
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductComponent;
