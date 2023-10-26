import { media } from 'constants/media';
import styled from 'styled-components';

export const Searchbar = styled.div`
  width: 37vw;
  height: 45px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.mobildL} {
    width: 386px;
  }
  ${media.mobileM} {
    width: 95%;
  }
`;

export const SearchIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 5px;
`;

export const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  margin: 0px 20px;
`;
