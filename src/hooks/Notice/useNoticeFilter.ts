import { ROUTE } from 'constants/Route';
import {
  reset,
  setNoticeFilterSearchTitle,
  setNoticeFilterSearchContent,
  setNoticeFilterSearchReset,
  setPageNumber,
  setQuery,
} from 'hooks/@redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useCallback, useState } from 'react';

const useNoticeFilter = () => {
  // const [selectedSearchOption, setSelectedSearchOption] = useState('title');
  const dispatch = useDispatch();
  const noticeFilter = useSelector(
    (state: any) => state.rootReducer.Noticefilter,
  );

  // Define your isActive variable as you have done
  const isActive = noticeFilter.query === ROUTE.NOTICE_MY_LIST ? 'active' : '';

  const handlePage = (page: number) => {
    dispatch(setPageNumber(page));
  };

  const handleToggle = () => {
    // dispatch(reset());

    dispatch(setQuery(ROUTE.NOTICE_LIST));
  };

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    formData => {
      const { searchOption, title, content } = formData; // Destructure searchOption from formData
      console.log(searchOption);

      if (searchOption === 'title') {
        dispatch(setNoticeFilterSearchTitle(title));
        dispatch(setNoticeFilterSearchContent('')); // Reset content search
      } else if (searchOption === 'content') {
        console.log(content);
        dispatch(setNoticeFilterSearchContent(content));
        dispatch(setNoticeFilterSearchTitle(''));
      }
    },
    [noticeFilter],
  );

  return {
    noticeFilter,
    handlePage,
    handleToggle,
    isActive,
    onSubmit,
  };
};

export default useNoticeFilter;
