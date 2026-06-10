import { useQuery } from '@tanstack/react-query'
import BaseTable from '../../components/BaseTable'
import type { MemberType } from '../../types/member'
import { getMembers } from '../../services/member'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router'

export default function MemberPage() {
    const navigate = useNavigate();
    
    const handleEdit = (row: MemberType) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row: MemberType) => {
        console.log('Delete id:', row.id);
    };

    const { data: members, isLoading: isMembersLoading } = useQuery({
        queryKey: ['members'],
        queryFn: getMembers,
        gcTime: 50000,
    })

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
            {isMembersLoading && <p>Loading...</p>}
            {members &&(
                <BaseTable 
                    data={members} 
                    idKey="id"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    />
            )}
        </Box>
    )
}