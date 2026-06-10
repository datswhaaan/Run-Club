import { useQuery } from '@tanstack/react-query'
import { getMembers, MEMBERS_KEY } from '../services/member'

export function useMembers() {
  return useQuery({
    queryKey: MEMBERS_KEY,
    queryFn: getMembers,
    staleTime: 1000 * 60 * 5,
  })
}