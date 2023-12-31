import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  CheckDuplicatedEmail,
  CheckDuplicatedName,
  sendAuthNumberToEmail,
} from 'api/auth';
import { signUp as signUpApi } from 'api/auth';
import { SignUpForm } from 'types/Form';
import Toast from 'libs/Toast';
import { signupToggle } from 'hooks/@redux/registerModalSlice';
import { useDispatch } from 'react-redux';

export const useSignUp = () => {
  const [noDuplicatedName, setNoDuplicatedName] = useState(false);
  const [noDuplicatedEmail, SetNoDuplicatedEmail] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const authNumber = useRef(0);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();

  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const onCheckDuplicatedName = async () => {
    try {
      const data = await CheckDuplicatedName(watchedName);
      const nameRegex = /^[a-zA-Z0-9가-힣]{2,8}$/;

      if (watchedName === '') Toast.error('이름을 입력해주세요.');
      else if (!nameRegex.test(watchedName))
        Toast.error('2~8글자의 한글,영어를 입력해주세요.');
      else {
        if (data.verify === 'true') {
          Toast.success('사용할 수 있는 닉네임입니다.');
          setNoDuplicatedName(true);
        } else if (data.verify === 'false') {
          Toast.error('이미 존재하는 닉네임입니다.');
        } else {
          throw new Error('잘못된 응답 데이터입니다.');
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error('오류가 발생했습니다.');
    }
  };

  const onCheckDuplicatedEmail = async () => {
    const data = await CheckDuplicatedEmail(watchedEmail);
    const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

    try {
      if (watchedEmail === '') Toast.error('이메일을 입력해주세요.');
      else if (!emailRegex.test(watchedEmail))
        Toast.error('올바른 이메일 형식을 입력해주세요.');
      else {
        if (data.verify === 'true') {
          Toast.success('사용할 수 있는 이메일입니다.');
          SetNoDuplicatedEmail(true);
          if (noDuplicatedName === false)
            Toast.error('닉네임 중복 확인해주세요.');
        } else if (data.verify === 'false') {
          Toast.error('이미 존재하는 이메일입니다.');
        } else {
          throw new Error('잘못된 응답 데이터입니다.');
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error('오류가 발생했습니다.');
    }
  };

  const onSendAuthNumberToEmail = async () => {
    setAuthenticating(true);
    const data = await sendAuthNumberToEmail(watchedEmail);
    try {
      if (watchedEmail === '') Toast.error('인증번호를 입력해주세요.');
      Toast.success('인증번호가 전송됐습니다.');
    } catch (error) {
      console.error(error);
      throw new Error('오류가 발생했습니다.');
    }
    authNumber.current = data;
  };

  const onCheckAuthNumber = async () => {
    const watchedEmailAuthNumber = watch('emailAuthNumber');

    if (String(authNumber.current) === watchedEmailAuthNumber)
      Toast.success('인증번호가 일치합니다.');
    else Toast.error('인증번호가 일치하지 않습니다.');
  };

  const signUpMutation = useMutation(signUpApi, {
    onSuccess: () => {
      Toast.success('회원가입 성공');
      dispatch(signupToggle());
      // signupToggle();
    },
    onError: () => {
      Toast.error('회원가입 실패');
    },
  });

  const submitForm = (formValues: SignUpForm) => {
    const { emailAuthNumber, passwordConfirm, ...rest } = formValues;
    signUpMutation.mutate({ ...rest });
  };

  return {
    noDuplicatedName,
    noDuplicatedEmail,
    authenticating,
    register,
    handleSubmit,
    setValue,
    errors,
    watchedPassword,
    submitForm,
    onCheckDuplicatedName,
    onCheckDuplicatedEmail,
    onSendAuthNumberToEmail,
    onCheckAuthNumber,
  };
};
