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
        if (error) {

        } else {

        }
})
