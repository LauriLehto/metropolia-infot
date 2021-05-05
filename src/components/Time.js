import React, {useState, useEffect } from 'react'


export const Time = () => {

  const [time, setTime] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = [
    'Sunnuntai',
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
    'Lauantai'
  ]
  return (
    <h4>{time&&`${days[time.getDay()]}  ${time.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })}`}</h4>
  )
}
