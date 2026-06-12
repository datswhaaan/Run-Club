import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MEMBERS_KEY } from '../services/member'
import type { Member, MemberFormValues } from '../types/member'

export function useMemberCacheActions() {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (member: MemberFormValues) => ({
      ...member,
      id: Date.now(),
      pace: `${member.paceMin}:${String(member.paceSec).padStart(2, '0')}`,
    }),
    onSuccess: (newMember) => {
      queryClient.setQueryData<Member[]>(MEMBERS_KEY, (old = []) => [
        ...old,
        newMember,
      ])
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, changes }: { id: number; changes: Partial<Member> }) => {
      const computedPace = `${changes.paceMin}:${String(changes.paceSec).padStart(2, '0')}`;

      return {
        id,
        updatedData: {
          ...changes,
          pace: computedPace,
        }
      };
    },
    
    onSuccess: (data) => {
      queryClient.setQueryData<Member[]>(MEMBERS_KEY, (old = []) =>
        old.map((m) => (m.id === data.id ? { ...m, ...data.updatedData } : m))
      );
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: number) => id,
    onSuccess: (id) => {
      queryClient.setQueryData<Member[]>(MEMBERS_KEY, (old = []) =>
        old.filter((m) => m.id !== id)
      )
    },
  })

  return {
    add: addMutation.mutate,
    update: updateMutation.mutate,
    remove: removeMutation.mutate,

    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
  }
}