import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../components/auth/store/AuthStore'

export default function UserProfile() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const userName = user?.payload?.email ?? ''

  const logoutAction = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="container">
      <h1>Кабінет користувача</h1>
      <h2> Вітаємо, {userName}!</h2>
      <button onClick={logoutAction}>вийти</button>
    </div>
  )
}
