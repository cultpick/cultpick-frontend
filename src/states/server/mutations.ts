import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { signIn, signUp, logout, checkAuth, getToken } from "@/api/auth/api";
import { updateUser, deleteUser } from "@/api/user/api";
import { postPick, deletePickList } from "@/api/pick/api";
import { sendEmailVerification, verifyEmail, updatePassword } from "@/api/auth/api";
import { SignInRequest, SignUpRequest } from "@/model/auth";
import { UpdateUserRequest } from "@/model/user";

export const mutationKeys = {
  signIn: ["signIn"],
  signUp: ["signUp"],
  logout: ["logout"],
  checkAuth: ["checkAuth"],
  getToken: ["getToken"],
  updateUser: ["updateUser"],
  deleteUser: ["deleteUser"],
  postPick: ["postPick"],
  deletePickList: ["deletePickList"],
  sendEmailVerification: ["sendEmailVerification"],
  verifyEmail: ["verifyEmail"],
  updatePassword: ["updatePassword"],
};

// 인증 관련 뮤테이션
export const useSignIn = (
  options?: UseMutationOptions<any, Error, SignInRequest>,
) => {
  return useMutation<any, Error, SignInRequest>({
    mutationKey: mutationKeys.signIn,
    mutationFn: (data: SignInRequest) => signIn(data),
    ...options,
  });
};

export const useSignUp = (
  options?: UseMutationOptions<
    any,
    Error,
    { data: SignUpRequest; verificationToken: string }
  >,
) => {
  return useMutation<
    any,
    Error,
    { data: SignUpRequest; verificationToken: string }
  >({
    mutationKey: mutationKeys.signUp,
    mutationFn: ({ data, verificationToken }) =>
      signUp(data, verificationToken),
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<any, Error>) => {
  return useMutation<any, Error>({
    mutationKey: mutationKeys.logout,
    mutationFn: () => logout(),
    ...options,
  });
};

export const useCheckAuth = (options?: UseMutationOptions<any, Error>) => {
  return useMutation<any, Error>({
    mutationKey: mutationKeys.checkAuth,
    mutationFn: () => checkAuth(),
    ...options,
  });
};

export const useGetToken = (options?: UseMutationOptions<any, Error>) => {
  return useMutation<any, Error>({
    mutationKey: mutationKeys.getToken,
    mutationFn: () => getToken(),
    ...options,
  });
};

// 사용자 관련 뮤테이션
export const useUpdateUser = (
  options?: UseMutationOptions<any, Error, UpdateUserRequest>,
) => {
  return useMutation<any, Error, UpdateUserRequest>({
    mutationKey: mutationKeys.updateUser,
    mutationFn: (data: UpdateUserRequest) => updateUser(data),
    ...options,
  });
};

export const useDeleteUser = (options?: UseMutationOptions<any, Error>) => {
  return useMutation<any, Error>({
    mutationKey: mutationKeys.deleteUser,
    mutationFn: () => deleteUser(),
    ...options,
  });
};

// 픽 관련 뮤테이션
export const usePostPick = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  return useMutation<any, Error, string>({
    mutationKey: mutationKeys.postPick,
    mutationFn: (performanceId: string) => postPick(performanceId),
    ...options,
  });
};

export const useDeletePickList = (
  options?: UseMutationOptions<any, Error, string[]>,
) => {
  return useMutation<any, Error, string[]>({
    mutationKey: mutationKeys.deletePickList,
    mutationFn: (performanceIdList: string[]) =>
      deletePickList(performanceIdList),
    ...options,
  });
};

// 이메일 인증 관련 뮤테이션
export const useSendEmailVerification = (
  options?: UseMutationOptions<any, Error, { email: string }>,
) => {
  return useMutation<any, Error, { email: string }>({
    mutationKey: mutationKeys.sendEmailVerification,
    mutationFn: (data: { email: string }) => sendEmailVerification(data),
    ...options,
  });
};

export const useVerifyEmail = (
  options?: UseMutationOptions<any, Error, { email: string; code: string }>,
) => {
  return useMutation<any, Error, { email: string; code: string }>({
    mutationKey: mutationKeys.verifyEmail,
    mutationFn: (data: { email: string; code: string }) => verifyEmail(data),
    ...options,
  });
};

export const useUpdatePassword = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  return useMutation<any, Error, string>({
    mutationKey: mutationKeys.updatePassword,
    mutationFn: (password: string) => updatePassword(password),
    ...options,
  });
};
