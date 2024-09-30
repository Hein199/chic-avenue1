import { cookies } from 'next/headers'

const getId = () => {
  const cookieStore = cookies()
  const id = cookieStore.get('id').value
  return id
}

export default getId;