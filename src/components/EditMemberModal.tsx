import type { Member } from '../types/member'
import { Dialog, DialogTitle } from '@mui/material'
import MemberInfoForm from './MemberInfoForm'

interface Props {
    member: Member
    onSave: (changes: Partial<Member>) => void
    onClose: () => void
}

export function EditMemberModal({ member, onSave, onClose }: Props) {
    const handleSubmit = (values: Partial<Member>) => {
        onSave({
            ...values,
            pace: String(values.paceMin) + ":" + String(values.paceSec),
        })
        onClose()
    }

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Edit Member Information</DialogTitle>

            <MemberInfoForm 
                member={member}
                handleSubmit={handleSubmit}
                handleCancel={onClose}
            />
        </Dialog>
    )
}