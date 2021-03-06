import React, {useEffect, useState} from 'react'
import { 
  Container,
  Col, 
  Row,
  Spinner
} from 'react-bootstrap'

import '../styles/Menu.css'
import MealRow from '../components/MealRow'

const Menu = () => {

  const [ data, setData ] = useState({})
  const [ thisday, setDate ] = useState(false)

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

  useEffect(()=>{
    const today = todayTimeString()
    const nextDay = nextDayTimeString()
    try {
      fetch(`/.netlify/functions/node-fetch/?date=${today}`, { 
        headers: { accept: "Accept: application/json" }, 
        
      }, {query: today})
        .then((x) => x.json())
        .then(({ data }) => {
          //console.log('today', data)
          if(data.courses){
            setData(data)
            //console.log(data)
          } else {
            fetch(`/.netlify/functions/node-fetch/?date=${nextDay}`, { headers: { accept: "Accept: application/json" } })
            .then((x) => x.json())
            .then(({ data }) => {
              console.log('next day',data)
              if(data.courses){
                setData(data)
                setDate(true)
              }
            })
          }
        })
    } catch(err){
      console.error(err)
    }
    
  },[setData])


  return (
    <Container fluid>
      <Row>
        <Col>
        { thisday && <h4>Tarjolla huomenna</h4>}
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" >
        { Object.keys(data).length ?
          <Col>
            { Object.keys(data.courses) && Object.keys(data.courses).map(c => {
              return(
                <MealRow key={data.courses[c].title_fi} meal={data.courses[c]} />
              )
            })}
          </Col>
          : 
          <Spinner animation="border" role="status" variant="secondary" />
        }
      </Row>
    </Container> 
  )
}

export default Menu