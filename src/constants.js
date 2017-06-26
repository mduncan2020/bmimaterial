export const ACCOUNT_PATH = '/account'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'
export const HOME_PATH = '/home'

export const ACCOUNT_FORM_NAME = 'account'
export const LOGIN_FORM_NAME = 'login'
export const SIGNUP_FORM_NAME = 'signup'
export const RECORD_FORM_NAME = 'record detail'

export const formNames = {
  account: ACCOUNT_FORM_NAME,
  signup: SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME, 
  record: RECORD_FORM_NAME, 
}

export const paths = {
  account: ACCOUNT_PATH,  
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  home: HOME_PATH
}

export default { ...paths, ...formNames }
