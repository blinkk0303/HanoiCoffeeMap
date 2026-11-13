import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'


function AdminSidebar() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className='flex-1 min-h-screen overflow-y-auto w-full p-2'>
       <Outlet/>
      </main>
    </SidebarProvider>
  )
}

export default AdminSidebar