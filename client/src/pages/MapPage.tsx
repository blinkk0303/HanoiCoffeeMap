import React from 'react'
import Logout from '../components/auth/Logout'
import { useAuthStore } from '@/stores/useAuthStore';

const MapPage = () => {
  const user = useAuthStore(s => s.user);
  
  return (
    <div>
      <Logout />
      <h1>Map Page</h1>
      <h1>{user?.fullname}</h1>
      <p>This is the map page.</p>
    </div>
  )
}

export default MapPage