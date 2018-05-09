import React from 'react';

import { auth } from '../firebase/';

const SignOutButton = () =>
  <button className="logoutButton"
    type="button"
    onClick={auth.doSignOut}
  >
    Log Out
  </button>

export default SignOutButton;
