import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import Theme from 'theme'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS // needed for full list and once
  // orderedToJS // needed for ordered list
  // populatedDataToJS // needed for populated list
} from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import RecordItem from '../components/RecordItem'
import NewRecordPanel from '../components/NewRecordPanel'
import classes from './HomeContainer.scss'

// const populates = [{ child: 'owner', root: 'users', keyProp: 'uid' }]
@UserIsAuthenticated
@firebaseConnect([
  // 'todos' // sync full list of todos
  // { path: 'todos', type: 'once' } // for loading once instead of binding
  { path: 'records', queryParams: ['orderByKey', 'limitToLast=10'] } // 10 most recent
  // { path: 'todos', populates } // populate
])
@connect(
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile'),
    records: dataToJS(firebase, 'records')
    // todos: populatedDataToJS(firebase, '/todos', populates), // if populating
    // todos: orderedToJS(firebase, '/todos') // if using ordering such as orderByChild
  })
)
export default class Home extends Component {
  static propTypes = {
    records: PropTypes.oneOfType([
      PropTypes.object, // object if using dataToJS
      PropTypes.array // array if using orderedToJS
    ]),
    firebase: PropTypes.shape({
      set: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      database: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
      ])
    }),
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    account: PropTypes.object
  }

  state = {
    error: null
  }

  editRecord = (editContainer) => {
//    const { todos, auth, firebase } = this.props
    const { auth } = this.props
    if (!auth || !auth.uid) {
      return this.setState({ error: 'You must be Logged in to Edit' })
    }
    // return this.setState({ error: 'Delete example requires using populate' })
    // only works if populated
    if (editContainer.record.owner !== auth.uid) {
      return this.setState({ error: 'You must own the record to Edit' })
    }
    return this.props.firebase.set(`/records/${editContainer.id}`, editContainer.record)
      .catch((err) => {
        console.error('Error editting record: ', err) // eslint-disable-line no-console
        this.setState({ error: 'Error Editting record' })
        return Promise.reject(err)
      })
  }

  deleteRecord = (id) => {
    const { records, auth, firebase } = this.props
    if (!auth || !auth.uid) {
      return this.setState({ error: 'You must be logged in to delete' })
    }
    // return this.setState({ error: 'Delete example requires using populate' })
    // only works if populated
    if (records[id].owner !== auth.uid) {
      return this.setState({ error: 'You must own the record to delete' })
    }
    return firebase.remove(`/records/${id}`)
      .catch((err) => {
        console.error('Error removing record: ', err) // eslint-disable-line no-console
        this.setState({ error: 'Error Removing Record' })
        return Promise.reject(err)
      })
  }

  handleAdd = (newRecord) => {
    // Attach user if logged in
    if (this.props.auth) {
      newRecord.owner = this.props.auth.uid
    } else {
      newRecord.owner = 'Anonymous'
    }
    // attach a timestamp
    newRecord.createdAt = this.props.firebase.database.ServerValue.TIMESTAMP
    // using this.props.firebase.pushWithMeta here instead would automatically attach createdBy and createdAt
    return this.props.firebase.push('/records', newRecord)
  }

  getHeight () {
    if (this.props.auth && this.props.account){
      return Number(this.props.account.height);
    }
  }

  render () {
    const { records } = this.props
    const { error } = this.state

    return (
      <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
        {
          error
            ? <Snackbar
              open={!!error}
              message={error}
              autoHideDuration={4000}
              onRequestClose={() => this.setState({ error: null })}
              />
            : null
        }
        <div className={classes.addRecord}>
          <NewRecordPanel
            height={this.getHeight()}
            onNewClick={this.handleAdd}
            disabled={false}
          />
        </div>
        <div className={classes.records}>
          {
            !isLoaded(records)
              ? <CircularProgress />
              : <Paper className={classes.paper}>
                <Subheader>History</Subheader>
                <List className={classes.list}>
                  {
                    records &&
                      map(records, (record, id) => (
                        <RecordItem
                          key={id}
                          id={id}
                          record={record}
                          height={this.getHeight()}
                          onEditClick={this.editRecord}
                          onDeleteClick={this.deleteRecord}
                        />
                      )
                    )
                  }
                </List>
              </Paper>
          }
        </div>
      </div>
    )
  }
}
