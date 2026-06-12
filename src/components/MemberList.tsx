import { useMembers } from '../hooks/useMembers'
import { useMemberCacheActions } from '../hooks/useMemberCacheActions'
import { useEditModal } from '../hooks/useEditModal'
import { EditMemberModal } from './EditMemberModal'
import BaseTable from './BaseTable'
import type { Member} from '../types/member'
import type { ColumnConfig } from '../types/column'

export function MemberList() {
  const { data: members = [], isLoading } = useMembers()
  const { update, remove } = useMemberCacheActions()
  const modal = useEditModal<Member>()
  const displayColumns: ColumnConfig<Member>[] = [
    { key: 'name', label: 'Name', width: 200 },
    { key: 'email', label: 'Email', width: 250 },
    { key: 'age', label: 'Age', width: 80 },
    { key: 'gender', label: 'Gender', width: 120 },
    { key: 'pace', label: 'Pace (min/km)', width: 140 },
  ]

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <BaseTable<Member, 'id'>
        data={members}
        idKey="id"
        columns={displayColumns}
        onEdit={modal.open}
        onDelete={(id) => remove(id)}
      />

      {modal.isOpen && modal.editingRow && (
        <EditMemberModal
          member={modal.editingRow}
          onSave={(changes) => update({id: modal.editingRow!.id, changes: changes})}
          onClose={modal.close}
        />
      )}
    </>
  )
}