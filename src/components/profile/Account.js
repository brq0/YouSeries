import React from 'react';

import NavigationBar from '../navigation_bar/navigation_bar'

const AccountPage = ({ authUser }) =>
  <div>
    <NavigationBar />
    <div>
      <h1>Account Page</h1>
      {console.log(authUser.displayName)}
    </div>
  </div>


      export default AccountPage;
