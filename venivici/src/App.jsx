import { useState } from 'react'
import DataDisplay from './Components/DataDisplay'
import './App.css'

function App() {
  return (
    <>
      <div className="card" style={{backgroundColor: 'rgb(49, 124, 245)', borderRadius: 15 + 'px'}}>
        <div className="card-body">
          <h1>Veni Vidi Vici !</h1>
          <h2>This Page displays the Cat Data based on the User banned attributes fecthing them from the Cat Data API</h2>
        </div>
      </div>      
      <DataDisplay/>
    </>
  )
}

export default App
