'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal-container';

export default function ModalTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    console.log('Opening modal');
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setIsOpen(false);
  };

  console.log('Current isOpen state:', isOpen);

  return (
    <div className='p-[0.8rem] bg-white text-[1rem]'>
      <button 
        onClick={handleOpen}
        className='px-[1rem] py-[0.5rem] bg-primary text-white rounded hover:opacity-80 text-[1rem]'
      >
        모달 열기
      </button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className='bg-white p-[1.6rem] rounded-lg min-w-[20rem] text-[1rem]'>
          <h2 className='text-[1.2rem] font-bold mb-[1.2rem] text-black'>정말 삭제하시겠습니까?</h2>
          <div className='flex gap-[0.8rem]'>
            <button 
              onClick={handleClose}
              className='flex-1 px-[1rem] py-[0.7rem] border border-gray-200 text-gray-700 rounded hover:opacity-80 text-[1rem]'
            >
              취소
            </button>
            <button 
              onClick={handleClose}
              className='flex-1 px-[1rem] py-[0.7rem] bg-primary text-white rounded hover:opacity-80 text-[1rem]'
            >
              삭제하기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}