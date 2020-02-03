import React from "react";
import "../modal.css";

interface ModalProps {
  onClose: Function;
  showModal: boolean;
  children: React.ReactNode;
  header: string;
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  showModal,
  header,
  children
}: ModalProps): JSX.Element | null => {
  if (!showModal) {
    return null;
  }
  return (
    <div className="modal" id="modal">
      <h2>{header}</h2>
      <div className="content">{children}</div>
      <div className="actions">
        <button className="toggle-button" onClick={(): void => onClose()}>
          close
        </button>
      </div>
    </div>
  );
};
