import { useMembers } from '../queries/member'
import { useMemberMutations } from '../mutations/member'
import { useEditModal } from '../hooks/useEditModal'
import { EditMemberModal } from './EditMemberModal'
import BaseTable from './BaseTable'
import type { Member } from '../types/member'

export function MemberList() {
  const { data: members = [], isLoading } = useMembers()
  const { update, remove } = useMemberMutations()
  const modal = useEditModal<Member>()

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <BaseTable<Member, 'id'>
        data={members}
        idKey="id"
        onEdit={modal.open}
        onDelete={(id) => remove(id)}
      />

      {modal.isOpen && modal.editingRow && (
        <EditMemberModal
          member={modal.editingRow}
          onSave={(changes) => update(modal.editingRow!.id, changes)}
          onClose={modal.close}
        />
      )}
    </>
  )
}