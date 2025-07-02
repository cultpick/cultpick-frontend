export interface User {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  avatarUrl?: string;
  userType?: string;
  userTypeUrl?: string;
  pushYN?: boolean;
  isMember?: boolean;
  gender?: "MALE" | "FEMALE";
  birthDate?: string;
  addressCode?: string;
  favoriteCategoryCodes?: string[];
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpResponse {
  id: string;
  email: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  nickname?: string;
  avatarUrl?: string;
  pushYN?: boolean;
  addressCode?: string;
  favoriteCategoryCodes?: string[];
}
