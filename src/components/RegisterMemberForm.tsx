import { Box } from "@mui/material"
import MemberInfoForm from "./MemberInfoForm"
import type { MemberFormValues } from "../types/member"

interface Props {
    onSave: (member: MemberFormValues) => void
    onClose: () => void
}

export default function RegisterMemberForm({ onSave, onClose }: Props) {
    const handleSubmit = (values: MemberFormValues) => {
        onSave(values)
        onClose()
    }

    return (
        <Box>
            <MemberInfoForm 
                handleSubmit={handleSubmit}
                handleCancel={onClose}
            />
        </Box>
    )
}