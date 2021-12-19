import React, { useState, useEffect } from 'react'
import FormMember from 'component/member/formMember'
import memberApi from 'api/memberApi'
import { useRouter } from 'next/router'

const UpdateMember = () => {
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
        <FormMember member={member} />
    )
}

export default UpdateMember
