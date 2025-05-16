import styles from "./User.module.css";
import { getAddressList } from "@/api/address/api";

interface UserBoxProps {
  name?: string;
  gender?: string;
  birthDate?: string;
  addressCode?: string;
}

export default async function UserBox({
  name,
  gender,
  birthDate,
  addressCode,
}: UserBoxProps) {
  const addressData = await getAddressList();

  const formatBirthDate = (date: string) => {
    if (!date) return "2002 - 09 - 07";
    const [year, month, day] = date.split("T")[0].split("-");
    return `${year} - ${month} - ${day}`;
  };

  const getGenderText = (gender: string) => {
    return gender === "MALE" ? "남성" : "여성";
  };

  const getAddressInfo = () => {
    if (!addressData || !addressCode)
      return { region: "주소가 없습니다.", subRegion: "" };

    for (const region of addressData) {
      const subRegion = region.subregions.find((sr) => sr.code === addressCode);
      if (subRegion) {
        return { region: region.name, subRegion: subRegion.name };
      }
    }
    return { region: "주소가 없습니다.", subRegion: "" };
  };

  const { region, subRegion } = getAddressInfo();

  return (
    <div className={styles.box}>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>이름</div>
        <div className={styles.text}>{name || "홍길동"}</div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>성별</div>
        <div className={styles.text}>
          {gender ? getGenderText(gender) : "남성"}
        </div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>생년월일</div>
        <div className={styles.text}>
          {birthDate ? formatBirthDate(birthDate) : "2002 - 09 - 07"}
        </div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>주소</div>
        <div className={styles.addressWrapper}>
          <div className={styles.address}>{region}</div>
          <div className={styles.addressSub}>{subRegion}</div>
        </div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
    </div>
  );
}
