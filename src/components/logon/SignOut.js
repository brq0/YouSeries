import React from 'react';
import './Logon.css';

import { auth } from '../firebase/';

const SignOutButton = () =>
  <button class="logoutButton"
    type="button"
    onClick={auth.doSignOut}
  >
    Wyloguj
  </button>

export default SignOutButton;
