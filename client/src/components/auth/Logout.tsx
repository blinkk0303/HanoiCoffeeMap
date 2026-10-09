import React from 'react'
import {Button} from '../ui/button'
import {useAuthStore} from '../../stores/useAuthStore'
import { useNavigate } from 'react-router';



const Logout = () => {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/signin');
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <Button onClick={handleLogout} variant="ghost" className='text-sm bg-amber-500 cursor-pointer hover:bg-amber-600 text-white'>
      Logout
    </Button>
  )
}

export default Logout