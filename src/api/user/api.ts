import { apiRequest, createTokenApiRequest } from "@/lib/apiClient";
import { UpdateUserDetailRequest, UserDetailResponse } from "./type";

/**
 * 유저 상세 조회
 *
 * @api [GET] /user
 */
export const getUserDetail = async (
  accessToken: string,
): Promise<UserDetailResponse> => {
  const tokenApi = createTokenApiRequest(accessToken);
  return tokenApi.get<UserDetailResponse>("/user");
};

/**
 * 유저 상세 수정
 *
 * @api [PUT] /user
 */
export const updateUserDetail = async (
  request: UpdateUserDetailRequest,
): Promise<UserDetailResponse> => {
  return apiRequest.put<UserDetailResponse>("/user", request);
};

/**
 * 유저 삭제
 *
 * @api [DELETE] /user
 */
export const deleteUser = async (): Promise<void> => {
  return apiRequest.delete<void>("/user");
};
