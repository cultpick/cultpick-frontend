import Image from "next/image";
import styles from "./page.module.css";

import IdBox from "@/components/My/IdBox";
import UserBox from "@/components/My/UserBox";
import CategoryBox from "@/components/My/CategoryBox";
import Logout from "@/components/My/Logout";
import Delete from "@/components/My/Delete";

import { getUser } from "@/api/user/api";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let userData = null;

  if (accessToken) {
    try {
      // 서버에서 직접 백엔드 API 호출
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        userData = await response.json();
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.titleWrapper}>
        <Image
          src={"/img/my/my_icon.png"}
          alt="my icon"
          width={40}
          height={40}
          unoptimized={true}
        />
        <div className={styles.title}>My Page</div>
      </div>
      <div className={styles.boxWrapper}>
        <IdBox email={userData?.email} />
        <UserBox
          name={userData?.name}
          gender={userData?.gender}
          birthDate={userData?.birthDate}
          addressCode={userData?.addressCode}
        />
        <CategoryBox />
        <Logout />
        <Delete />
      </div>
      <div className={styles.bgImgWrapper}>
        <div className={styles.bgImg}>
          <Image
            src={"/img/background-object.png"}
            alt={"background 이미지"}
            width={2683.86}
            height={180}
          />
          <Image
            src={"/img/background-object.png"}
            alt={"background 이미지"}
            width={2683.86}
            height={180}
          />
        </div>
      </div>
      <div className={styles.gradient} />
    </div>
  );
}
