import React, { createContext, useContext, useCallback, useState, ReactNode } from 'react'

interface SidebarContextProps {
  isSidebarOpen: boolean
  toggleSidebarOpen: () => void
}

const SidebarContext = createContext({} as SidebarContextProps )

export const useSideBarContext = () => {
  return useContext(SidebarContext)
}

export function SidebarToggleProvider({children}: {children: ReactNode}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebarOpen = useCallback(() => {
    setIsSidebarOpen(oldIsSidebarOpen => !oldIsSidebarOpen)
  }, [])

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}