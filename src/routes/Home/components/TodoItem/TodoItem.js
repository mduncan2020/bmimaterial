import React, { Component, PropTypes } from 'react'
import classes from './TodoItem.scss'
import { ListItem } from 'material-ui/List'
import Delete from 'material-ui/svg-icons/action/delete-forever'
import Edit from 'material-ui/svg-icons/content/create'
// import { isObject } from 'lodash'

// import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
// import { required, validateNumber, minValue1 } from 'utils/forms'
// import { Field, reduxForm, submit } from 'redux-form'
import { reduxForm } from 'redux-form'
import { RECORD_FORM_NAME } from 'constants'

const dialogContent = {
  textAlign: 'center',
  margin: '50px'
}

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      dialogOpen: false,
      weight: this.props.todo.weight,
      createdAt: this.props.todo.createdAt
    }

    this.onHandleDialogClose = this.onHandleDialogClose.bind(this)
    this.onHandleDialogOpen = this.onHandleDialogOpen.bind(this)
    this.renderWeightField = this.renderWeightField.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.renderDateField = this.renderDateField.bind(this)
  }

  onEditRecordClick () {
    this.setState({dialogOpen: true})
  }

  onHandleDialogOpen () {
    this.setState({dialogOpen: true})
  }

  onHandleDialogClose () {
    this.setState({dialogOpen: false})
  }

  handleSave = () => {
    /*
    const { newWeight } = this.refs;
    const { weight } = this.state;
    const { createdAt } = this.state;
    */
    var editted = this.props.todo
    editted.weight = this.state.weight // this.state.weight.toString();
    editted.createdAt = this.state.createdAt
    this.props.onEditClick({id: (this.props.todo._key || this.props.id), todo: editted})
    this.setState({dialogOpen: false})
  }

  renderWeightField () {
    return <TextField
      floatingLabelText='New weight'
      type='number'
      onChange={(event, newValue) => this.setState({weight: newValue})}
      value={this.state.weight}
    />
  }

  renderDateField () {
    return <DatePicker
      floatingLabelText='New date'
      hintText='Date'
      container='inline'
      mode='landscape'
      onChange={(event, date) => this.setState({createdAt: date})}
      value={new Date(this.state.createdAt)} />
  }

  handleWeightChange (event, value) {
    this.setState({weight: value})
  }

  render () {
    const { todo, id, onDeleteClick } = this.props

    return (
      <div className={classes.container}>
        <ListItem
          rightIcon={
            <span>
              <Edit onClick={() => this.onEditRecordClick(todo._key || id)} />
              <Delete onClick={() => onDeleteClick(todo._key || id)} />
            </span>
          }
          primaryText={todo.weight === undefined ? todo.text : todo.weight.toString()}
          secondaryText={
            <p>
              <span className='TodoItem-Text'>
                Created: { new Date(todo.createdAt).toDateString() }
              </span>
            </p>
          }
          secondaryTextLines={2}
        />

        <Dialog
          title='Edit Record'
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.onHandleDialogClose}
          className={classes.dialog}
          contentStyle={dialogContent}
          actions={[]}>

          {this.renderWeightField()}
          {this.renderDateField()}

          <div>
            <FlatButton label='Cancel' secondary={true} onTouchTap={this.onHandleDialogClose} />
            <FlatButton label='Save' primary={true} type='submit' onTouchTap={this.handleSave} />
          </div>

        </Dialog>
      </div>
    )
  }
}

export default reduxForm({
  form: RECORD_FORM_NAME
})(TodoItem)
