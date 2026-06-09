import { useQuery } from '@tanstack/react-query'
import BaseTable from '../../components/BaseTable'
import type { MemberType } from '../../types/member'
import { getMembers } from '../../services/member'

export default function MemberPage() {
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            Member Page
            {isMembersLoading && <p>Loading...</p>}
            {members &&(
                <BaseTable 
                    data={members} 
                    idKey="id"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}