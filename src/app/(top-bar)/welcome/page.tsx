import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Hero from "@/components/Welcome/Hero";
import HomeSection from "@/components/Welcome/HomeSection";
import SearchSection from "@/components/Welcome/SearchSection";
import PickListSection from "@/components/Welcome/PickListSection";
import Footer from "@/components/Welcome/Footer";
import WelcomePageClient from "@/components/Welcome/WelcomePageClient";

export default async function WelcomePage() {
  // 서버에서 쿠키 체크
  const cookieStore = cookies();
  const welcomeHiddenUntil = cookieStore.get("welcomeHiddenUntil");

  if (welcomeHiddenUntil) {
    const hiddenDate = new Date(welcomeHiddenUntil.value);
    const currentDate = new Date();

    if (currentDate < hiddenDate) {
      // 서버에서 바로 리다이렉트
      redirect("/");
    }
  }

  return (
    <WelcomePageClient>
      <div className={styles.container}>
        <Hero />
        <HomeSection />
        <SearchSection />
        <PickListSection />
        <Footer />
        <div className={styles.background}></div>
      </div>
    </WelcomePageClient>
  );
}
