// app/test/page.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal-container";
import AddWine from "@/components/Modal-add-wine";

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-primary px-6 py-3 text-white hover:bg-[#7b52f1] transition-colors"
      >
        와인 등록하기
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddWine onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}