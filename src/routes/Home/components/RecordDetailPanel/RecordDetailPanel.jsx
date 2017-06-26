import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import classes from './RecordDetailPanel.scss'
import { required, validateNumber, minValue1 } from 'utils/forms'
import { Field, reduxForm, submit } from 'redux-form'
import { RECORD_FORM_NAME } from 'constants'

class RecordDetailPanel extends Component {
  static propTypes = {
    showDialog: PropTypes.bool,
    onSaveClick: PropTypes.func
  }

  constructor(props){
    super(props);

    this.state = {
            dialogOpen: this.props.showDialog
        }

      this.onHandleDialogClose = this.onHandleDialogClose.bind(this);
      this.onHandleDialogOpen = this.onHandleDialogOpen.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.renderWeightField = this.renderWeightField.bind(this);

      console.log('record')
  }

  onHandleDialogOpen() {
    this.setState({dialogOpen: true})
  }

  onHandleDialogClose() {
      this.setState({dialogOpen: false})
  }

  handleSave = () => {    
    const { newWeight } = this.refs;
    const { weight } = this.state;
    this.props.onSaveClick({ weight, done: false });
    newWeight.value = '';
     this.setState({dialogOpen: false});
  }

  submitForm(){
    submit(RECORD_FORM_NAME);
  }

  renderWeightField(){
    return <TextField
                floatingLabelText='New weight'      
                type='number'      
                className={classes.input}
                onChange={({ target }) => this.setState({weight: Number(target.value)})}
              />;
  }

  render () {
    return (
            <Dialog title="Record" 
                    modal={false} 
                    open={this.state.dialogOpen} 
                    onRequestClose={this.onHandleDialogClose} 
                    className={classes.container}
                    actions={[]}>            
            
                <form onSubmit={this.handleSave} className={classes.form}>      
                    <Field
                        name='newWeight'
                        type='number'                      
                        component={this.renderWeightField}
                        label='Weight'                      
                        validate={[required, validateNumber,minValue1]}
                        warn={minValue1}
                    />                  
                    
                    <div >
                        <FlatButton label="Cancel" secondary={true} onTouchTap={this.onHandleDialogClose} />
                        <FlatButton label="Save" primary={true} type='submit' onTouchTap={this.submitForm} />
                    </div>
                </form>
            
            </Dialog>
    )
  }
}


export default reduxForm({
  form: RECORD_FORM_NAME
})(RecordDetailPanel)

