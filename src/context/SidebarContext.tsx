import { createContext, useState } from "react";

export const SidebarContext = createContext<any | null>(null);

export const SidebarProvider = ({ children }: ChildrenProps) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(false)

  const closeSidebar = () => setIsOpen(false);

  const openSidebar = () => setIsOpen(true);
  
  return (
    <SidebarContext.Provider value={{ isOpen, closeSidebar, openSidebar }}>
      {children}
    </SidebarContext.Provider>
  )

}
