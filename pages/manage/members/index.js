import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import memberApi from 'api/memberApi'
import Layout from 'component/Layout/Layout'
import ModalDeleteMember from 'component/modal/DeleteMember'
import { Form, Row, Col, Button, Table } from 'react-bootstrap'
import MemberSearchForm from 'component/member/memberSearchForm'

const initFilterState = {
    'name_contains': null,
    'email_contains': null,
    'address_contains': null,
    'phone_contains': null,
};

const Members = () => {
    const router = useRouter();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [currentMember, setCurrentMember] = useState();
    const [members, setMembers] = useState();
    const [totalPage, setTotalPage] = useState();
    const [filter, setFilter] = useState(initFilterState);
    const [sizePage, setSizePage] = useState(3);
    const page = +router.query.page || 1;
    const start = +page === 1 ? 0 : (+page - 1) * sizePage;

    useEffect(() => {
        handleClickPagination(1);
    }, [filter]);
    useEffect(() => {
        (async () => {
            const members = await memberApi.getMembers(sizePage, {"_start": start, _sort: 'id:ASC', ...filter });
            setMembers(members);
            //Tính tổng page
            const numberOfMovies = await memberApi.countMember(filter);
            const totalPage = Math.ceil(numberOfMovies / sizePage);
            setTotalPage(totalPage);
        })()
    }, [page, filter, sizePage])

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => {
        setShowModalDelete(true);
    }

    const handleDeleteMember = (id) => {
        setCurrentMember(id);
        handleShowModalDelete();
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
            list.push(<li key={i} className={page === (i + 1) ? "page-item active" : "page-item"} onClick={() => handleClickPagination(i + 1)}><a className="page-link">{i + 1}</a></li>)
        }
        return list;
    }

    return (
        <Layout>
            <Row>
                <Col className="d-flex flex-row-reverse">
                    <Link href="/manage/members/create">
                        <Button variant="primary"  size='lg'>Create new member</Button>
                    </Link>
                </Col>
            </Row>
            <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">Members</h1>
            <MemberSearchForm
              setSearchFilter={setFilter}
            />
            <label style={{marginBottom: "10px"}}>
            Items per page: 
            <select value={sizePage} onChange={(e) => {
                setSizePage(e.target.value);
                console.log(e.target.value);
                }} >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="30">30</option>
                </select>
            </label>
            {members && (
              <Table striped bordered hover>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">CODE</th>
                        <th scope="col">NAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">ADDRESS</th>
                        <th scope="col">PHONE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id} onClick={() => router.push(`/manage/members/${member.id}`)}  style={{ cursor: 'pointer' }}>
                            <th scope="row">{member.code}</th>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.address}</td>
                            <td>{member.phone}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <Link href={`/manage/members/update/${member.id}`}>
                                    <Button variant="outline-success">Edit</Button>
                                </Link>
                                {' '}<Button variant="outline-danger" onClick={() => handleDeleteMember(member.id)}>Delete</Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>)}
            {members && (
            <nav aria-label="Page navigation"  className="d-flex justify-content-center">
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
