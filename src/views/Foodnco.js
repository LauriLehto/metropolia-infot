import React, {useEffect, useState} from 'react'
import { 
  Container,
  Col, 
  Row,
  Spinner
} from 'react-bootstrap'

import '../styles/Menu.css'
import FoodncoRow from '../components/FoodncoRow'

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
    try {
      fetch(`/.netlify/functions/node-fetch/?location=foodnco&date=${today}`, { 
        headers: { accept: "Accept: application/json" }, 
        
      }, {query: today})
        .then((x) => x.json())
        .then(({ data }) => {
          console.log('today', data)
          setData(data)
            //console.log(data)
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
      <Row className="d-flex align-items-center justify-content-center">
        { Object.keys(data).length ?
          <Col>
            <FoodncoRow data={data} />
          </Col>
          : 
          <Spinner animation="border" role="status" variant="light" />
        }
      </Row>
    </Container> 
  )
}

export default Menu