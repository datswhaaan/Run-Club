import { useMembers } from '../hooks/useMembers'
import { useMemberCacheActions } from '../hooks/useMemberCacheActions'
import { useEditModal } from '../hooks/useEditModal'
import { EditMemberModal } from './EditMemberModal'
import BaseTable from './BaseTable'
import type { Member} from '../types/member'

export function MemberList() {
  const { data: members = [], isLoading } = useMembers()
  const { update, remove } = useMemberCacheActions()
  const modal = useEditModal<Member>()

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <BaseTable<Member, 'id'>
        data={members}
        idKey="id"
        hiddenKeys={["paceMin", "paceSec"]}
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