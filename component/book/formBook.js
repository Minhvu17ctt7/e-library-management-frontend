import React, { useState } from 'react'
import bookApi from 'api/bookApi'
import Layout from 'component/Layout/Layout'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const FormBook = ({ authors, categories, providers, book }) => {
    console.log('book', book);
    const history = useRouter();
    //Lưu src để hiện image preview khi chọn image
    const [srcImage, setSrcImage] = useState();
    //Lưu file để create
    const [fileImage, setFileImage] = useState();

    //Cái formik này để quản lý value input dễ hơn state
    const formik = useFormik({
        initialValues: {
            name: book?.name ? book?.name : '',
            page: book?.page ? book?.page : 0,
            remain: book?.remain ? book?.remain : 0,
            price: book?.price ? book?.price : 0,
            description: book?.description ? book?.description : '',
            author: book?.author.id ? book?.author.id : null,
            provider: book?.provider.id ? book?.provider.id : null,
            category: book?.category.id ? book?.category.id : null,
        },
        onSubmit: async (values) => {
            if (book) {
                await bookApi.updateBook(values, fileImage, book.id);
            } else {
                await bookApi.createBook(values, fileImage);
            }
            history.replace("/admin/books");
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
        if (book?.photo) return `http://localhost:1337${book.photo.url}`;
        return "/image/thumbnail.png"
    }

    return (
        <Layout>
            <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">{
                book ? `Update book id: ${book.id}` : 'Create book'
            }</h1>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={formik.handleChange}
                            value={formik.values.name} placeholder="Name book" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Page</Form.Label>
                        <Form.Control type="number" step='1' name="page" placeholder="page"
                            onChange={formik.handleChange}
                            value={formik.values.page}
                            required />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Remain</Form.Label>
                        <Form.Control type="number" step='1' name="remain"
                            onChange={formik.handleChange}
                            value={formik.values.remain}
                            placeholder="remain" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" step='1' name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            placeholder="Price" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Author</Form.Label>
                        <Form.Select name="author" onChange={formik.handleChange}
                            defaultValue={formik.values.author}
                        >
                            <option>Choose author</option>
                            {
                                authors.map(author => (
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
                                categories.map(category => (
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
                                    providers.map(provider => (
                                        <option key={provider.id} value={provider.id}>{provider.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control
                            as="textarea"
                            placeholder="Description books"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                    </Col>
                    <Col>
                        <Form.Group controlId="formFileLg" className="mb-3">
                            <img src={srcImagePhoto()} alt="image-book" />
                            <Form.Control type="file" name="photo" onChange={handleChangePhoto} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    {book ? "Update" : "Create"}
                </Button>
            </Form>
        </Layout>
    )
}

export default FormBook