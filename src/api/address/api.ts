import axios from "axios";
import { AddressResponse } from "./schema";

/**
 * 주소 목록 조회
 *
 * @api [GET] /address
 */
export const getAddressList = async (): Promise<AddressResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/address`,
  );

  return data;
};
