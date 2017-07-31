import React, { Component, PropTypes } from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

const styles = {
  chip: {
    margin: 0
  },
  smallChip: {
    fontSize: '12px',
    fontStyle: 'italic'
  },
  avatar: {
    fontWeight: 'bold',
    backgroundColor: 'black',
    fontStyle: 'normal'
  }
}

export default class BmiChip extends Component {
  static propTypes = {
    value: PropTypes.string, // to support decimal places
    label: PropTypes.string
  }

  calculateColour () {
    if (this.props.value === undefined || this.props.value === null) {
      return 'lightgray'
    } else if (this.props.value > 40) {
      return 'firebrick'
    } else if (this.props.value > 35 || this.props.value < 15) {
      return 'red'
    } else if (this.props.value > 30 || this.props.value < 16) {
      return 'orange'
    } else if (this.props.value > 25 || this.props.value < 18.5) {
      return 'gold'
    } else {
      return 'skyblue'
    }
  }

  hasLabel () {
    return (this.props.label !== undefined && this.props.label !== null)
  }

  renderLabel () {
    if (this.hasLabel()) {
      return <Avatar size={48} style={styles.avatar}>{this.props.label}</Avatar>
    }
  }

  render () {
    return <Chip
      style={this.hasLabel() ? styles.smallChip : styles.chip}
      labelColor={'white'}
      backgroundColor={this.calculateColour()} >
      {
          this.renderLabel()
      }
      BMI: {this.props.value}
    </Chip>
  }
}
