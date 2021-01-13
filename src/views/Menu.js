import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { 
  Container, 
  Col, 
  Row,
  Card,
} from 'react-bootstrap'

const Menu = () => {

  const [ data, setData ] = useState()

  useEffect(()=>{
    try{
      const result = axios({
        url: 'https://cors-anywhere.herokuapp.com/https://foodandco.fi/modules/json/json/Index?costNumber=3208&language=fi',
        method: 'get',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }).then((result) => {
        setData(result.data)
      }); 
      if(result.data){
        console.log(result.data)
      }
    }catch(err){
      console.error(err)
    } 
    
  },[setData])

  let day;
  if(data&&Object.keys(data).length){
    day = data.MenusForDays[0]
    console.log(data, day)
  }
  const dateString = day ? new Date(day.Date).toLocaleDateString() :''
  /* const json = JSON.parse('https://foodandco.fi/modules/json/json/Index?costNumber=3208&language=fi')
  console.log(json) */
  return (
    <Container fluid>
      {day ?
      <Row>
        <Col>
          <Card style={{ width: "100%" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Karaportti Ruokalista {dateString} <span>{day?`Lounas tarjolla ${day.LunchTime}`:'Tietoja ei saatavilla'}</span></Card.Title>
                <Col>
                  <Row>
                    <Col>
                      {day.SetMenus.map(menu => {
                        return(
                          <Card>
                            <Card.Body>
                              {menu.Components.map(c => (
                                <Card.Text key={c}>{c}</Card.Text>
                              ))}
                            </Card.Body>
                          </Card>
                        )
                      })}
                    </Col>
                    <Col sm="4">
                      {data.Footer}
                    </Col>
                  </Row>
                 {/*  {JSON.stringify(day)} */}
                </Col>
            {/* {JSON.stringify(data.MenusForDays)} */}
          </Card.Body>
        </Card>
        </Col>
      </Row> : <h1>Ruokalista ei ole saatavilla</h1>
      }
    </Container>
  )
}

export default Menu