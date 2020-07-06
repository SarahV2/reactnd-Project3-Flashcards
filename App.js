
import React from 'react';
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Main from './Components/Main'
import { setLocalNotification } from './utils/notificationManager'




export default class App extends React.Component {
  
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Main />
      </Provider>
    );
  }
}
