import styled from 'styled-components';
import { COLOR } from 'constants/Color';

interface PaginationOptionProps {
  white?: boolean;
}

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LeftArrowButton = styled.button<PaginationOptionProps>`
  position: relative;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 100%;
  border: 0.1rem solid ${COLOR.WHITE};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 0.7rem;
    height: 0.7rem;
    border-top: 0.2rem solid ${COLOR.BLACK};
    border-left: 0.2rem solid ${COLOR.BLACK};
  }

  &[disabled]::before {
    border-top: 0.2rem solid ${COLOR.GRAY_100};
    border-left: 0.2rem solid ${COLOR.GRAY_100};
  }
`;

export const PaginationButtonWrapper = styled.div<PaginationOptionProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 16rem;
  height: 3.6rem;
  margin: 0 1.5rem;
  border-radius: 1rem;
  border: 0.1rem solid ${COLOR.WHITE};
  z-index: 0;
`;

export const PaginationButton = styled.button`
  position: relative;

  &.active {
    color: ${COLOR.WHITE};
  }

  &.active::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem 0.8rem;
    background-color: ${COLOR.MAIN};
    border-radius: 0.8rem;
    z-index: -1;
  }
`;

export const RightArrowButton = styled.button<PaginationOptionProps>`
  position: relative;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 100%;
  border: 0.1rem solid ${COLOR.WHITE};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 0.7rem;
    height: 0.7rem;
    border-top: 0.2rem solid ${COLOR.BLACK};
    border-right: 0.2rem solid ${COLOR.BLACK};
  }

  &[disabled]::before {
    /* display: none; */
    border-top: 0.2rem solid ${COLOR.GRAY_100};
    border-right: 0.2rem solid ${COLOR.GRAY_100};
  }
`;
