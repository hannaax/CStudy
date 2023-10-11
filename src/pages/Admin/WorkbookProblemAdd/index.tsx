import { useState, useMemo } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { ProblemContent } from 'types/api';

import ContentContainer from 'components/commons/ContentContainer';
import ContentHeaderWrapper from 'components/commons/ContentHeaderWrapper';
import ContentBodyWrapper from 'components/commons/ContentBodyWrapper';
import FormBody from 'components/commons/Admin/FormBody';
import Table from 'components/commons/Table';
import { useGetProblem } from 'hooks/@query/problem/useGetProblem';
import { useAddWorkbookQuestion } from 'hooks/@query/workbook/useAddWorkbookQuestion';
import AdminWorkbookTableLists from 'components/commons/Admin/AdminWorkbookTableLists';
import { getProblemList } from 'api/problem';
import { useGetProblemList } from 'hooks/@query/problem/useGetProblemList';
import { useMixWorkbookWorkbookQuestion } from 'hooks/@query/workbook/useMixWorkbookWorkbookQuestion';

const WorkbookProblemAdd = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const problemList = useGetProblemList({
    questionTitle: '',
    categoryTitle: '',
  });

  const page = 0;
  const { workbookQuestion } = useMixWorkbookWorkbookQuestion({
    questionId,
    page,
  } as {
    questionId: string;
    page: number;
  });
  const filterQuestion = problemList?.content?.filter(
    ({ questionId: problemQuestionId }: { questionId: number }) => {
      return !workbookQuestion?.content?.some(
        ({ questionId: workbookQuestionId }: { questionId: number }) =>
          problemQuestionId === workbookQuestionId,
      );
    },
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      questionIds: [],
    },
  });

  const handleIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const AddWorkbookQuestion = useAddWorkbookQuestion({ handleIsLoading });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const isArray = Array.isArray(data.questionIds);
    const customQuestionIds = isArray
      ? data.questionIds?.map((questionId: (string | number)[]) => ({
          id: +questionId,
        }))
      : (data.questionIds = [{ id: +data.questionIds }]);

    const formData = {
      workbookId: parseInt(questionId as string),
      questionIds: customQuestionIds,
    };

    AddWorkbookQuestion(formData);
    reset();
  };

  const tableColRate = useMemo(() => ['15%', '65%', '20%'], []);
  const tableTitle = useMemo(() => ['선택', '문제목록', '카테고리'], []);

  return (
    <ContentContainer>
      <ContentHeaderWrapper />
      <ContentBodyWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBody>
            <Table white colRate={tableColRate} title={tableTitle}>
              <AdminWorkbookTableLists
                filterQuestion={filterQuestion as any}
                register={register}
                errors={errors}
              />
            </Table>
            <button
              type="submit"
              className="mt navy xl style"
              disabled={isLoading}
            >
              문제등록하기
            </button>
            <button
              type="button"
              className="gray style ml xl"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              돌아가기
            </button>
          </FormBody>
        </form>
      </ContentBodyWrapper>
    </ContentContainer>
  );
};

export default WorkbookProblemAdd;
