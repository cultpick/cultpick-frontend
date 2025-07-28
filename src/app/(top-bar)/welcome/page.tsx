import styles from "./page.module.css";
import Hero from "@/components/Welcome/Hero";
import HomeSection from "@/components/Welcome/HomeSection";
import SearchSection from "@/components/Welcome/SearchSection";
import PickListSection from "@/components/Welcome/PickListSection";
import Footer from "@/components/Welcome/Footer";

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <Hero />
      <HomeSection />
      <SearchSection />
      <PickListSection />
      <Footer />
      <div className={styles.background}></div>
    </div>
  );
}
