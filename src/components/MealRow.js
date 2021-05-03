import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../styles/MealRow.css'

const MealRow = ({meal, key}) => {
  return (
    <Row className='MealRow' key={key}>
      <Col xs={6}>
        <Row>{meal.category.toUpperCase()}</Row>
        <Row className='MealRowTitle'>{meal.title_fi}</Row>
      </Col>
      <Col xs={6}>
        <Row className="d-flex justify-content-center">
          <Col xs={3} className='MealPrices' >
            {meal.price.split('/').map(p => <Row key={p}>{p}</Row> )}
          </Col>
          <Col xs={3} className='MealDietcodes'>
            <Row>{meal.dietcodes}</Row>
          </Col>
          <Col xs={3} className='MealDietInfo ' >
            <Row className="d-flex justify-content-end">
              { meal.additionalDietInfo && meal.additionalDietInfo.dietcodeImages.map(image =>
              <Col xs={4}>
                <img src={image}  alt='diet icon' />
              </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default MealRow
