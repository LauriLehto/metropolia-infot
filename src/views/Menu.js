import React, {useEffect, useState} from 'react'
import { 
  Col, 
  Row,
  Spinner
} from 'react-bootstrap'
import '../styles/Menu.css'
import MealRow from '../components/MealRow'

const Menu = () => {

  const [ data, setData ] = useState({})
  const [ nextDay, setDay ] = useState(false)

  const nextDayTimeString = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    let now = tomorrow.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-')
    return time
  }

  const todayTimeString = () => {
    let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-')
    return time
  }

  const getUrl = (time) => {
      return `https://www.sodexo.fi/en/ruokalistat/output/daily_json/158/${time}`;
  }

  console.log(getUrl(todayTimeString()))

  useEffect(()=>{
    const today = todayTimeString()
    const nextDay = nextDayTimeString()
    console.log(typeof today)
    try {
      fetch(`/.netlify/functions/node-fetch/?date=${today}`, { 
        headers: { accept: "Accept: application/json" }, 
        
      }, {query: today})
        .then((x) => x.json())
        .then(({ data }) => {
          console.log('today', data)
          if(data.courses){
            setData(data)
            console.log(data)
          } else {
            fetch(`/.netlify/functions/node-fetch/?date=${nextDay}`, { headers: { accept: "Accept: application/json" } })
            .then((x) => x.json())
            .then(({ data }) => {
              console.log('next day',data)
              if(data.courses){
                setData(data)
                setDay(true)
              }
            })

          }
        })
    } catch(err){
      console.error(err)
    }
    
  },[setData])


  console.log(data)
  //if(Object.keys(data).length && Object.keys(data.courses).length) {console.log(typeof data.courses )}
  
  return (
    <>
      { nextDay && 
      <Row>
        <Col>
          <h4>Tarjolla huomenna</h4>
        </Col>
      </Row>
      }
      <Row className='MenuWrapper'>
        { Object.keys(data).length ?
          <Col>
            { Object.keys(data.courses) && Object.keys(data.courses).map(c => {
              return(
                <MealRow key={data.courses[c].title_fi} meal={data.courses[c]} />
              )
            })}
          </Col>
          : 
          <Spinner animation="border" role="status" />
        }
      </Row>
    </> 
  )
}

export default Menu