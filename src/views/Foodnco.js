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
          setData(data)
        })
    } catch(err){
      console.error(err)
    }
    
  },[setData])

  return (
    <Container 
      fluid 
      style={{height: '80%', margin: 'auto'}}
      /* className="d-flex align-items-center justify-content-center flex-column" */
    >
      <Row style={{paddingTop:"5%"}}>
        <Col style={{fontSize:'1.2em'}}>{`Food & CO - ${foodnco.address}`}</Col>
      </Row>
      <Row style={{padding:"2%"}}>
        <Col xs={6}>{foodnco.open.fi} / {foodnco.open.en} klo. {foodnco.open.time}</Col>
        <Col xs={6}>{foodnco.lunch.fi} / {foodnco.lunch.en} klo. {foodnco.lunch.time}</Col>
      </Row>
      <br />
      <Row 
        >
        { Object.keys(data).length ?
          <>
            <Col  style={{padding:"3%"}}>
              <FoodncoRows data={data} />
            </Col>
            <Col xs ={3}  style={{padding:"3%", height:"80%"}} className="d-flex align-items-start flex-column">
              {foodnco.diets.split(', ').map(diet => <>{diet}<br/></>)}
            </Col>
          </>
          : 
          <Spinner animation="border" role="status" variant="light" />
        }
      </Row>
      <footer style={{fontSize: '1.2em'}}>{foodnco.info}</footer>
    </Container> 
  )
}

export default Menu