import styles from "./Toast.module.css";
import ToastPortal from "./ToastPortal";
import Check_IC from "@/../public/svgs/check circle.svg";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export default function Toast({ show, message, type }: ToastProps) {
  return show ? (
    <ToastPortal>
      <div className={`${styles.toast} ${styles[type]}`}>
        {message}
        {type === "success" && <Check_IC />}
      </div>
    </ToastPortal>
  ) : null;
}
