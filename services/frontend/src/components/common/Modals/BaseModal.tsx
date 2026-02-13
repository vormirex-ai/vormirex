import React from "react";
import "./modal.css";
import { X } from "lucide-react";


interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container"
        onClick={(e) => e.stopPropagation()}>

        <button className="modal-close-icon" onClick={onClose}>
          <X size={20} />

        </button>
        {children}

      </div>
    </div>
  )
}

export default BaseModal;