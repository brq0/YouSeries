import React from 'react';

import NavigationBar from '../navigation_bar/navigation_bar';
import PasswordChangeForm from './PasswordChange';
import SignInPage from '../logon/SignIn';

const AccountPage = ({ authUser }) =>


    <div>
      {
        authUser ? <div>
          <NavigationBar />
          <h1>Account: {authUser.email}</h1>
          <PasswordChangeForm />
        </div>
        : <SignInPage />
      }


    </div>



export default AccountPage;
