"use client";

import Image from "next/image";
import styles from "./page.module.css";

import IC_GO from "@/../public/svgs/detail/pick_white.svg";
import IC_SHARE from "@/../public/svgs/detail/share.svg";
import IC_STAR from "@/../public/svgs/detail/star.svg";
import IC_ARROW from "@/../public/svgs/bottom_arrow.svg";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPerformanceDetail } from "@/api/performance/api";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import { usePostPick } from "@/states/server/mutations";
import { Performance } from "@/model/performance";

export default function EventDetailPage() {
  const params = useParams();
  const [performanceData, setPerformanceData] = useState<Performance | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [showAllIntroImages, setShowAllIntroImages] = useState(false);
  const [showTicketList, setShowTicketList] = useState(false);
  const { show, message, type, showToast } = useToast();
  const addPickMutation = usePostPick();

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await getPerformanceDetail(params.id as string);
        setPerformanceData(response);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${["일", "월", "화", "수", "목", "금", "토"][date.getDay()]})`;
  };

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        showToast("해당 페이지 URL이 복사되었습니다.", "success");
      })
      .catch((err) => {
        console.error("URL 복사 실패:", err);
        showToast("URL 복사에 실패했습니다.", "error");
      });
  };

  const handleAddPick = async () => {
    try {
      await addPickMutation.mutateAsync(params.id as string);
      showToast("픽 목록에 추가되었습니다.", "success");
    } catch (error) {
      console.error("픽 추가 실패:", error);
      showToast("픽 추가에 실패했습니다.", "error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!performanceData) {
    return <div>Error loading performance data</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <Toast show={show} message={message} type={type} />
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

          <div className={styles.ticketButtonWrapper}>
            <button
              className={styles.applyBtn}
              onClick={() => setShowTicketList(!showTicketList)}
            >
              신청하러 가기 <IC_GO />
            </button>

            {showTicketList &&
              performanceData.ticketList &&
              performanceData.ticketList.length > 0 && (
                <div className={styles.ticketList}>
                  {performanceData.ticketList.map((ticket, index) => (
                    <button
                      key={index}
                      className={styles.ticketItem}
                      onClick={() => {
                        window.open(ticket.url, "_blank");
                        setShowTicketList(false);
                      }}
                    >
                      <IC_GO />
                      {ticket.name}
                    </button>
                  ))}
                </div>
              )}
          </div>
          <div className={styles.subBtnWrapper}>
            <button
              onClick={handleCopyUrl}
              className={`${styles.bottomBtn} ${styles.share}`}
            >
              URL 공유 <IC_SHARE />
            </button>
            <button
              className={`${styles.bottomBtn} ${styles.pick}`}
              onClick={handleAddPick}
              disabled={addPickMutation.isPending}
            >
              {addPickMutation.isPending ? "처리 중..." : "Pick"} <IC_STAR />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
