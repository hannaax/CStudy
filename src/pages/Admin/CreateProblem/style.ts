import { styled } from 'styled-components';

export const CPWrapper = styled.div`
  width: calc(100% - 250px);
  margin: 0 auto;
`;

export const innerCP = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CpDiv = styled.div`
  width: 100%;
  padding: 3rem 6rem;
  border-radius: 1.2rem;
  background-color: rgb(219, 236, 244);
`;
export const CpTitle = styled.h2`
  padding-bottom: 5rem;
`;

export const CpForm = styled.form`
  display: flex;
`;

export const CpInputSelect = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-right: 10rem;
  label {
    padding: 1.5rem;
  }
  input {
    padding: 1rem 5rem 1rem 1rem;
  }
  select {
    padding: 1rem 1rem;
    margin-bottom: 2rem;
  }
`;

export const CpInput = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  label {
    padding: 1.5rem;
  }
  input {
    padding: 1rem 5rem 1rem 1rem;
  }
`;

export const Ex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
