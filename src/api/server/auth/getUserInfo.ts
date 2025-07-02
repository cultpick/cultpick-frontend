import { get, getSsr } from "@/api/client";
import { queryKeys } from "@/states/server/queryKeys";
import { User } from "@/model/user";

/**
 * 유저 정보 조회 API (백엔드 API 직접 호출)
 * @returns {User}
 */
export const getUserInfo = async (): Promise<User | null> => {
  try {
    const response = await get<User>("/user", { ssr: false });
    return response;
  } catch (error) {
    console.error("유저 정보 조회 실패:", error);
    return null;
  }
};

/**
 * SSR용 유저 정보 조회 API (백엔드 API 직접 호출)
 * @returns {User}
 */
export const getSsrUserInfo = async (): Promise<User | null> => {
  try {
    const response = await getSsr<User>("/user");
    return response;
  } catch (error) {
    console.error("SSR 유저 정보 조회 실패:", error);
    return null;
  }
};
