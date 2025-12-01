// Sign In Errors
export const FIREBASE_SIGNIN_ERROR_MAP = {
  // Common sign-in errors (kept generic for security)
  'auth/invalid-credential': "The email or password you entered is incorrect. Please try again.",
  'auth/wrong-password': "The email or password you entered is incorrect. Please try again.",
  'auth/user-not-found': "The email or password you entered is incorrect. Please try again.",
  
  // Other potential errors
  'auth/invalid-email': "Please enter a valid email address.",
  'auth/too-many-requests': "Access temporarily blocked due to too many failed attempts. Try again later.",
  'auth/network-request-failed': "A network error occurred. Please check your internet connection.",
  
  'default': "An unexpected error occurred. Please try again."
};

// Sign Up Errors
export const FIREBASE_SIGNUP_ERROR_MAP = {
  // Email/Password Sign Up Errors
  'auth/email-already-in-use': "This email is already registered. Try signing in or use a different email.",
  'auth/invalid-email': "The email address is not formatted correctly.",
  'auth/weak-password': "The password is too weak. Please use at least 6 characters.",
  'auth/operation-not-allowed': "Email/Password sign-up is disabled.",
  
  // Google Sign-up Errors
  'auth/popup-closed-by-user': "The sign-in popup window was closed. Please try again.",
  'auth/cancelled-popup-request': "The sign-in attempt was interrupted. Please try again.",
  
  'default': "An unexpected error occurred during sign-up. Please try again."
};