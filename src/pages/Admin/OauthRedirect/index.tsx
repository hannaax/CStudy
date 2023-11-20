import { instance } from 'api';
import { login } from 'hooks/@redux/authSlice';
import Cookies from 'js-cookie';
import Toast from 'libs/Toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userStorage } from 'repository/userStorage';

const OAuthRedirect = () => {
  const dispatch = useDispatch();

  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  console.log('1', accessToken);
  console.log('2', refreshToken);

  // const response = await instance.get('/oauth2/login');

  // console.log('===================================');
  // const basic_cookie = Cookies.get('accessToken');
  // console.log('basic_cookie', basic_cookie);
  // const cookies = document.cookie;
  // console.log('domCOOCKIE', cookies);
  // console.log('===================================');

  if (!accessToken || !refreshToken)
    return Toast.error('로그인에 실패했습니다.');

  userStorage.set({
    accessToken,
    refreshToken,
  });

  dispatch(login());

  // window.location.replace(`https://cstudying.site`);

  return <div>Login...</div>;
};

export default OAuthRedirect;
