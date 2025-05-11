export interface SearchPerformanceListResponse extends PerformanceListResponse {
  /**
   * 전체 공연 수
   */
  totalCount: number;
}

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
  startDate: string;

  /**
   * 공연 종료일
   */
  endDate: string;

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

export interface PerformanceDetailResponse {
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
