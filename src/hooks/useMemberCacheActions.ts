import { useQueryClient } from '@tanstack/react-query'
import { MEMBERS_KEY } from '../services/member'
import type { Member, MemberFormValues } from '../types/member'

export function useMemberCacheActions() {
  const queryClient = useQueryClient()

  const add = (member: MemberFormValues) => {
    queryClient.setQueryData<Member[]>(MEMBERS_KEY, (old = []) => [
      ...old,
      { ...member, 
        id: Date.now(), 
        pace: String(member.paceMin) + ":" + String(member.paceSec).padStart(2, '0')
      },
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