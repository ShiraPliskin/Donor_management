import { useState } from 'react'
import './App.css'
import Routing from './components/Routing.jsx'
import Donors from './components/Donors/Donors.jsx'
import Contacts from './components/Contacts/Contacts.jsx'

function App() {

  return (
    <>
      <Donors/>
      <Contacts type="contacts"/>
      {/* <Routing/> */}
    </>
  )
}

export default App
