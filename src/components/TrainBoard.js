import React from 'react'
import {Table} from 'react-bootstrap'

export const TrainBoard = ({data, direction}) => {

  const convertSeconds = (seconds) => {
    const hours = parseInt(seconds / 3600)
    const minutes = parseInt(seconds % 3600 / 60)
    return `${hours}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`
  }

  return (
    <>
      <h5><b>Junat {direction}</b></h5>
      <Table size="sm">
        <thead>
          <tr>
            <th>Aika</th>
            <th>Suunta</th>
          </tr>
        </thead>
        <tbody>
          {data ?
            data.map(d => {
              return (
                <tr key={d.stopSequence + d.scheduledDeparture + d.realtimeDeparture}>
                  <td style={{width:10}}>{convertSeconds(d.realtimeDeparture)}</td>
                  <td>{d.headsign}</td>
                </tr>
              )
            }) : <></>}
        </tbody>
      </Table>
    </>
  )
}
