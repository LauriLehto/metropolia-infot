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

  const [ data, setData ] = useState()

  let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
  console.log(now.split('klo')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-'))

  useEffect(()=>{
    try {
      fetch("/.netlify/functions/node-fetch", { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then(({ data }) => setData(data))
    } catch(err){
      console.error(err)
    }
    
  },[setData])

  console.log(data)
  
  return (
    <Container>
      {
        data ?
          <Row className='MenuWrapper'>
            <Col >
              {data && Object.keys(data.courses).map(c => {
                return(
                  <MealRow key={data.courses[c].title_fi} meal={data.courses[c]} />
                )
              })}
            </Col>
          </Row> 
          : 
          <Spinner animation="border" role="status" />
      }
    </Container>
  )
}

export default Menu