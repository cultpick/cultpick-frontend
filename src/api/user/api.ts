import { get, put, del } from "@/api/client";
import { User, UpdateUserRequest } from "@/model/user";

/**
 * 유저 상세 조회
 *
 * @api [GET] /user
 */
export const getUser = () => get<User>("/user");

/**
 * 유저 상세 수정
 *
 * @api [PUT] /user
 */
export const updateUser = (data: UpdateUserRequest) =>
  put<User>("/user", { body: data });

/**
 * 유저 삭제
 *
 * @api [DELETE] /user
 */
export const deleteUser = () => del("/user");
