import { instance } from 'api';
import { SignUpForm } from 'types/Form';

// 회원가입
export const signUp = async (formData: SignUpForm) => {
  const response = await instance.post('/api/member/signup', formData);
  return response.data;
};

// 로그아웃
// export const signOut = async () => {
//   const user = userStorage.get();
//   const response = await instance.delete('/api/member/logout', {
//     data: {
//       refreshToken: user?.refreshToken,
//     },
//   });
//   return response;
// };

// 재발급
// export const retryToken = async (refreshToken: string) => {
//   const response = await instance.post<LoginResponse>('/api/member/refreshToken', {
//     refreshToken,
//   });
//   return response.data;
// };

// 닉네임 중복 체크
export const CheckDuplicatedName = async (name: string) => {
  const response = await instance.get(`/api/name?name=${name}`);
  return response.data;
};

// 이메일 중복 체크
export const CheckDuplicatedEmail = async (email: string) => {
  const response = await instance.get(`/api/email?email=${email}`);
  return response.data;
};

// 이메일 인증
export const AuthByEmail = async (email: string) => {
  const response = await instance.get(`/api/member/email/send?to=${email}`);
  return response.data;
};