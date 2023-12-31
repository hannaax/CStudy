import Button from 'components/commons/Button/Button';
import ConfirmModal from 'components/commons/Modal/ConfirmModal';
import ContestInfo from 'components/unit/ContestDetail/ContestInfo';
import ContestRank from 'components/unit/ContestDetail/ContestRank';
import Modal from 'components/commons/Modal/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import useJoinContestModal from 'hooks/@redux/Contest/useJoinContestModal';
import { Contest, IContestRank, ProblemContent } from 'types/api';
import { useMixContestDetailAll } from 'hooks/@query/@GETmixed/useMixContestDetailAll';
import AdminContestQuestionOptionGroup from 'components/unit/ContestQuestion/AdminContestQuestionOptionGroup';
import { FieldValues, useForm } from 'react-hook-form';
import { isAdmin } from 'repository/auth';
import Table from 'components/commons/Table';
import AdminContestTablelists from 'components/unit/ContestQuestion/AdminContestTablelists';
import { useGetProblemList } from 'hooks/@query/problem/useGetProblemList';
import * as S from './style';
import ContestDetailContainer from 'components/commons/ContestDetailContainer';
import ContentContainer from 'components/commons/ContentContainer';
import useGetContestResult from 'hooks/@query/contest/useGetContestResult';

const ContestDetail = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const handleNavigateMyResult = () => {
    navigate(`/contest/${contestId}/result`);
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      competitionId: contestId,
      questionIds: [],
    },
  });

  const [page, setPage] = useState(0);
  const { contestQuestion, contest, contestRank } = useMixContestDetailAll({
    contestId,
    page,
  } as {
    contestId: string;
    page: number;
  });
  const problemList = useGetProblemList({
    questionTitle: '',
    categoryTitle: '',
  });

  const contestResult = useGetContestResult(contestId as string);

  const filterQuestion = problemList?.content?.filter(
    ({ questionId: problemQuestionId }: { questionId: number }) => {
      return contestQuestion?.some(
        ({ questionId: contestQuestionId }: { questionId: number }) =>
          problemQuestionId === contestQuestionId,
      );
    },
  );

  const totalQuestion = contestQuestion?.length;

  const handleIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  const [isLoading, setIsLoading] = useState(false);

  const { modalIsOpen, handleConfirm, toggleModal } = useJoinContestModal({
    contestId: contestId ? contestId : '',
    handleIsLoading,
  });

  const colRate = useMemo(() => ['20%', '60%', '20%'], []);
  const title = useMemo(() => ['문제번호', '문제이름', '문제삭제'], []);

  return (
    <ContentContainer>
      <ContestDetailContainer>
        <S.ContestDetailHeader>
          <div>
            <h2>
              {/* {contest?.title} */}
              자바대회
            </h2>
          </div>
          <S.ButtonWrapper>
            <Button
              variant="green"
              size="large"
              onClick={handleNavigateMyResult}
            >
              <span style={{ fontSize: '14px' }}>나의 대회 결과</span>
            </Button>
            {contestResult ? (
              ''
            ) : (
              <Button variant="primary" size="medium" onClick={toggleModal}>
                대회 참여
              </Button>
            )}
            <AdminContestQuestionOptionGroup
              handleSubmit={handleSubmit}
              reset={reset}
              contestId={contestId as string}
              getValues={getValues}
            />
          </S.ButtonWrapper>
          {modalIsOpen && (
            <Modal toggleModal={toggleModal}>
              <ConfirmModal
                title="대회에 참가하시겠습니까?"
                confirmText="참가하기"
                cancelText="돌아가기"
                isOpen={modalIsOpen}
                handleConfirm={handleConfirm}
                handleCancel={toggleModal}
                isLoading={isLoading}
              />
            </Modal>
          )}
        </S.ContestDetailHeader>

        <S.ContestDetailContent>
          <ContestInfo contest={contest as Contest} />
          <ContestRank
            contestRank={contestRank as IContestRank}
            totalQuestion={totalQuestion as number}
            handlePage={handlePage}
            page={page}
          />
        </S.ContestDetailContent>

        <S.Div />

        {isAdmin() && filterQuestion?.length !== 0 && (
          <Table colRate={colRate} title={title}>
            <AdminContestTablelists
              filterQuestion={filterQuestion as ProblemContent[]}
              register={register}
              errors={errors}
            />
          </Table>
        )}
      </ContestDetailContainer>
    </ContentContainer>
  );
};

export default ContestDetail;
