import axios from "axios";
import { UpdateUserDetailRequest, UserDetailResponse } from "./type";
import { Update } from "next/dist/build/swc";

/**
 * 유저 상세 조회
 *
 * @api [GET] /user
 */
export const getUserDetail = async (): Promise<UserDetailResponse> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);

  return data;
};

/**
 * 유저 상세 수정
 *
 * @api [PUT] /user
 */
export const updateUserDetail = async (
  request: UpdateUserDetailRequest,
): Promise<UserDetailResponse> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user`,
    request,
  );

  return data;
};

/**
 * 유저 삭제
 *
 * @api [DELETE] /user
 */
export const deleteUser = async (): Promise<void> => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/user`,
  );

  return data;
};
