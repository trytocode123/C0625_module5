import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {add} from "../service/PlayerService.js";
import * as Yup from "yup";
import {toast} from "react-toastify";

const AddComponent = () => {
    const [playerAdd, setPlayerAdd] = useState({
        id: "",
        maCauThu: "",
        ten: "",
        ngaySinh: "",
        gia: ""
    });
    const navigate = useNavigate();
    const handleAdd = (values) => {
        add(values);
        console.log(values)
        toast.success("Thêm mới thành công!", {
            position: "top-right",
            theme: "colored",
            autoClose: 5000
        })
        // navigate("/players/:search");
    }
    const validate = Yup.object({
        id: Yup.number().typeError("Yêu cầu nhập số")
            .min(1, "Id phải lớn hơn 1")
            .max(100, "Id phải nhỏ hơn 100")
            .required("Yêu cầu nhập id"),
        maCauThu: Yup.string().matches(/^PL([0-9]){3}$/, "Mã cầu thủ không đúng định dạng")
            .required("Yêu cầu nhập mã cầu thủ"),
        ten: Yup.string().matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/, "Tên cầu thủ không đúng định dạng")
            .required("Yêu cầu nhập tên cầu thủ"),
        ngaySinh: Yup.date().required("Yêu cầu nhập ngày sinh"),
        gia: Yup.number().required("Yêu cầu nhập giá")
            .min(2000000, "Yêu cầu giá lớn hơn 2.000.000 đ").typeError("Yêu cầu nhập số"),

    })
    return (
        <>
            <Formik initialValues={playerAdd} onSubmit={handleAdd} validationSchema={validate}>
                <Form className="border p-3 rounded">
                    <h3 className="mb-3">Add player</h3>
                    <div className="mb-3">
                        <label className="form-label">ID</label>
                        <Field
                            type="number"
                            name={"id"}
                            className="form-control"
                        />
                        <ErrorMessage className={'text-danger'} name={'id'} component={'small'}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mã cầu thủ</label>
                        <Field
                            type="text"
                            name="maCauThu"
                            className="form-control"
                        />
                        <ErrorMessage className={'text-danger'} name={'maCauThu'} component={'small'}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tên cầu thủ</label>
                        <Field
                            type="text"
                            name="ten"
                            className="form-control"
                        />
                        <ErrorMessage className={'text-danger'} name={'ten'} component={'small'}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <Field
                            type="date"
                            name="ngaySinh"
                            className="form-control"
                        />
                        <ErrorMessage className={'text-danger'} name={'ngaySinh'} component={'small'}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Giá trị (VND)</label>
                        <Field
                            type="text"
                            name="gia"
                            className="form-control"
                        />
                        <ErrorMessage className={'text-danger'} name={'gia'} component={'small'}/>
                    </div>

                    <Button className="btn btn-primary me-2" type="submit">
                        Save
                    </Button>

                    <Link to="/players" className="btn btn-secondary">
                        Back
                    </Link>
                </Form>
            </Formik>
        </>
    )
}
export default AddComponent;