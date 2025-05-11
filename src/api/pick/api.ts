import axios from "axios";
import { PickListResponse } from "./type";

/**
 * 픽 생성
 *
 * @api [POST] /pick
 */
export const postPick = async (performanceId: string): Promise<void> => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pick`, {
    performanceId,
  });

  return data;
};

/**
 * 픽 목록 조회
 *
 * @api [GET] /pick
 */
export const getPickList = async (): Promise<PickListResponse> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pick`);

  return data;
};

/**
 * 픽 목록 삭제
 *
 * @api [DELETE] /pick
 */
export const deletePickList = async (
  performanceIdList: string[],
): Promise<void> => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/pick`,
    {
      data: {
        performanceIdList,
      },
    },
  );

  return data;
};
