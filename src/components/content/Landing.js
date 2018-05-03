import React from 'react';

import { auth } from '../firebase/';

import MainContent from './container';
import SignInPage from '../logon/SignIn';


const Landing = ({ authUser }) =>
  <div>
    { authUser
      ? <MainContent />
      : <SignInPage />
    }
  </div>

  export default Landing;
