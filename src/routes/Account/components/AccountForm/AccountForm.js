import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
// import BinaryToggle from 'components/BinaryToggle'
import { ACCOUNT_FORM_NAME, HOME_PATH } from 'constants'
import ProviderDataForm from '../ProviderDataForm'
import classes from './AccountForm.scss'

export const AccountForm = ({ account, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <Field
      name='displayName'
      component={TextField}
      label='Display Name'
    />
    <Field
      name='email'
      component={TextField}
      label='Email'
    />
    <Field
      name='height'
      component={TextField}
      label='Height'
    />
    {
      !!account && !!account.providerData &&
        <div>
          <h4>Linked Accounts</h4>
          <ProviderDataForm providerData={account.providerData} />
        </div>
    }
    <div>
      <Link to={HOME_PATH}>
        <RaisedButton
          secondary
          label='Cancel'
          className={classes.submit}
        />
      </Link>
      <RaisedButton
        primary
        label='Save'
        type='submit'
        className={classes.submit}
      />
    </div>
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: ACCOUNT_FORM_NAME
})(AccountForm)
