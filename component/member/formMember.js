import React, { useState } from 'react'
import memberApi from 'api/memberApi'
import Layout from 'component/Layout/Layout'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { BASE_URL } from 'api/axiosClients'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

const FormMember = ({ member }) => {
    const router = useRouter();
    //Lưu src để hiện image preview khi chọn image
    const [srcImage, setSrcImage] = useState();
    //Lưu file để create
    const [fileImage, setFileImage] = useState();

    //Cái formik này để quản lý value input dễ hơn state
    const formik = useFormik({
        initialValues: {
            name: member?.name,
            address: member?.address,
            email: member?.email,
            phone: member?.phone,

        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const jwt = Cookies.get("jwt");
            if (member) {
                await memberApi.updateMember(values, fileImage, member.id, jwt);
            } else {
                await memberApi.createMember(values, fileImage, jwt);
            }
            router.replace("/manage/members");
        },
    });

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
        <Layout>
            <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">{
                member ? `Update member id: ${member.id}` : 'Create member'
            }</h1>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={formik.handleChange}
                            value={formik.values.name} placeholder="Name member" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" onChange={formik.handleChange}
                            value={formik.values.email} placeholder="Email" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" onChange={formik.handleChange}
                            value={formik.values.address} placeholder="Address" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" onChange={formik.handleChange}
                            value={formik.values.phone} placeholder="Phone" />
                    </Form.Group>
                </Row>

                {/* <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Author</Form.Label>
                        <Form.Select name="author" onChange={formik.handleChange}
                            defaultValue={formik.values.author}
                        >
                            <option>Choose author</option>
                            {
                                authors?.map(author => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name="category" onChange={formik.handleChange}
                            defaultValue={formik.values.category}
                        >
                            <option>Choose category</option>
                            {
                                categories?.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Col sm={6}>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Provider</Form.Label>
                            <Form.Select name="provider"
                                onChange={formik.handleChange}
                                defaultValue={formik.values.provider}
                            >
                                <option>Choose provider</option>
                                {
                                    providers?.map(provider => (
                                        <option key={provider.id} value={provider.id}>{provider.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row> */}
                <Row>
                    {/* <Col>
                        <Form.Control
                            as="textarea"
                            placeholder="Description members"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                    </Col> */}
                    <Col>
                        <Form.Group controlId="formFileLg" className="mb-3">
                            <img src={srcImagePhoto()} alt="image-member" />
                            <Form.Control type="file" name="photo" onChange={handleChangePhoto} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    {member ? "Update" : "Create"}
                </Button>
            </Form>
        </Layout>
    )
}

export default FormMember