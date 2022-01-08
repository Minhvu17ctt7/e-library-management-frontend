import React, { Fragment, useState } from 'react'
import bookApi from 'api/bookApi'
import Layout from 'component/Layout/Layout'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { BASE_URL } from 'api/axiosClients'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import Loading from 'component/Loading/Loading'

const FormBook = ({ authors, categories, providers, book }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
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
            const jwt = Cookies.get("jwt");
            setLoading(true);
            if (book) {
                await bookApi.updateBook(values, fileImage, book.id, jwt);
            } else {
                await bookApi.createBook(values, fileImage, jwt);
            }
            setLoading(false)
            router.replace("/manage/books");
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
        if (book?.photo) return `${BASE_URL}${book.photo.url}`;
        return "/image/thumbnail.png"
    }

    return (
        <Fragment>
            {loading && <Loading />}
            <Layout>
                <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">{
                    book ? `Update book id: ${book.id}` : 'Create book'
                }</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8 mb-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Infomation book</h5>
                                </div>
                                <div className="card-body">

                                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" for="form7Example1">Name book</label>
                                                <input type="text" name="name" onChange={formik.handleChange}
                                                    value={formik.values.name}
                                                    className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" for="form7Example2">Page</label>
                                                <input type="number" step='1' name="page" placeholder="page"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.page}
                                                    className="form-control"
                                                    min={1}
                                                    required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" for="form7Example1">Quantity</label>
                                                <input type="number" step='1' name="remain"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.remain}
                                                    className="form-control"
                                                    placeholder="remain" min={1} max={1000} required />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" for="form7Example2">Price</label>
                                                <input type="number" step='1' name="price"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.price}
                                                    className="form-control"
                                                    placeholder="Price" min={5000} max={10000000} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" for="form7Example1">Author</label>
                                                <select name="author" onChange={formik.handleChange}
                                                    defaultValue={formik.values.author}
                                                    className="form-control"
                                                >
                                                    <option>Choose author</option>
                                                    {
                                                        authors?.map(author => (
                                                            <option key={author.id} value={author.id}>{author.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" for="form7Example2">Category</label>
                                                <select name="category" onChange={formik.handleChange}
                                                    defaultValue={formik.values.category}
                                                    className="form-control"
                                                >
                                                    <option>Choose category</option>
                                                    {
                                                        categories?.map(category => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <div className="form-outline">
                                                <label className="form-label" for="form7Example1">Author</label>
                                                <select name="provider"
                                                    onChange={formik.handleChange}
                                                    defaultValue={formik.values.provider}
                                                    className="form-control"
                                                >
                                                    <option>Choose provider</option>
                                                    {
                                                        providers?.map(provider => (
                                                            <option key={provider.id} value={provider.id}>{provider.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    {/* <!-- Message input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form7Example7">Description</label>
                                        <textarea className="form-control" id="form7Example7" rows="6"
                                            placeholder="Description books"
                                            name="description"
                                            onChange={formik.handleChange}
                                            value={formik.values.description}></textarea>
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
                        <div className="col-md-12 mb-4 text-center">
                            <Button type="submit" class="btn btn-primary m-2" disabled={loading}>
                                {book ? "Update" : "Create"}
                            </Button>
                            <button type="button" class="btn btn-secondary m-2" onClick={() => router.push("/manage/books")}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Layout>
        </Fragment>
    )
}

export default FormBook
