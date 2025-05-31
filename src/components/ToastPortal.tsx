"use client";

import reactDom from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function ToastPortal({ children }: Props) {
  if (typeof window === "undefined") return null;

  const node = document.getElementById("toast-portal") as Element;
  if (!node) return null;
  return reactDom.createPortal(children, node);
}
