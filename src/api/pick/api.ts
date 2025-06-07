import { apiRequest, createTokenApiRequest } from "@/lib/apiClient";
import { PickListResponse } from "./type";

/**
 * 픽 생성
 *
 * @api [POST] /pick
 */
export const postPick = async (performanceId: string): Promise<void> => {
  return apiRequest.post<void>("/pick", {
    performanceId,
  });
};

/**
 * 픽 목록 조회
 *
 * @api [GET] /pick
 */
export const getPickList = async (
  verificationToken: string,
): Promise<PickListResponse> => {
  const tokenApi = createTokenApiRequest(verificationToken);
  return tokenApi.get<PickListResponse>("/pick");
};

/**
 * 픽 목록 삭제
 *
 * @api [DELETE] /pick
 */
export const deletePickList = async (
  performanceIdList: string[],
  verificationToken: string,
): Promise<void> => {
  const tokenApi = createTokenApiRequest(verificationToken);
  return tokenApi.delete<void>("/pick", {
    performanceIdList,
  });
};
