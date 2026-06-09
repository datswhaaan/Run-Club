import BaseTable from '../../components/BaseTable'
import mockMemberData from '../../components/mock/member.json'
import type { MemberType } from '../../types/member'

export default function MemberPage() {
    const handleEdit = (row: MemberType) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row: MemberType) => {
        console.log('Delete id:', row.id);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            Member Page
            <BaseTable 
                data={mockMemberData} 
                idKey="id"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}