import { Box } from "@mui/material"
import MemberInfoForm from "../components/MemberInfoForm"
import { useMemberCacheActions } from "../hooks/useMemberCacheActions"
import { useMembers } from "../hooks/useMembers"
import { useParams } from 'react-router'
import { useNavigate } from "react-router"

export default function EditPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: members } = useMembers()
    const member = members?.find((m) => m.id === Number(id))
    const { update } = useMemberCacheActions()
    console.log(member);

    return (
        <Box>
            
            {member && (
                <>
                    <h1>Edit Member</h1>
                    <MemberInfoForm 
                        member={member}
                        handleSubmit={(changes) => {update({id: member?.id, changes: changes}), navigate(-1)}}
                        handleCancel={() => navigate(-1)}
                    />
                </>
            )}
        </Box>
    )
}