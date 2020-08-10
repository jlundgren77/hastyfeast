import React from 'react';
import PleaseSignIn from '../components/PleaseSignin';
import Permissions from '../components/Permissions';

const permissionsPage = props => {
  return (
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  );
};

export default permissionsPage;
