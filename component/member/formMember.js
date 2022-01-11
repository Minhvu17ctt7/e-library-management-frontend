import React, { Fragment, useState } from 'react'
import memberApi from 'api/memberApi'
import Layout from 'component/Layout/Layout'
import { Form, Button } from 'react-bootstrap'
import { BASE_URL } from 'api/axiosClients'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import * as Yup from "yup";
import Loading from 'component/Loading/Loading';
import styles from "styles/Member.module.css";

const FormMember = ({ member }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    //Lưu src để hiện image preview khi chọn image
    const [srcImage, setSrcImage] = useState();
    //Lưu file để create
    const [fileImage, setFileImage] = useState();

    //Cái formik này để quản lý value input dễ hơn state
    const formik = useFormik({
        initialValues: {
            code: member?.code,
            name: member?.name,
            address: member?.address,
            email: member?.email,
            phone: member?.phone,

        },
        validationSchema: Yup.object({
            code: Yup.string()
                .required("Required!"),
            name: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
            address: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            phone: Yup.string().matches(new RegExp('[0-9]{7}'))
                .required("Required!"),
        }),
        //   validate:Yup.object({
        //     code: Yup.string()
        //       .required("Required!"),
        //     name: Yup.string()
        //       .min(8, "Minimum 8 characters")
        //       .required("Required!"),
        //     address: Yup.string()
        //       .min(8, "Minimum 8 characters")
        //       .required("Required!"),
        //     email: Yup.string()
        //       .email("Invalid email format")
        //       .required("Required!"),
        //     phone: Yup.string().matches(new RegExp('[0-9]{7}'))
        //       .required("Required!"),
        //   }),
        enableReinitialize: true,

        onSubmit: async (values) => {
            setLoading(true)
            const jwt = Cookies.get("jwt");
            if (member) {
                await memberApi.updateMember(values, fileImage, member.id, jwt);
            } else {
                await memberApi.createMember(values, fileImage, jwt);
            }
            setLoading(false)
            router.replace("/manage/members");
        },
    });

    // const validate = (values) => {
    //     let errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     const phone = /^[0-9]{7}/i;
    //     if(!formik.values.code){
    //         errors.code = "Code must not be empty"
    //     }

    //     if(!formik.values.name){
    //         errors.name = "Name must not be empty"
    //     }

    //     if(!formik.values.address){
    //         errors.address = "Address must not be empty"
    //     }

    //     if(!formik.values.email){
    //         errors.email = "Email must not be empty"
    //     } else if (!regex.test(formik.values.email)) {
    //         errors.email = "Invalid email format";
    //     }

    //     if(!formik.values.phone){
    //         errors.phone = "Phone must not be empty"
    //     } else if (!phone.test(formik.values.phone)) {
    //         errors.phone = "Invalid phone";
    //     }

    //     return errors;
    //   };

    //khi input file change thì gọi để show image preview
    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        setFileImage(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = e => {
            setSrcImage([reader.result])
        }
    }

    const srcImagePhoto = () => {
        if (srcImage) return srcImage;
        if (member?.photo) return `${BASE_URL}${member.photo.url}`;
        return "/image/thumbnail.png"
    }

    return (
        <Fragment>
            {loading && <Loading />}
            <Layout>
                <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">{
                    member ? `Update member id: ${member.id}` : 'Create member'
                }</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8 mb-4">
                            <div className="card mb-4">
                                <div className="card-header py-3 gradient-card bigger-card">
                                    <h5 className="mb-0">Infomation Member</h5>
                                </div>
                                <div className="card-body">

                                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label">Code member</label>
                                                <input type="text" name="code" onChange={formik.handleChange}
                                                    value={formik.values.code}
                                                    className="form-control" />
                                                {formik.errors.code ? (<div className={styles.alert}>{formik.errors.code}</div>) : null}

                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label">Name member</label>
                                                <input type="text" name="name" onChange={formik.handleChange}
                                                    value={formik.values.name}
                                                    className="form-control" />
                                                {formik.errors.name ? (<div className={styles.alert}>{formik.errors.name}</div>) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label">Address</label>
                                                <input type="text" name="address" onChange={formik.handleChange}
                                                    value={formik.values.address}
                                                    className="form-control" />
                                                {formik.errors.address ? (<div className={styles.alert}>{formik.errors.address}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label">Email</label>
                                                <input type="text" name="email" onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    className="form-control" />
                                                {formik.errors.email ? (<div className={styles.alert}>{formik.errors.email}</div>) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label">Phone</label>
                                                <input type="text" name="phone" onChange={formik.handleChange}
                                                    value={formik.values.phone}
                                                    className="form-control" />
                                                {formik.errors.phone ? (<div className={styles.alert}>{formik.errors.phone}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="col">

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Image</h5>
                                </div>
                                <div className="card-body text-center">
                                    <img src={srcImagePhoto()}
                                        className="img-fluid rounded rounded-left mb-2" alt="Thumbnail-book" style={{ width: "200px" }} />
                                    <Form.Control type="file" name="photo" onChange={handleChangePhoto} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4 button-container">
                            <Button type="submit" className="btn btn-primary m-2 button-style button-17 button-confirm" disabled={loading}>
                                {member ? "Update" : "Create"}
                            </Button>
                            <button type="button" className="btn btn-secondary m-2 button-17 button-style" onClick={() => router.push("/manage/members")}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Layout>
        </Fragment>
    )
}

export default FormMember