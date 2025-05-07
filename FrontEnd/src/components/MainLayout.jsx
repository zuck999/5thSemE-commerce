import React from 'react'
import { Outlet } from 'react-router-dom'


function Mainlayout() {
  return (
    <div>
      <div><Outlet/></div>

    </div>
  )
}

export default Mainlayout
