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
    <Container fluid>
      {
        data ?
          <Row className='MenuWrapper'>
            <Col >
              {data && Object.keys(data.courses).map(c => {
                return(
                  <MealRow meal={data.courses[c]} key={c} />
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