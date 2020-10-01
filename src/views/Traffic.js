import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { 
  Container, 
  Col, 
  Row,
  Header,
  Image,
  Table
} from 'react-bootstrap'

import kuva from '../images/kuva.jpg'
/* import { useQuery, gql } from '@apollo/client' */

/* const STOPS_BY_ID = gql`
  query GetStopsById {
    {
      stop(id: "HSL:1140447") {
        name
        wheelchairBoarding
      }
    }
  }
`; */

const Trafic = () => {

  const [ stops, setData] = useState([])
  const [ time, setTime] = useState()

  const stopDetails = `
    {
      stop(id:"HSL:2132226"){
      id
      name
      gtfsId
      code
    }
  }`
  const nearest =` {
    nearest (lat:60.224028, lon:24.758914){
      edges{node{
        id
        distance
      }}
    }
  }`

  const getStopById1 =  `
    {
      stop(id:"HSL:2132226"){
        id
        name
        code
        stoptimesWithoutPatterns {
          scheduledArrival
          realtimeArrival
          arrivalDelay
          scheduledDeparture
          realtimeDeparture
          departureDelay
          timepoint
          realtime
          realtimeState
          pickupType
          dropoffType
          serviceDay
          stopHeadsign
          headsign
          stopSequence
        }
      }
    }`

    const getStopById2 =  `
    {
      stop(id:"HSL:2132225"){
        id
        name
        code
        stoptimesWithoutPatterns {
          scheduledArrival
          realtimeArrival
          arrivalDelay
          scheduledDeparture
          realtimeDeparture
          departureDelay
          timepoint
          realtime
          realtimeState
          pickupType
          dropoffType
          serviceDay
          stopHeadsign
          headsign
          stopSequence
        }
      }
    }`

  const getStopsKaraportti = `
  {
    stops(name:"Karamalmen"){
      id
      gtfsId
      name
    }
  }
  `
  const hslApi = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{

    update()

  }, [setData])

  const update = async() => {
    let newData = [...stops]
    try{
      axios({
        url: hslApi,
        method: 'post',
        data: {
          query: getStopById1
        }
      }).then((result) => {
        newData[0]=result.data.data
        setData(newData)

      });
    }catch(err){
      console.error(err)
    } 
    try{
      axios({
        url: hslApi,
        method: 'post',
        data: {
          query: getStopById2
        }
      }).then((result) => {
        newData[1]=result.data.data
        setData(newData)
      });
    }catch(err){
      console.error(err)
    }
    console.log(newData)

  }

  var now = new Date(),
  then = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,0,0),
  diff = now.getTime() - then.getTime();
  diff = diff.toString()
  diff = diff.slice(0, -3)
  diff = parseInt(diff)
  /* if(stops[0]&&diff>stops[0].stop.stoptimesWithoutPatterns[0].scheduledArrival||stops[1]&&diff>stops[1].stop.stoptimesWithoutPatterns[0].scheduledArrival){
    console.log('update')
    update()
  } */

  const convertSeconds = (seconds) => {

    const hours = parseInt(seconds/3600)
    const minutes = parseInt(seconds%3600/60)
    return `${hours}:${minutes.toString().length>1? minutes: `0${minutes}`}`
  }

  const days = [
    'Sunnuntai',
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
    'Lauantai'
  ]

  return (
    <Container>
      <Col>
        <h1>Bussit Karaportin kampukselta</h1>
        <h3>{time&&`${days[time.getDay()]}  ${time.toLocaleString()}`}</h3>
        {/* <p>{diff}, {convertSeconds(diff)}</p> */}  
        <Row>
          <Col>
            <h3>Karamalmi</h3>
            <h2>E1815</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lähtee</th>
                  {/* <th>Myöhässä</th> */}
                </tr>
              </thead>
              <tbody>
                {stops[0]&&stops[0].stop.stoptimesWithoutPatterns.map(d=> {
                  
                  let date = new Date
                  date = date.getTime()
                  return(
                    <tr key={d.scheduledArrival}>
                      <td>{convertSeconds(d.scheduledDeparture)} </td>
                      {/* <td>{d.realTimeArrival&&convertSeconds(d.realTimeDeparture)}</td> */}
                    </tr>
                  )}
                )}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h3>Karamalmi</h3>
            <h2>E1814</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lähtee</th>
                 {/*  <th>Myöhässä</th> */}
                </tr>
              </thead>
              <tbody>
                {stops[0]&&stops[0].stop.stoptimesWithoutPatterns.map(d=> {
                  
                  let date = new Date
                  date = date.getTime()
                  return(
                    <tr key={d.scheduledArrival}>
                      <td>{convertSeconds(d.scheduledDeparture)} </td>
                      {/* <td>{d.realTimeArrival&&convertSeconds(d.realTimeDeparture)}</td> */}
                    </tr>
                  )}
                )}
              </tbody>
            </Table>
          </Col>
          <Col sm="6" style={{height:"100%",position: "relative"}} className="flex-d align-items-strech justify-content-end">
            <div style={{height:"100%", position:"absolute"}}>
            <Image style={{width:"100%"}} src={kuva} alt="Kuva" />
            </div>
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default Trafic
