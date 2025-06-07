import { apiRequest } from "@/lib/apiClient";
import { AddressResponse } from "./type";

/**
 * 주소 목록 조회
 *
 * @api [GET] /address
 */
export const getAddressList = async (): Promise<AddressResponse[]> => {
  return apiRequest.get<AddressResponse[]>("/address");
};
