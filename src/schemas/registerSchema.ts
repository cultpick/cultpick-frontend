import { z } from "zod";
import dayjs from "dayjs";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),

    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 가능합니다.")
      .regex(
        /^(?=.*[A-Za-z\d!@#$%^&*])(?!^[A-Za-z]+$)(?!^\d+$)(?!^[!@#$%^&*]+$)[A-Za-z\d!@#$%^&*]{8,20}$/,
        "비밀번호를 영문, 숫자, 특수문자 중 2가지 이상 조합으로 입력해주세요.",
      ),

    confirmPassword: z.string(),

    name: z
      .string()
      .min(1, "이름을 입력해주세요.")
      .max(50, "이름이 너무 깁니다."),

    gender: z.enum(["남성", "여성"], {
      required_error: "성별을 선택해주세요.",
    }),

    birthYear: z
      .string()
      .length(4, "연도는 4자리여야 합니다.")
      .refine((val) => {
        const year = parseInt(val);
        return year >= 1900 && year <= new Date().getFullYear();
      }, "올바른 연도를 입력해주세요."),

    birthMonth: z.string().refine((val) => {
      const month = parseInt(val);
      return month >= 1 && month <= 12;
    }, "올바른 월을 입력해주세요."),

    birthDay: z.string().refine((val) => {
      const day = parseInt(val);
      return day >= 1 && day <= 31;
    }, "올바른 일을 입력해주세요."),

    address: z.string().nullish(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => {
      const { birthYear, birthMonth, birthDay } = data;
      if (!birthYear || !birthMonth || !birthDay) return false;

      const date = dayjs(
        `${birthYear}-${birthMonth}-${birthDay}`,
        "YYYY-MM-DD",
      );
      if (!date.isValid()) return false;

      const lastDayOfMonth = new Date(
        parseInt(birthYear),
        parseInt(birthMonth),
        0,
      ).getDate();
      if (parseInt(birthDay) > lastDayOfMonth) return false;

      return date.isBefore(dayjs());
    },
    {
      message: "올바른 생년월일을 입력해주세요.",
      path: ["birthDay"],
    },
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
