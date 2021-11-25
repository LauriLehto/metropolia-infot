import React, {useEffect, useState} from 'react'
import { 
  Container,
  Col, 
  Row,
  Spinner
} from 'react-bootstrap'

import '../styles/Menu.css'
import SodexoRow from '../components/SodexoRow'
import sodexo from '../data/sodexo'

const Menu = () => {

  const [ data, setData ] = useState({})
  const [ fetched, setFetched ] = useState(false)

  const todayTimeString = () => {
    let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-')
    return time
  }

  const checkDataReceived = () => {
    fetched ? <div>Ei tietoja saatavilla</div> : <Spinner animation="border" role="status" variant="light" />
  }

  useEffect(()=>{
    const today = todayTimeString()
    try {
      fetch(`/.netlify/functions/node-fetch/?location=sodexo&date=${today}`, { 
        headers: { accept: "Accept: application/json" }, 
        
      }, {query: today})
        .then((x) => x.json())
        .then(({ data }) => {
          //console.log('today', data)
          if(data.courses){
            setData(data)
            //console.log(data)
          } else {
            setFetched(true)
          }
        })
    } catch(err){
      console.error(err)
    }
    
  },[setData])


  return (
    <Container fluid>
      <Row className="d-flex align-items-center justify-content-center">
        { Object.keys(data).length ?
          <Col>
            { Object.keys(data.courses) && Object.keys(data.courses).map(c => {
              return sodexo.categories.includes(data.courses[c].category) && <SodexoRow key={data.courses[c].title_fi} meal={data.courses[c]} />
              
            })}
          </Col>
          : 
          checkDataReceived()
        }
      </Row>
    </Container> 
  )
}

export default Menu