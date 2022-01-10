import React, { Fragment, useEffect, useState } from 'react'
import Layout from 'component/Layout/Layout'
import { Row, Col } from 'react-bootstrap'
import memberApi from 'api/memberApi'
import { BASE_URL } from 'api/axiosClients'
import { useRouter } from 'next/router'

const MemberDetail = () => {
    const router = useRouter();
    const [member, setMember] = useState();
    useEffect(() => {
        (async () => {
            const id = router.query.id;
            const member = await memberApi.getMemberById(id); 
            setMember(member)
        })()
    }, [router])

    return (
        <Layout>
            {member && (<Fragment>
                <h1 className="h3 pb-2 mb-3 border-bottom">Member id: {member.id}</h1>
                <Row>

                </Row>
                <Row className="mb-3 pb-3">
                    <Col sm={5}>
                        <img src={member.photo ? `${BASE_URL}${member.photo.url}` : "/image/thumbnail.png"} alt="photo-member" style={{ width: '90%' }} />
                    </Col>
                    <Col sm={7}>
                        <h4 className="mb-3">{member.name}</h4>
                        <br />
                        <p className="mb-3">Email: {member.email}</p>
                        <br />
                        <p className="mb-3">Address: {member.address}</p>
                        <br />
                        <p className="mb-3">Phone: {member.phone}</p>
                        <br />
                        <p className="mb-3">Page: {member.page}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>
                        <h4 clasName="mb-3">Description</h4>
                        <i>{member.description}</i>
                    </Col>
                </Row>
                <button type="button" className="btn btn-secondary m-2 button-style button-17 float-right" onClick={() => router.push("/manage/members")}>Cancel</button>

            </Fragment>)}
        </Layout>
    )
}

export default MemberDetail
