import { Gender } from "./enum";

export interface UserDetailResponse {
  id: string;
  email: string;
  name: string;
  gender: Gender;
  birthDate: string;
  addressCode: string;
  favoriteCategoryCodes: string[];
}

export interface UpdateUserDetailRequest {
  name: string;
  gender: Gender;
  birthDate: string;
  addressCode: string;
  favoriteCategoryCodes: string[];
}
