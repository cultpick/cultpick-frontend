"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./TopNav.module.css";
import IC_SYMBOL from "@/../public/svgs/symbol.svg";
import { handleNavigation } from "@/utils/navigationUtils";
import { isLoggedIn as checkLoginStatus } from "@/utils/auth_client";

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    setIsLoggedIn(checkLoginStatus());

    if (pathname.startsWith("/picklist")) {
      setActiveButton("picklist");
    } else if (pathname.startsWith("/login")) {
      setActiveButton("login");
    } else if (pathname.startsWith("/my")) {
      setActiveButton("mypage");
    } else {
      setActiveButton("");
    }
  }, [pathname]);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      router.push("/my");
    } else {
      router.push("/login");
    }
  };

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
            activeButton === "mypage" ? "nav_active" : ""
          } ${activeButton === "login" ? "nav_active" : ""}`}
          onClick={handleAuthClick}
        >
          {isLoggedIn ? "My page" : "Login"}
        </div>
      </div>
    </nav>
  );
}
