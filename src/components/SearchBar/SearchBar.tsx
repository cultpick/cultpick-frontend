import Image from "next/image";
import Search from "./Search";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div>
          <Image
            src={"/img/typography_logo.png"}
            alt="cultpick logo"
            width={318}
            height={77}
          />
        </div>
        <Search />
      </div>
      <div className="pixel_text_20">문화를 쉽게 즐기는 방법, 컬픽</div>
    </div>
  );
}
