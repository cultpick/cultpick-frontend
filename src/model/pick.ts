import { Performance } from "./performance";

export interface Pick {
  id: string;
  performanceId: string;
  performance: Performance;
}

export interface PickList {
  performanceList: Performance[];
}
