// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here

export const firebase = {
  apiKey: 'AIzaSyDt6e0X6aHNNPEZzeDV9sjPni54JUG6Ek8',
  authDomain: 'bmimaterial-6c6b9.firebaseapp.com',
  databaseURL: 'https://bmimaterial-6c6b9.firebaseio.com',
  storageBucket: 'bmimaterial-6c6b9.appspot.com'
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
