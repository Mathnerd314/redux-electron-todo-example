import React from 'react'

import TodoList from '../containers/todo-list'
import TodoAppBar from '../containers/todo-appbar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/paper'

const styles = {
  textAlign: 'center'
}

export default class Main extends React.Component {
  render () {
    return (
      <div style={styles}>
        <MuiThemeProvider>
          <Paper zDepth={2}>
            <TodoList />
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}
