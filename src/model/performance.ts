export interface Performance {
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

export interface PerformanceList {
  count: number;
  performanceList: Performance[];
  totalCount?: number;
  hasNext?: boolean;
}
