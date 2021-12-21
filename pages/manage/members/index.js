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
    const page = +router.query.page || 1;
    const start = +page === 1 ? 0 : (+page - 1) * 4;

    useEffect(() => {
        handleClickPagination(1);
    }, [filter]);
    useEffect(() => {
        (async () => {
            const members = await memberApi.getMembers( {"_start": start, _sort: 'id:ASC', ...filter });
            setMembers(members);
            //Tính tổng page
            const numberOfMovies = await memberApi.countMember(filter);
            const totalPage = Math.ceil(numberOfMovies / 4);
            setTotalPage(totalPage);
        })()
    }, [page, filter])

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
            list.push(<li key={i} className="page-item" onClick={() => handleClickPagination(i + 1)}><a className="page-link">{i + 1}</a></li>)
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
            {members && (
              <Table striped bordered hover>
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
                        <tr key={member.id} onClick={() => router.push(`/manage/members/${member.id}`)}  style={{ cursor: 'pointer' }}>
                            <th scope="row">{member.id}</th>
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
