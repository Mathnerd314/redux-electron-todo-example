import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTodo, deleteTodo, completeTodo } from '../actions/index'
import uuid from 'uuid'

// List
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

import Checkbox from 'material-ui/Checkbox'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'

// Input field
import TextField from 'material-ui/TextField'

const remote = window.require('electron').remote
const ipc = window.require('electron').ipcRenderer

const styles = {
  height: 500,
  overflowY: 'auto'
}

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed
}

class TodoList extends React.Component {
  constructor (props) {
    super(props)

    this.state = { filter: TODO_FILTERS.SHOW_ALL }

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    localStorage.setItem('todos', JSON.stringify(nextProps.todoItems))
  }

  handleSubmit (e) {
    if (e.which === 13) {
      // Dispatch props
      this.props.addTodo({ todoItem: e.target.value, id: uuid.v4(), completed: false })
      // Reset input.
      e.target.value = ''
    }
  }

  handleDelete (id) {
    this.props.deleteTodo(id)
  }

  handleComplete (id) {
    this.props.completeTodo(id)
  }

  handleCompleteStyle (bool) {
    if (bool) {
      return { color: 'green', textDecoration: 'line-through' }
    }
  }

  renderList () {
    if (this.props.todoItems != null) {
      let shownTodoList = this.props.todoItems.filter(this.state.filter)
      return shownTodoList.map((item) => {
        return (
          <div key={item.id}>
            <ListItem
              className='list-group-item'
              style={this.handleCompleteStyle(item.completed)}
              primaryText={item.todoItem}
              leftCheckbox={
                <Checkbox
                  checked={item.completed}
                  onCheck={() => this.handleComplete(item.id)}
                      />
                  }
              rightIconButton={
                <IconButton
                  onTouchTap={() => this.handleDelete(item.id)} >
                  <NavigationClose />
                </IconButton>
                  }
                />
            <Divider />
          </div>
        )
      })
    }
  }

  render () {
    return (
      <div>
        <AppBar
          title='Material Todo App'
          style={{WebkitAppRegion: 'drag'}}
          iconElementLeft={
            <IconButton onTouchTap={() => { ipc.send('close-main-window') }}>
              <NavigationClose />
            </IconButton>
      }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
          }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
              <MenuItem primaryText='________________' />
              <MenuItem primaryText='Export to PDF' onTouchTap={() => { ipc.send('export-to-pdf') }} />
              <MenuItem primaryText='Minimize' onTouchTap={() => { ipc.send('minimize') }} />
              <MenuItem primaryText='Minimize to System Tray' onTouchTap={() => { ipc.send('minimize-to-tray') }} />
            </IconMenu>
      }
      />
        <div className="mui-appbar">
          <IconButton onTouchTap={() => { ipc.send('close-main-window') }}>
            <NavigationClose />
          </IconButton>
          <Tabs>
            <Tab
              icon={<FontIcon className='material-icons'>assignment</FontIcon>}
              label='All'
              onActive={() => {
                this.setState({filter: TODO_FILTERS.SHOW_ALL})
              }
              }
            />
            <Tab
              icon={<FontIcon className='material-icons'>alarm</FontIcon>}
              label='Active'
              onActive={() => {
                this.setState({filter: TODO_FILTERS.SHOW_ACTIVE})
              }
            }
            />
            <Tab
              icon={<FontIcon className='material-icons'>delete</FontIcon>}
              label='Completed'
              onActive={() => {
                this.setState({filter: TODO_FILTERS.SHOW_COMPLETED})
              }
            }
            />
          </Tabs>
                    <IconMenu
                      iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                      }
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText='Export to PDF' onTouchTap={() => { ipc.send('export-to-pdf') }} />
                      <MenuItem primaryText='Minimize to System Tray' onTouchTap={() => { ipc.send('minimize-to-tray') }} />
                    </IconMenu>
        </div>
        <TextField
          hintText='What needs to be done?'
          onKeyDown={this.handleSubmit.bind(this)}
        />
        <Divider />
        <List style={styles}>
          {
            this.renderList()
          }
        </List>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    todoItems: state.todoItems
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addTodo,
    deleteTodo,
    completeTodo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
