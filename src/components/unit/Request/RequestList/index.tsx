import Container from 'components/commons/Container';
import Modal from 'components/commons/Modal/Modal';
import useModal from 'hooks/useModal';
import ConfirmModal from 'components/commons/Modal/ConfirmModal';
import RequestItem from '../RequestItem';
import { isLogin } from 'repository/auth';
import Button from 'components/commons/Button/Button';
import * as S from './style';
import { ToggleRequestList } from 'types/api';
import { useNavigate } from 'react-router-dom';
import Pagination from 'components/commons/Pagination';
import useRequestFilter from 'hooks/Request/useRequestFilter';
import NoData from 'components/commons/NoData';
import LoginSwitchButton from '../LoginSwitchButton';

interface RequestListsProps {
  requestList: ToggleRequestList;
  page: number;
  handlePage: (page: number) => void;
}

const RequestList = ({ requestList, handlePage, page }: RequestListsProps) => {
  const { modalIsOpen, toggleModal } = useModal();

  const navigate = useNavigate();

  console.log(requestList);

  const openModal = () => {
    toggleModal();
  };

  // const handlePage = () => {};
  // const page = 0;

  return (
    <>
      <S.ContentWrapper>
        {requestList?.totalElements === 0 && (
          <NoData>문제 요청 글이 없습니다.</NoData>
        )}
        {requestList?.content?.map(props => (
          <RequestItem key={props.id} {...props} />
        ))}
      </S.ContentWrapper>
      {/* {(requestList?.totalPages as number) > 0 && (
        <S.PaginationWrapper>
          <Pagination
            totalPages={requestList?.totalPages as number}
            handlePage={handlePage}
            page={page}
          />{' '}
        </S.PaginationWrapper>
      )} */}
    </>
  );
};

export default RequestList;
