import client from './client';

// 회원 인증에 필요한 API를 사용하기 쉽도록 함수화하여 작성

// 회원가입
export const signup = ({ username, useremail, password }) => 
  client.post('./api/auth/signup', { username, password });

// 로그인
export const signin = ({ useremail, password }) => 
  client.post('/api/auth/signin', ( useremail, password ));

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');