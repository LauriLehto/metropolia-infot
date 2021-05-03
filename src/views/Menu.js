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

  const foodandcoUrl = 'https://foodandco.fi/modules/json/json/Index?costNumber=3208&language=fi';
  const sodexoUrl = 'https://www.sodexo.fi/en/ruokalistat/output/daily_json/158/2021-05-03';

  useEffect(()=>{
    try{
      const result = axios({
        url: `https://cors-anywhere.herokuapp.com/${sodexoUrl}`,
        method: 'get',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }).then((result) => {
        setData(result.data)
        console.log(result.data)
      }); 
    }catch(err){
      console.error(err)
    } 
    
  },[setData])

  let day;
console.log(data)
  if( data.length() && Object.keys(data).length ){
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