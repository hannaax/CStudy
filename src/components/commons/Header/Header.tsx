import { Link } from 'react-router-dom';
import * as S from './style';
import { StyleNavLink } from 'components/NavLinkStyles';
import Logo_Png from 'assets/Logo.png';
import React, { useEffect } from 'react';
import { useSignOut } from 'hooks/@query/useSignOut';
import useModal from 'hooks/useModal';
import Modal from '../Modal/Modal';
import SignInModal from 'components/unit/SignIn';
import SignModal from '../Modal/SignModal';
import SignUp from 'components/unit/SignUp';
import { useState } from 'react';
import { isAdmin, isLogin } from 'repository/auth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RootState } from 'stroe';
import { useDispatch, useSelector } from 'react-redux';
import { signupToggle } from 'hooks/@redux/registerModalSlice';
import { Logintoggle } from 'hooks/@redux/loginModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { MdNotifications, MdLogout } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import AlarmModal from '../Modal/AlarmModal';
import Modal2 from '../Modal/Modal2';
import AlarmList from 'components/unit/Alarm/AlarmList';
import logo2 from 'assets/logo2.png';
import { useNavigate } from 'react-router-dom';

export interface PrevToogle {
  $active: boolean;
}

const Header = () => {
  const [active, setActive] = useState(false);
  const [alarmModalIsOpen, setAlarmModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setAlarmModalIsOpen(!alarmModalIsOpen);
  };

  const handleAlarmClick = () => {
    setAlarmModalIsOpen(!alarmModalIsOpen);
  };

  const isRegisterModalOpen = useSelector(
    (state: RootState) => state.registerModal.isOpen,
  );
  const isLoginModalOpen = useSelector(
    (state: RootState) => state.loginModal.isOpen,
  );

  const dispatch = useDispatch();
  const { mutate: signOut } = useSignOut();

  const RegistertoggleModal = () => {
    dispatch(signupToggle());
  };

  const LogintoggleModal = () => {
    dispatch(Logintoggle());
  };

  const HandleClickToogle = () => {
    setActive(active => !active);
  };

  const HandleClickToogleCheckLogin = () => {
    setActive(active => !active);
    if (!isLogin()) {
      dispatch(Logintoggle());
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.LogoWrap>
          <Link to="/">
            <picture>
              {/* <S.LogoImg src={Logo_Png} alt="CStudy logo" /> */}
              <S.LogoImg src={logo2} alt="CStudy logo" />
            </picture>
          </Link>
        </S.LogoWrap>
        <S.Nav $active={active}>
          <S.NavList>
            <S.NavItem>
              <S.NavLinkStyle onClick={HandleClickToogle} to="/notice">
                공지사항
              </S.NavLinkStyle>
            </S.NavItem>
            <S.NavItem>
              <S.NavLinkStyle onClick={HandleClickToogle} to="/request">
                문제요청
              </S.NavLinkStyle>
            </S.NavItem>
            <S.NavItem>
              <S.NavLinkStyle
                onClick={async () => {
                  await HandleClickToogleCheckLogin();
                  if (!isLogin()) {
                    navigate('/');
                  }
                }}
                to="/problem"
              >
                문제풀이
              </S.NavLinkStyle>
            </S.NavItem>
            <S.NavItem>
              <S.NavLinkStyle onClick={HandleClickToogle} to="/contest">
                대회
              </S.NavLinkStyle>
            </S.NavItem>
            <S.NavItem>
              <S.NavLinkStyle onClick={HandleClickToogle} to="/workbook">
                문제집
              </S.NavLinkStyle>
            </S.NavItem>
            <S.NavItem>
              <S.NavLinkStyle onClick={HandleClickToogle} to="/membersranks">
                전체랭킹
              </S.NavLinkStyle>
            </S.NavItem>
          </S.NavList>
        </S.Nav>

        {alarmModalIsOpen && (
          <Modal2 toggleModal={toggleModal}>
            <AlarmModal
              title="대회에 참가하시겠습니까?"
              confirmText="참가하기"
              cancelText="돌아가기"
              isOpen={toggleModal}
              handleConfirm={toggleModal}
              handleCancel={toggleModal}
            >
              <AlarmList />
            </AlarmModal>
          </Modal2>
        )}
        <S.HamburgerBt onClick={HandleClickToogle}>
          {active ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </S.HamburgerBt>
        {isAdmin() && (
          <S.Admin $active={active}>
            <StyleNavLink to="/admin/CreateProblem">관리자</StyleNavLink>
          </S.Admin>
        )}
        {isLogin() && (
          <S.AlarmButton $active={active} onClick={handleAlarmClick}>
            <MdNotifications size="27px" />
          </S.AlarmButton>
        )}

        <S.Sign $active={active}>
          {isLoginModalOpen && (
            <Modal toggleModal={LogintoggleModal}>
              <SignModal toggleModal={LogintoggleModal}>
                <SignInModal />
              </SignModal>
            </Modal>
          )}
          {isRegisterModalOpen && (
            <Modal toggleModal={RegistertoggleModal}>
              <SignModal toggleModal={RegistertoggleModal}>
                <SignUp />
              </SignModal>
            </Modal>
          )}
          {isLogin() ? (
            <>
              <S.MypageLink to="/mypage">
                <BsFillPersonFill size="27px" />
              </S.MypageLink>
              <S.LogoutLink onClick={() => signOut()}>
                <MdLogout size="27px" />
              </S.LogoutLink>
            </>
          ) : (
            <>
              <S.SigninButton onClick={LogintoggleModal}>로그인</S.SigninButton>
              <S.SignupButton onClick={RegistertoggleModal}>
                회원가입
              </S.SignupButton>
            </>
          )}
        </S.Sign>
      </S.Wrapper>
    </>
  );
};

export default Header;
