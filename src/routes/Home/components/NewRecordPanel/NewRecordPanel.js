import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Subheader from 'material-ui/Subheader'
import classes from './NewRecordPanel.scss'
import { required, validateNumber, minValue1 } from 'utils/forms'
import { Field, reduxForm, submit } from 'redux-form'
import { RECORD_FORM_NAME } from 'constants'

const dialogContent = {
  textAlign: 'center',
  margin: '50px'
}

class NewRecordPanel extends Component {
  static propTypes = {
    onNewClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  constructor(props){
    super(props);

    this.state = {
            styles: {
                    addButton: {
                        marginTop: 10,
                        marginLeft: 20
                    }                                     
            },            
            addDialogOpen: false
        }

      this.onHandleDialogClose = this.onHandleDialogClose.bind(this);
      this.onHandleDialogOpen = this.onHandleDialogOpen.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.renderWeightField = this.renderWeightField.bind(this);
  }

  onHandleDialogOpen() {
    this.setState({addDialogOpen: true})
  }

  onHandleDialogClose() {
      this.setState({addDialogOpen: false})
  }

  handleAdd = () => {
    console.log('handleAdd')
    const { newWeight } = this.refs;
    const { weight } = this.state;
    this.props.onNewClick({ weight, done: false });
    newWeight.value = '';
     this.setState({addDialogOpen: false});
  }

  submitForm(){
    submit(RECORD_FORM_NAME);
  }

  renderWeightField(){
    return <TextField
                floatingLabelText='New Weight'      
                type='number'      
                className={classes.input}
                onChange={({ target }) => this.setState({weight: Number(target.value)})}
              />;
  }


  render () {
    const { disabled } = this.props

    return (
      <span>
            <FloatingActionButton className={classes.addButton} onTouchTap={this.onHandleDialogOpen}>
                <ContentAdd />
            </FloatingActionButton>   
            
            <Dialog title="New record" 
                        modal={false} 
                        open={this.state.addDialogOpen} 
                        onRequestClose={this.onHandleDialogClose} 
                        className={classes.container}
                        contentStyle={dialogContent}
                        actions={[]}>
                
                
                  <form onSubmit={this.handleAdd} className={classes.form}>      
                    <Field
                      name='newWeight'
                      type='number'                      
                      component={this.renderWeightField}
                      label='New Weight'                      
                      validate={[required, validateNumber,minValue1]}
                      warn={minValue1}
                    />                  
                  
                  <div >
                    <FlatButton label="Cancel" secondary={true} onTouchTap={this.onHandleDialogClose} />
                    <FlatButton label="Save" primary={true} type='submit' onTouchTap={this.submitForm} />
                  </div>
                </form>
                
              </Dialog>

            
      </span>
    )
  }
}


export default reduxForm({
  form: RECORD_FORM_NAME
})(NewRecordPanel)
