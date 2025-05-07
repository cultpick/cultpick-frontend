"use client";

import Image from "next/image";
import styles from "./page.module.css";

import IC_GO from "@/../public/svgs/detail/pick_white.svg";
import IC_SHARE from "@/../public/svgs/detail/share.svg";
import IC_STAR from "@/../public/svgs/detail/star.svg";
import IC_ARROW from "@/../public/svgs/bottom_arrow.svg";

import axios from "axios";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PerformanceData {
  id: string;
  name: string;
  genre: string;
  state: string;
  area: string;
  ticketList: {
    name: string;
    url: string;
  }[];
  startDate: string;
  endDate: string;
  price: string;
  address: string;
  host: string;
  posterImageUrl: string;
  introImageUrlList: string[] | string[][];
}

export default function EventDetailPage() {
  const params = useParams();
  const [performanceData, setPerformanceData] =
    useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllIntroImages, setShowAllIntroImages] = useState(false);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/performance/${params.id}`,
        );
        setPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!performanceData) {
    return <div>Error loading performance data</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${["일", "월", "화", "수", "목", "금", "토"][date.getDay()]})`;
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.topSection}>
        <div className={styles.leftSection}>
          <div className={styles.imgWrapper}>
            <Image
              src={performanceData.posterImageUrl}
              alt={`${performanceData.name} 포스터`}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0+g8AAWkBM2y7Yk0AAAAASUVORK5CYII="
              unoptimized={true}
            />
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>공연 소개</div>
            <div className={styles.sectionDivider} />
            <div className={styles.sectionContent}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>일시</span>
                <span className={styles.infoValue}>
                  {formatDate(performanceData.startDate)} -{" "}
                  {formatDate(performanceData.endDate)}
                </span>
                <div className={styles.badge}>{performanceData.state}</div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>비용</span>
                <span className={styles.infoValue}>
                  {performanceData.price}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>장소</span>
                <span className={styles.infoValue}>
                  {performanceData.address}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>개최자</span>
                <span className={styles.infoValue}>{performanceData.host}</span>
              </div>
            </div>
          </div>
          {performanceData.introImageUrlList.length > 0 && (
            <div className={styles.info}>
              <div className={styles.infoLabel}>공연 소개 이미지</div>
              <div
                className={`${styles.introImageWrapper} ${
                  showAllIntroImages ? styles.expanded : ""
                }`}
                style={
                  showAllIntroImages
                    ? { height: "auto" }
                    : { height: "600px", maxHeight: "600px" }
                }
              >
                <Image
                  src={
                    Array.isArray(performanceData.introImageUrlList[0])
                      ? (performanceData.introImageUrlList[0] as string[])[0]
                      : (performanceData.introImageUrlList[0] as string)
                  }
                  alt="공연 소개 이미지"
                  width={893}
                  height={1157}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0+g8AAWkBM2y7Yk0AAAAASUVORK5CYII="
                  className={styles.introImg}
                  style={
                    showAllIntroImages
                      ? { height: "auto", maxHeight: "none" }
                      : { height: "600px", maxHeight: "600px" }
                  }
                />
                <div
                  className={
                    showAllIntroImages
                      ? styles.hideOverlay
                      : styles.introImageOverlay
                  }
                >
                  <div className={styles.btnWrapper}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => setShowAllIntroImages((prev) => !prev)}
                    >
                      {showAllIntroImages ? (
                        <>
                          공연 소개 접기 <IC_ARROW transform="rotate(180)" />
                        </>
                      ) : (
                        <>
                          공연 소개 더보기 <IC_ARROW />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoCard}>
          <div className={styles.title}>{performanceData.name}</div>
          <div className={styles.sub}>
            <div className={styles.genre}>{performanceData.genre}</div> |
            <div className={styles.status}>{performanceData.state}</div>|
            <div className={styles.area}>{performanceData.area}</div>
          </div>

          <button className={styles.applyBtn}>
            신청하러 가기 <IC_GO />
          </button>
          <div className={styles.subBtnWrapper}>
            <button className={`${styles.bottomBtn} ${styles.share}`}>
              URL 공유 <IC_SHARE />
            </button>
            <button className={`${styles.bottomBtn} ${styles.pick}`}>
              Pick <IC_STAR />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
