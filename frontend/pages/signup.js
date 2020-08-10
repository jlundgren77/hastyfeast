import React from 'react';
import SignUp from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';
import styled from 'styled-components';
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
`;
const SignupPage = props => {
  return (
    <Columns>
      <SignUp />
      <Signin />
      <RequestReset />
    </Columns>
  );
};

export default SignupPage;
