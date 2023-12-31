import styled from 'styled-components';
import { COLOR } from 'constants/Color';
import { FONT } from 'constants/Font';
import { media } from 'constants/media';

export const Title = styled.div`
  font-size: ${FONT.H2};
  font-weight: 700;
  margin-bottom: 8px;
  width: 100%;
  margin-left: 3rem;

  ${media.tablet} {
    margin-top: 3rem;
    margin-left: 0;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const ContestRanking = styled.div`
  width: 100%;
  /* padding: 2rem 4rem 3rem 3rem; */
  background-color: #fff;
  border: 0.1rem solid #dbdbdb;
  border-radius: 1.2rem;
  margin-left: 3rem;

  ${media.tablet} {
    margin-left: 0;
  }
`;

export const RankingTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  ${FONT.H2}
  margin-left: 3rem;

  & > span {
    font-size: ${FONT.BOLD_14};
    color: ${COLOR.GRAY_200};
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1rem;
  margin-top: 1.8rem;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 1.8rem;
  display: flex;
  justify-content: center;
  /* margin-left: 30px; */

  ${media.tablet} {
    margin-left: 0;
  }
`;
