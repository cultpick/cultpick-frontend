import { get } from "@/api/client";
import { Address } from "@/model/address";

/**
 * 주소 목록 조회
 *
 * @api [GET] /address
 */
export const getAddressList = () => get<Address[]>("/address");
