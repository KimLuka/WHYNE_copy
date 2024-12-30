"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import AddWine from '@/components/modal-wine/modal-add-wine';

type AddWineModalContextType = {
  openAddWineModal: () => void;
  closeAddWineModal: () => void;
};

const AddWineModalContext = createContext<AddWineModalContextType | undefined>(undefined);

export const AddWineModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAddWineModal = () => setIsOpen(true);
  const closeAddWineModal = () => setIsOpen(false);

  return (
    <AddWineModalContext.Provider value={{ openAddWineModal, closeAddWineModal }}>
      {children}
      <AddWine isOpen={isOpen} onClick={closeAddWineModal} />
    </AddWineModalContext.Provider>
  );
};

export const useAddWineModal = () => {
  const context = useContext(AddWineModalContext);
  if (context === undefined) {
    throw new Error('useAddWineModal must be used within an AddWineModalProvider');
  }
  return context;
};
