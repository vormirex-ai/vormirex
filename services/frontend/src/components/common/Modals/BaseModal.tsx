import React from "react";
import "./modal.css";

interface BaseModalProps {
  isOpen: boolean;
  onClose:() => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
}) =>{
  if(!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container"
      onClick={(e) => e.stopPropagation()}>

      {children}

      <button className="modal-close-btn" onClick={onClose}>
        Close
      </button>
      </div>
    </div>
  )
}

export default BaseModal;