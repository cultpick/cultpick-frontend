import styles from "./Modal.module.css";
import Modal_IC from "@/../public/svgs/modal_icon.svg";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function Modal({
  show,
  onClose,
  onConfirm,
  title,
  description,
}: ModalProps) {
  if (!show) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <Modal_IC />
          {title}
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={onClose}>
            취소
          </button>
          <button className={styles.button} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
