import React from 'react'
import {Table} from 'react-bootstrap'

export const ScheduleTable = ({data}) => {

  
  const convertSeconds = (seconds) => {
    const hours = parseInt(seconds / 3600)
    const minutes = parseInt(seconds % 3600 / 60)
    return `${hours}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`
  }

  return (
    <Table striped bordered>
      <thead>
        <h3>{data.code}</h3>
        <tr>
          <th>Aika</th>
          <th>Suunta</th>
        </tr>
      </thead>
      <tbody>
        {data ?
          data.stoptimesWithoutPatterns.map(d => {
            return (
              <tr key={d.stopSequence + d.scheduledDeparture + d.realtimeDeparture}>
                <td>{convertSeconds(d.realtimeDeparture)}</td>
                <td>{d.headsign}</td>
              </tr>
            )
          }) : <></>}
      </tbody>
    </Table>
  )
}
