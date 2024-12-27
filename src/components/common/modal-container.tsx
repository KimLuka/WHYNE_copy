"use client";

import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

function Modal({ isOpen, onClose, children, className = "" }: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setAnimating(true);
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!showModal) return null;

  const getAnimationClass = () => {
    return animating
      ? "translate-y-0 transition-transform duration-300"
      : "translate-y-full transition-transform duration-300";
  };

  return (
    <div className="fixed h-auto inset-0 z-50 flex tablet:items-center tablet:justify-center">
      <div
        className="fixed flex h-auto inset-0 bg-black opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className={`
          flex flex-col
          relative z-20
          bg-white 
          w-full          
          max-w-full             
          tablet:h-auto
          my-0
          mx-auto
          ${getAnimationClass()}
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
