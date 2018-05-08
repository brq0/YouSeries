import React from 'react';
import './Logon.css';

import { auth } from '../firebase/';

const SignOutButton = () =>
  <button className="logoutButton"
    type="button"
    onClick={auth.doSignOut}
  >
    Log Out
  </button>

export default SignOutButton;
