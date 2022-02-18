import React from 'react'
import MyStacks from './components/elements/MyStacks'
import {
  LogBox
} from 'react-native'
LogBox.ignoreAllLogs()
const App = ()=>{
  return(
    <MyStacks/>
  )
}

export default App