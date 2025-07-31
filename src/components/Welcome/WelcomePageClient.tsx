"use client";

import { ReactNode } from "react";
import styles from "@/app/(top-bar)/welcome/page.module.css";

interface WelcomePageClientProps {
  children: ReactNode;
}

export default function WelcomePageClient({
  children,
}: WelcomePageClientProps) {
  return <div className={styles.welcomeWrapper}>{children}</div>;
}
