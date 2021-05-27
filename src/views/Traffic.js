import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Col,
  Row,
  Table
} from 'react-bootstrap'

import { Map } from '../components/Map'
import { getStopById, getStationInfo, stopsByRadius, hslApiUrl } from '../data/hslApi'
import '../styles/Traffic.css'

const Traffic = () => {

  //Karaportti location
  const kp = {
    lat: 60.2238794, 
    lon: 24.758149
  }

  //present time in seconds for midnight check
  let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
  let midnightCheck = now.split('klo')[1].split('.')
  midnightCheck = midnightCheck.map(t => parseInt(t))
  midnightCheck = midnightCheck[0]*3600+midnightCheck[1]*60+midnightCheck[2]

  const [hslData, setData] = useState([])
  const [stops, setStops] = useState([])
 
  useEffect(() => {
    let newData = []
    updateStopsByRadius()
      .then(result => {
        const stopsByR = result.data.data.stopsByRadius.edges.map(d => d.node.stop)
        setStops(stopsByR)
        
        updateStops(stopsByR)
          .then(result => {
            result.map(r => {
              const stop = r.data.data.stop.code
              const data =  r.data.data.stop.stoptimesWithoutPatterns
              console.log(r.data.data.stop)
              data.map(d=> {
                const obj = {}
                obj.stop = stop
                obj.time = d.scheduledArrival
                obj.heading = d.headsign
                obj.type = "bus"
                newData.push(obj)
                return ''
              })
              //organise all results according to time
              const cleanData = [...hslData, ...newData].sort((a, b) => a.time > b.time ? 1 : -1)
              cleanData.filter((item, pos) => (cleanData[pos+1] && (cleanData[pos+1].heading !== item.heading)) ||  (cleanData[pos+1] && (cleanData[pos+1].time !== item.time)))
              //organise results by day when nearing the end of the day (86400 -> 0000 seconds)
              const dataDay1 = cleanData.filter(d => d.time > midnightCheck)
              const dataDay2 = cleanData.filter(d => d.time < midnightCheck)
              setData([...dataDay1, ...dataDay2])
              return ''
            })
          })
        updateStations()
          .then(result => {
            result.map(r =>{
              const station = r.data.data.station.name
              const data =  r.data.data.station.stoptimesWithoutPatterns
              data.map(d=> {
                const obj = {}
                obj.stop = station
                obj.time = d.scheduledArrival
                obj.heading = d.headsign
                obj.type = "train"
                newData.push(obj)
                return null;
              })
              const cleanData = [...hslData, ...newData].sort((a, b) => a.time > b.time ? 1 : -1)
              cleanData.filter((item, pos) => (cleanData[pos+1] && (cleanData[pos+1].heading !== item.heading)) ||  (cleanData[pos+1] && (cleanData[pos+1].time !== item.time)))
              //organise results by day when nearing the end of the day (86400 -> 0000 seconds)
              const dataDay1 = cleanData.filter(d => d.time > midnightCheck)
              const dataDay2 = cleanData.filter(d => d.time < midnightCheck)
              setData([...dataDay1, ...dataDay2])
            })
            return null;
          })
      })
     // if(!stops.length){
      
      
  }, [])

  const updateStops = async (stops) => {
    return Promise.all(stops.map(stop => getData(getStopById(stop.gtfsId))))
  }

  const updateStations= async () => {
    const hslStations = ['HSL:2000204']
    return Promise.all(hslStations.map(id => getData(getStationInfo(id))))
  }

  const updateStopsByRadius = async () => {
    return getData(stopsByRadius(kp.lat, kp.lon))
  }

  const getData = async (query, id) => {
    try {
      return axios({
        url: hslApiUrl,
        method: 'post',
        data: {
          query: query
        }
      });
    } catch (err) {
      console.error(err)
    }
  }

  const convertSeconds = (seconds) => {
    let hours = parseInt(seconds / 3600)
    if(hours===24){hours=0}
    if(hours===25){hours=1}
    const minutes = parseInt(seconds % 3600 / 60)
    return `${hours.toString().length > 1 ? hours : `0${hours}`}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`
  }

  //console.log(hslData)
  return (
    <Container fluid>
      <Row>
        <Col xs="12" md="6">
          <Map ll={[60.2238794, 24.758149]} lat={kp.lat} lon={kp.lon} stops={stops} />
        </Col>
        <Col>
          {hslData.length &&
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Aika</th>
                  <th>Suunta</th>
                  <th>Pysäkki</th>
                </tr>
              </thead>
            <tbody>
              {hslData.map(d => 
                <tr key={hslData.indexOf(d)}>
                  <td><img style={{height:30,width:30}} src={d.type==="train" ? "Juna cmyk-test.svg" : "Bussi cmyk-01.svg"} /></td>
                  <td>{convertSeconds(d.time)}</td>
                  <td>{d.heading.toUpperCase()}</td>
                  <td>{d.stop}</td>
                </tr>
              )}
            </tbody>
          </Table>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Traffic
