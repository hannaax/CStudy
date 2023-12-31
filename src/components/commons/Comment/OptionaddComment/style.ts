import styled from 'styled-components';
import { COLOR } from 'constants/Color';
import { FONT } from 'constants/Font';
import { TextAreaStyleProps } from 'types/style';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
`;

export const CommentTextArea = styled.textarea`
  &:focus {
    border: 0.1rem solid #000;
  }
  width: 100% !important;
  padding: 1rem;
  border: 0.1rem solid #d3d3d3;
  border-radius: 0.8rem;
`;

export const ErrorMessage = styled.div`
  color: ${COLOR.RED};
  margin-top: 1rem;
`;

export const Button = styled.button`
  width: 33.6rem;
  height: 4.8rem;
  border-radius: 0.8rem;
  background: #ededed;
  color: white;
  margin-top: 1rem;
`;

export const Suggestion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextSuggestionLabel = styled.span`
  font-size: ${FONT.REGULAR_14};
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;
