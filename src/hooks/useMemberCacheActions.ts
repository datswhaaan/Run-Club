import { useQueryClient } from '@tanstack/react-query'
import { MEMBERS_KEY } from '../services/member'
import type { Member } from '../types/member'

export function useMemberCacheActions() {
  const queryClient = useQueryClient()

  const add = (member: Omit<Member, 'id'>) => {
    queryClient.setQueryData<Member[]>(MEMBERS_KEY, (old = []) => [
      ...old,
      { ...member, id: Date.now() },
    ])
  }

  const update = (id: number, changes: Partial<Member>) => {
    queryClient.setQueryData<Member[]>(MEMBERS_KEY, (old = []) =>
      old.map((m) => (m.id === id ? { ...m, ...changes } : m))
    )
  }

  const remove = (id: number) => {
    queryClient.setQueryData<Member[]>(MEMBERS_KEY, (old = []) =>
      old.filter((m) => m.id !== id)
    )
  }

  return { add, update, remove }
}