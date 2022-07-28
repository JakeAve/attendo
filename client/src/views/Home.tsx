import { useUserContext } from '../providers/UserProvider'

export const Home = () => {
  const { user } = useUserContext()
  return (
    <>
      <h1>Welcome to Attendo, {user?.displayName}</h1>
      <p>Some segment of text</p>
    </>
  )
}
