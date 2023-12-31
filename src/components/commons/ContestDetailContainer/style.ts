import { media } from 'constants/media';
import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  ${media.tablet} {
    margin-bottom: 1000px;
  }
`;

export const BodyWrapper = styled.div`
  width: 100%;
`;

export const ContentWrapper = styled.div`
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 5vw;
  padding: 5vw;
`;
