import React from 'react'
import { Row, Col } from 'react-bootstrap'

const MealRow = ({data}) => {
  console.log(data)
  const meals_en = data.en.MenusForDays[0].SetMenus
  const meals_fi = data.fi.MenusForDays[0].SetMenus

  return (
    <>
      {
        data && Object.keys(data).length !== 0 &&
        meals_fi.map( menu => {
          console.log(meals_fi.indexOf(menu))
          const fi_components = menu.Components
          const en_components = meals_en[meals_fi.indexOf(menu)].Components
          return Object.keys(fi_components).length !== 0 && 
            (
              <>
                { fi_components.map(c => {
                  const index = fi_components.indexOf(c)
                  const mealDataFi = c.split('(')
                  const mealDataEn = en_components[index].split('(')
                  return (
                    <>
                      <Row  key={mealDataFi[0]}>
                        <Col xs={6}>
                          <Row>{mealDataFi[0].toUpperCase()}</Row>
                          <Row style={{fontStyle:'italic'}}>{mealDataEn[0]}</Row>
                        </Col>
                        <Col xs={4} className="d-flex align-items-center">
                          <Row>{mealDataFi[1].replace(')','')}</Row>
                        </Col>
                      </Row>
                    </>
                  )
                })}
                <br />
                <hr />
              </>
            )
          })
        }
      </>
  )
}

export default MealRow
