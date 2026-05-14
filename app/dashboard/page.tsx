import Themer from '@/components/Themer'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

export default function Dashboard() {
  return (
    <div>
        <h2>Dashboard</h2>
        <LogoutLink >Logout</LogoutLink>
        <Themer/>
    </div>
  )
}
