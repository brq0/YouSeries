import { auth, provider } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

  // Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

  // Sign out
export const doSignOut = () =>
  auth.signOut();

export const doSignInWithPopup = () =>
  auth.signInWithPopup(provider).then((user, error) => {
    if (error) alert("Can't login by FaceBook");
  })

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) => {
  auth.currentUser.updatePassword(password);
  auth.signOut();
}
