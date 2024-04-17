import React, {useState, createContext, ReactNode} from "react";

// Define type for SidebarProvider props
interface SidebarProviderProps {
  children: ReactNode;
}

// create context
export const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  handleClose: () => {},
});

const SidebarProvider: React.FC<SidebarProviderProps> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={{isOpen, setIsOpen, handleClose}}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
