import React from 'react';

import { auth } from '../firebase/';

const SignOutButton = () =>
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    Wyloguj
  </button>

export default SignOutButton;
