import { get, getSsr } from "@/api/client";
import { queryKeys } from "@/states/server/queryKeys";
import { PickList } from "@/model/pick";

/**
 * Pick 목록 조회 API
 * @returns {PickList}
 */
export const getPickList = async (): Promise<PickList> => {
  try {
    const response = await get<PickList>("/pick", { ssr: false });
    return response;
  } catch (error) {
    console.error("Pick 목록 조회 실패:", error);
    return { performanceList: [] };
  }
};

/**
 * SSR용 Pick 목록 조회 API
 * @returns {PickList}
 */
export const getSsrPickList = async (): Promise<PickList> => {
  try {
    const response = await getSsr<PickList>("/pick");
    return response;
  } catch (error) {
    console.error("SSR Pick 목록 조회 실패:", error);
    return { performanceList: [] };
  }
};
