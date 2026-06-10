import Members from '../components/mock/member.json'
import type { Member } from '../types/member'


export const MEMBERS_KEY = ['runclub', 'members'] as const

export async function getMembers(): Promise<Member[]> {
  return Members
}