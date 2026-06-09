import Member from '../components/mock/member.json'

export async function getMembers() {
  await new Promise(resolve => setTimeout(resolve, 500))

  return Member
}