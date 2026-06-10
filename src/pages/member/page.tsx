import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router'
import { MemberList } from '../../components/MemberList';

export default function MemberPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box
                sx={{
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'baseline', 
                    width: '100%'}}
            >
                <h1>Member List</h1>
                <Button 
                    variant="contained"
                    onClick={() => navigate('/register')}
                    sx={{
                        borderRadius: 10, 
                        fontWeight: 'bold',
                        height: 30
                    }}
                >
                    Register
                </Button>
            </Box>
            <MemberList />
        </Box>
    )
}