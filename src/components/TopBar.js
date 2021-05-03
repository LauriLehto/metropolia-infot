import React, { useState, useEffect } from 'react'

import { Navbar } from 'react-bootstrap'
import { Time } from './Time'

const TopBar = () => {

  const [time, setTime] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Navbar bg="white justify-content-between">
      <Navbar.Brand>
        <img
          src="metropolia.svg"
          width="150"
          height="50"
          className="d-inline-block align-top"
          alt="Metropolia"
        />
      </Navbar.Brand>
      <Time time={time} />
    </Navbar>
  )
}

export default TopBar