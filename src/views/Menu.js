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
  const [ nextDay, setDay ] = useState(false)

  useEffect(()=>{
    try {
      fetch("/.netlify/functions/node-fetch", { headers: { accept: "Accept: application/json" } })
        .then((x) => x.json())
        .then(({ data }) => {
          if(data.courses){
          setData(data)
          console.log(data)
          } else {
            fetch("/.netlify/functions/next-day", { headers: { accept: "Accept: application/json" } })
            .then((x) => x.json())
            .then(({ data }) => {
              if(data.courses){
                setData(data)
                setDay(true)
              } else {
                data.courses={}
                setData(data)
              }
            })

          }
        })
    } catch(err){
      console.error(err)
    }
    
  },[setData])


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