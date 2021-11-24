import React, {useEffect, useState} from 'react'
import { 
  Container,
  Col, 
  Row,
  Spinner,
} from 'react-bootstrap'

import '../styles/Menu.css'
import FoodncoRows from '../components/FoodncoRows'
import foodnco from '../data/foodnco'

const Menu = () => {

  const [ data, setData ] = useState({})

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
          //console.log('today', data)
          setData(data)
        })
    } catch(err){
      console.error(err)
    }
    
  },[setData])

  return (
    <Container 
      fluid 
      style={{height: '100%'}}
    >
      <Row style={{padding:'3%'}}>
        <Col xs={5} style={{fontSize:'1.2em'}}>Food'n'Co, {foodnco.address}</Col>
        <Col xs={2}>{foodnco.open.fi}<br/>{foodnco.open.en}</Col>
        <Col xs={2} className="d-flex align-items-center">{foodnco.open.time}</Col>
        <Col xs={1}>{foodnco.lunch.fi}<br/>{foodnco.lunch.en}</Col>
        <Col xs={2} className="d-flex align-items-center">{foodnco.lunch.time}</Col>
      </Row>
      <br />
      <Row className="d-flex align-items-center justify-content-center">
        { Object.keys(data).length ?
          <Col>
            <FoodncoRows data={data} />
          </Col>
          : 
          <Spinner animation="border" role="status" variant="light" />
        }
      </Row>
      <footer style={{fontSize: '1.2em'}}>{foodnco.info}</footer>
    </Container> 
  )
}

export default Menu