import {ErrorMessage, Field, Form, Formik} from "formik";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useState} from "react";
import {getAllOrigin} from "../service/OriginService.js";
import {addPig} from "../service/PigService.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";
import * as Yup from "yup";

const AddPigComponent = () => {
    const [originList, setOriginList] = useState([]);

    const init = {
        pigCode: "",
        initTime: "",
        initWeight: "",
        endTime: "",
        endWeight: "",
        origin: ""
    };

    useEffect(() => {
        const fetchDataOrigin = async () => {
            const data = await getAllOrigin();
            setOriginList(data);
        };
        fetchDataOrigin();
    }, []);

    const navigate = useNavigate();

    const handleAdd = async (values) => {
        const dataFormat = {
            ...values,
            origin: JSON.parse(values.origin),
            endWeight: values.endTime === "" ? values.initWeight : values.endWeight
        }
        const isAdded = await addPig(dataFormat);
        if (isAdded) {
            toast.success("Thêm mới heo thành công!", {
                theme: "colored",
                closeOnClick: true,
                autoClose: 2000,
            });
            navigate("/pigList");
        } else {
            toast.error("Thêm mơ heo thất bại!", {
                theme: "colored",
                closeOnClick: true,
                autoClose: 2000,
            });
        }
    };

    const validation = Yup.object({
        pigCode: Yup.string().required("Yêu cầu nhập mã heo").matches(/^'MH-'[0-9]{4}$/, "Yêu cầu nhập mã heo đúng định dạng(MH-XXX)!"),
        initTime: "",
        initWeight: Yup.number().typeError("Yêu cầu nhập số").min(5, "Trọng lượng khi nhập phải lớn hơn 5").required("Yêu cầu nhập trọng lượng khi nhập"),
        endTime: "",
        endWeight: 0,
        origin: ""
    })

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-7 w-100">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0 text-center">Thêm mới heo</h5>
                        </div>

                        <div className="card-body">
                            <Formik initialValues={init} onSubmit={handleAdd} validationSchema={validation}>
                                {() => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="pigCode" className="form-label">
                                                Mã heo
                                            </label>
                                            <Field
                                                id="pigCode"
                                                name="pigCode"
                                                className="form-control"
                                                placeholder="VD: H001"
                                            />
                                            <ErrorMessage className={'text-danger'} name={'pigCode'}
                                                          component={'small'}/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="initTime" className="form-label">
                                                Ngày nhập
                                            </label>
                                            <Field
                                                id="initTime"
                                                name="initTime"
                                                type="date"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="initWeight" className="form-label">
                                                Trọng lượng khi nhập chuồng (kg)
                                            </label>
                                            <Field
                                                id="initWeight"
                                                name="initWeight"
                                                className="form-control"
                                            />
                                            <ErrorMessage className={'text-danger'} name={'initWeight'} component={'small'}/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="endTime" className="form-label">
                                                Ngày xuất
                                            </label>
                                            <Field
                                                id="endTime"
                                                name="endTime"
                                                type="date"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="endWeight" className="form-label">
                                                Trọng lượng khi xuất chuồng (kg)
                                            </label>
                                            <Field
                                                id="endWeight"
                                                name="endWeight"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="origin" className="form-label">
                                                Xuất xứ
                                            </label>
                                            <Field
                                                as="select"
                                                id="origin"
                                                name="origin"
                                                className="form-select"
                                            >
                                                <option value="">-- Chọn xuất xứ --</option>
                                                {originList.map((origin) => (
                                                    <option key={origin.id} value={JSON.stringify(origin)}>
                                                        {origin.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2">
                                            <button type="reset" className="btn btn-outline-secondary">
                                                Hủy
                                            </button>
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

export default AddPigComponent;
