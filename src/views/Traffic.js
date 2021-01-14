import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Col,
  Row,
  Image,
  Table,
  Navbar
} from 'react-bootstrap'

import { Navigation } from '../components/Navigation'
import { BusBoard } from '../components/BusBoard'
import { TrainBoard } from '../components/TrainBoard'
import { Map } from '../components/Map'
import { getStopById, getStationInfo } from '../hslApi'
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

const Traffic = () => {

  const [hslData, setData] = useState({stations:[],stops:{}})
  const [time, setTime] = useState()

  var now = new Date(),
  then = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0, 0, 0),
  diff = now.getTime() - then.getTime();
  diff = diff.toString()
  diff = diff.slice(0, -3)
  diff = parseInt(diff)


 /*  const convertSeconds = (seconds) => {

    const hours = parseInt(seconds / 3600)
    const minutes = parseInt(seconds % 3600 / 60)
    return `${hours}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`
  }
 */
  const hslApi = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date)
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    let newData = { ...hslData }
    updateStops()
      .then(result => {
        console.log(result)
        result.map(r => newData.stops[r.data.data.stop.code] = r.data.data.stop)
        console.log(newData)
        setData(newData)
      })
    updateStations()
      .then(result => {
        console.log(result)
        result.map(r => newData.stations.push(r.data.data.station))
        console.log(newData)
        setData(newData)
      })
  }, [setData])

  const updateStops = async () => {
    const hslStops = [ 'HSL:2132226', 'HSL:2132225', 'HSL:2132207', "HSL:2132208" ]

    return Promise.all(hslStops.map(id => getData(getStopById(id))))
  }

  const updateStations= async () => {
    const hslStations = ['HSL:2000204']

    return Promise.all(hslStations.map(id => getData(getStationInfo(id))))
  }

  const getData = async (query, id) => {
    try {
      return axios({
        url: hslApi,
        method: 'post',
        data: {
          query: query
        }
      });
    } catch (err) {
      console.error(err)
    }
  }

  const stops = [
    {
      lat: 60.22347,
      lon: 24.76050,
      offset: [-15, -15],
      ttpos: 'top',
      code: "E1815",
      hslId: "HSL:2132226",
      header: 'Pysäkki E1815'
    },
    {
      lat: 60.22329,
      lon: 24.76034,
      offset: [-20, 30],
      ttpos: 'bottom',
      code: "E1814",
      header: 'Pysäkki E1814'
    },
    {
      lat: 60.22572,
      lon: 24.75767,
      offset: [0,0],
      code: "E1807",
      ttpos: 'top',
      header: 'Pysäkki E1807'
    },
    {
      lat: 60.22551,
      lon: 24.76065,
      offset: [-20, 30],
      code: "E1808",
      ttpos: 'bottom',
      header: 'Pysäkki E1808'
    }
  ]

  return (
    <Container fluid>
      <Navigation time={time} />
      <Row>
        <Col xs="12" md="6">
          <Map ll={[60.2238794, 24.758149]} stops={stops} />
        </Col>
        <Col xs="4" lg="2">
          {['E1807','E1814'].map(s => hslData.stops[s] && 
            <BusBoard key={s} data={hslData.stops[s]} /> 
          )}
        </Col>
        <Col xs="4" lg="2">
          {[ 'E1808', 'E1815'].map(s => hslData.stops[s] && 
            <BusBoard key={s} data={hslData.stops[s]} /> 
          )}
       </Col>
       <Col xs="4" lg="2">
          <TrainBoard data={hslData.stations[0] && hslData.stations[0].stoptimesWithoutPatterns.filter(d => d.headsign !=="Helsinki")} direction="länteen" />
          <TrainBoard data={hslData.stations[0] && hslData.stations[0].stoptimesWithoutPatterns.filter(d => d.headsign === "Helsinki")} direction="itään" />
        </Col>
      </Row>
    </Container>
  )
}

export default Traffic
