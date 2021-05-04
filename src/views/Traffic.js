import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Col,
  Row,
  Table
} from 'react-bootstrap'

import { Map } from '../components/Map'
import { getStopById, getStationInfo, hslApiUrl } from '../data/hslApi'

import { stops } from '../data/stops'

const Traffic = () => {

  const [hslData, setData] = useState([])
 
  useEffect(() => {
    let newData = []
    updateStops()
      .then(result => {
        result.map(r => {
          const stop = r.data.data.stop.code
          const data =  r.data.data.stop.stoptimesWithoutPatterns
          data.map(d=> {
            const obj = {}
            obj.stop = stop
            obj.time = d.scheduledArrival
            obj.heading = d.headsign
            obj.type = "bus"
            newData.push(obj)
          })
          setData([...hslData, ...newData])
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
          })
          setData([...hslData, ...newData])
        })
      })
      
  }, [])

  const updateStops = async () => {
    return Promise.all(stops.map(stop => getData(getStopById(stop.hslId))))
  }

  const updateStations= async () => {
    const hslStations = ['HSL:2000204']

    return Promise.all(hslStations.map(id => getData(getStationInfo(id))))
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

  return (
    <Container fluid>
      <Row>
        <Col xs="12" md="6">
          <Map ll={[60.2238794, 24.758149]} stops={stops} />
        </Col>
        <Col>
          {hslData.length &&
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th></th>
                  <th>Aika</th>
                  <th>Suunta</th>
                  <th>Pysäkki</th>
                </tr>
              </thead>
            <tbody>
              {hslData.sort((a, b) => a.time > b.time && 1 || -1).map(d => 
                <tr key={hslData.indexOf(d)}>
                  <td><img style={{height:30,width:30}} src={d.type==="train" ? "Juna cmyk-test.svg" : "Bussi cmyk-01.svg"} /></td>
                  <td>{d.time}</td>
                  <td>{d.heading}</td>
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
