import { useMutation } from "@tanstack/react-query";
import { logout, signIn, signUp } from "./api";
import { FormattedSignUpData, SignInRequest, SignUpRequest } from "./type";
import { findAddressCode } from "@/api/address/query";

/**
 * 회원가입 mutation hook
 */
export const useSignUpMutation = (
  onSuccess: () => void,
  onError: (error: any) => void,
) => {
  return useMutation({
    mutationFn: async (data: FormattedSignUpData) => {
      const addressCode = findAddressCode(
        data.addressData,
        data.formData.address,
      );
      const birthDate = `${data.formData.birthYear}-${data.formData.birthMonth.padStart(2, "0")}-${data.formData.birthDay.padStart(2, "0")}T00:00:00.000Z`;

      const requestData: SignUpRequest = {
        email: data.formData.email,
        password: data.formData.password,
        name: data.formData.name,
        gender: data.formData.gender === "남성" ? "MALE" : "FEMALE",
        birthDate: birthDate,
        ...(addressCode && { addressCode }),
        favoriteCategoryCodes: data.selectedCategoryCodes,
      };

      return signUp(requestData, data.verificationToken);
    },
    onSuccess,
    onError,
  });
};

/**
 * 로그인 mutation hook
 */
export const useSignInMutation = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
) => {
  return useMutation({
    mutationFn: (data: SignInRequest) => signIn(data),
    onSuccess,
    onError,
  });
};

/**
 * 로그아웃 mutation hook
 */
export const useLogoutMutation = (
  onSuccess: () => void,
  onError: (error: any) => void,
) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
};
