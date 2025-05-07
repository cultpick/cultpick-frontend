export interface PerformanceResponse {
  /**
   * 공연 ID
   */
  id: number;

  /**
   * 공연명
   */
  name: string;

  /**
   * 공연 시작일
   */
  startDate: Date;

  /**
   * 공연 종료일
   */
  endDate: Date;

  /**
   * 공연 지역
   */
  area: string;

  /**
   * 티켓 가격
   */
  price: string;

  /**
   * 공연 포스터 경로
   */
  posterImageUrl: string;
}

export interface PerformanceListResponse {
  /**
   * 공연 목록 수
   */
  count: number;

  /**
   * 공연 목록
   */
  performanceList: PerformanceResponse[];
}
