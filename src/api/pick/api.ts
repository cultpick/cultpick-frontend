import { get, post, del } from "@/api/client";
import { Pick, PickList } from "@/model/pick";

/**
 * 픽 생성
 *
 * @api [POST] /pick
 */
export const postPick = (performanceId: string) =>
  post<Pick>("/pick", { body: { performanceId } });

/**
 * 픽 목록 조회
 *
 * @api [GET] /pick
 */
export const getPickList = () => get<PickList>("/pick");

/**
 * 픽 목록 삭제
 *
 * @api [DELETE] /pick
 */
export const deletePickList = (performanceIdList: string[]) =>
  del("/pick", { body: { performanceIdList } });
