import styled from 'styled-components';

export const Searchbar = styled.div`
  width: 387px;
  height: 45px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  margin: 0px 20px;
`;

export const SearchIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 6px;
`;
