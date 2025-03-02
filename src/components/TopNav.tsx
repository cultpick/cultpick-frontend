"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./TopNav.module.css";
import IC_SYMBOL from "@/../public/svgs/symbol.svg";
import { handleNavigation } from "@/utils/navigationUtils";

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<string>("");

  useEffect(() => {
    if (pathname === "/") {
      setActiveButton("home");
    } else if (pathname.startsWith("/picklist")) {
      setActiveButton("picklist");
    } else if (pathname.startsWith("/login")) {
      setActiveButton("login");
    } else {
      setActiveButton("");
    }
  }, [pathname]);

  return (
    <nav className={`${styles.nav} nav_pixel_text_22`}>
      <div className={styles.left}>
        <div
          className={styles.btn}
          onClick={() => handleNavigation(router, setActiveButton, "home", "/")}
        >
          <IC_SYMBOL />
        </div>
      </div>
      <div className={styles.right}>
        <div
          className={`${styles.btn} nav_pixel_text_22 ${
            activeButton === "picklist" ? "nav_active" : ""
          }`}
          onClick={() =>
            handleNavigation(router, setActiveButton, "picklist", "/picklist")
          }
        >
          Pick List
        </div>
        <div
          className={`${styles.btn} nav_pixel_text_22 ${
            activeButton === "login" ? "nav_active" : ""
          }`}
          onClick={() =>
            handleNavigation(router, setActiveButton, "login", "/login")
          }
        >
          Login
        </div>
      </div>
    </nav>
  );
}
