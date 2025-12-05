import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {edit, findById} from "../service/PlayerService.js";
import {Link, useNavigate} from "react-router";
import {toast} from "react-toastify";

const DetailComponent = () => {
    const {id} = useParams();
    const [detail, setDetail] = useState({
        id: "",
        maCauThu: "",
        ten: "",
        ngaySinh: "",
        gia: ""
    });

    let detailFind = null;

    const navigate = useNavigate();
    useEffect(() => {
        if (findById(id) !== null) {
            console.log(findById(id))
            detailFind = findById(id);
            setDetail(detailFind);
        }
    }, []);


    const handleEdit = (values) => {
        edit(values);
        toast.success("Chỉnh sửa thành công!", {
            theme: "colored",
            autoClose: 5000,
            closeOnClick: true,
            position: "top-right"
        })
        navigate("/players");
    }

    return (
        <>
            <h3>Detail</h3>
            <Formik initialValues={detail} onSubmit={handleEdit} enableReinitialize={true}>
                <Form>
                    <Field type="hidden" name={'id'}/>
                    <div className={'input-group'}>
                        <label className={'input-group-text'}>
                            Tên
                        </label>
                        <Field type="text" name="ten"/>
                    </div>

                    <div className={'input-group'}>
                        <label className={'input-group-text'}>
                            Mã cầu thủ
                        </label>
                        <Field type="text" name="maCauThu"/>
                    </div>

                    <div className={'input-group'}>
                        <label className={'input-group-text'}>
                            Ngày sinh
                        </label>
                        <Field type="date" name="ngaySinh"/>
                    </div>

                    <div className={'input-group'}>
                        <label className={'input-group-text'}>
                            Giá trị
                        </label>
                        <Field type="text" name="gia"/>
                    </div>
                    <Link className={'btn btn-secondary'} to={"/players"}>Đóng</Link>
                    <Button type={"submit"}>Chỉnh sửa</Button>
                </Form>
            </Formik>
        </>
    );
}

export default DetailComponent;