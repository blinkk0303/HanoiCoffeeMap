import React from 'react'
import Logout from '../components/auth/Logout'
import { useAuthStore } from '@/stores/useAuthStore';

const MapPage = () => {
  const user = useAuthStore(s => s.user);
  return (
    <div>
      {user && <Logout/>}
      <a className="nav-link underline " href="/dashboard">Dashboard</a>
      <h1>Map Page</h1>
      <h1>Welcome {user? user.full_name : "GUEST"} to our application</h1>
    </div>
  )
}

export default MapPage