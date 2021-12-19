import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import memberApi from 'api/memberApi'
import Layout from 'component/Layout/Layout'
import ModalDeleteMember from 'component/modal/DeleteMember'
import { Form, Row, Col, Button } from 'react-bootstrap'

const Members = () => {
    const router = useRouter();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [currentMember, setCurrentMember] = useState();
    const [members, setMembers] = useState();
    const [page, setPage] = useState();
    const [totalPage, setTotalPage] = useState();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        (async () => {
            const page = router.query.id || 1;
            setPage(page)
            //Lấy member theo page, vì strapi version 3. chưa hỗ trợ pagination nên phải làm theo cách start, limit
            const start = +page === 1 ? 0 : (+page - 1) * 4;
            const members = await memberApi.getMembers(start);
            members = members.filter((member) => member.name.toLowerCase().includes(name.toLowerCase()) && member.address.toLowerCase().includes(address.toLowerCase()) && member.email.toLowerCase().includes(email.toLowerCase()) && member.phone.toString().includes(phone))
            setMembers(members)
            //Tính tổng page
            const numberOfMovies = await memberApi.countMember();
            const totalPage = Math.floor(numberOfMovies / 3)
            setTotalPage(totalPage)
        })()
    }, [name, email, address, phone])

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => {
        setShowModalDelete(true);
    }

    const handleDeleteMember = (id) => {
        setCurrentMember(id);
        handleShowModalDelete();
    }

    const handleChange = (event) => {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        if (fieldName == "name"){
            setName(fleldVal);
        } else if (fieldName == "email"){
            setEmail(fleldVal);
        } else if (fieldName == "address"){
            setAddress(fleldVal);
        } else if (fieldName == "phone"){
            setPhone(fleldVal);
        }
        
      }


    const handleClickPagination = (pageNext) => {
        if (pageNext > totalPage || pageNext < 1) {
            return;
        }
        router.push(`/manage/members?page=${pageNext}`);
    }
    //Hiện item pagination 
    const itemPagination = () => {
        let list = [];
        for (let i = 0; i < totalPage; i++) {
            list.push(<li key={i} className="page-item" onClick={() => handleClickPagination(i + 1)}><a className="page-link">{i + 1}</a></li>)
        }
        return list;
    }


    return (
        <Layout>
            
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <Link href="/manage/members/create">
                        {/* <Button className="btn btn-primary" size='lg'>Create member</Button> */}
                        <Button variant="primary"  size='lg'>Create member</Button>
                    </Link>
                </Col>
            </Row>
            <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">Members</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={handleChange.bind(this)}
                            value={name} placeholder="Enter name member" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" onChange={handleChange.bind(this)}
                            value={email} placeholder="Enter email" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address"  onChange={handleChange.bind(this)}
                            value={address} placeholder="Enter address" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone"  onChange={handleChange.bind(this)}
                            value={phone} placeholder="Enter phone" />
                    </Form.Group>
                </Row>
            </Form>
            
            {members && (<table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id} onClick={() => router.push(`/manage/members/${member.id}`)}>
                            <th scope="row">{member.id}</th>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.address}</td>
                            <td>{member.phone}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <Link href={`/manage/members/update/${member.id}`}>
                                    {/* <i className="bi bi-pencil-square"></i> */}
                                    <Button variant="outline-success">Edit</Button>
                                </Link>
                                {' '}<Button variant="outline-danger" onClick={() => handleDeleteMember(member.id)}>Delete</Button>
                                {/* <i className="bi bi-trash" onClick={() => handleDeleteMember(member.id)}></i> */}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>)}
            {members && (<nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={page <= 1 ? 'page-item disabled' : 'page-item'}
                        onClick={() => handleClickPagination(page - 1)}
                    >
                        <a className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        itemPagination()
                    }
                    <li className={page >= totalPage ? 'page-item disabled' : 'page-item'}
                        onClick={() => handleClickPagination(page + 1)}
                    >
                        <a className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>)}
            <ModalDeleteMember
                showModalDelete={showModalDelete}
                handleCloseModalDelete={handleCloseModalDelete}
                idMember={currentMember}
            />
        </Layout >
    )
}

export default Members