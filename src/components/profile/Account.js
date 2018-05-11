import React from 'react';

import PasswordChangeForm from './PasswordChange';
import SignInPage from '../logon/SignIn';

const AccountPage = ({ authUser }) =>


    <div>
      {
        authUser ? <div>

          <h1 className="text-center text-light">Account: {authUser.email}</h1>
          <PasswordChangeForm />
        </div>
        : <SignInPage />
      }


    </div>



export default AccountPage;
