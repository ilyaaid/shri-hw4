import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import CrossButton from '@components/CrossButton/CrossButton';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <CrossButton className={styles.close} onClick={onClose} />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
