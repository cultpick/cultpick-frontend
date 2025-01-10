import styles from "./Search.module.css";
import IC_SEARCH from "@/../public/svgs/search_icon.svg";

export default function Search() {
  return (
    <div className={styles.container}>
      <div className="body_18_R">행사를 검색해보세요.</div>
      <IC_SEARCH />
    </div>
  );
}
