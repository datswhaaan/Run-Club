import { Box } from "@mui/material"
import RegisterMemberForm from "../components/RegisterMemberForm"
import { useMemberCacheActions } from "../hooks/useMemberCacheActions"
import { useNavigate } from "react-router"

export default function RegisterPage() {
    const navigate = useNavigate()
    const { add } = useMemberCacheActions()

    return (
        <Box>
            <h1>Register New Member</h1>
            <RegisterMemberForm 
                onSave={(values) => add(values)}
                onClose={() => navigate(-1)}
            />
        </Box>
    )
}