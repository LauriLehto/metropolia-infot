import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../styles/MealRow.css'

const MealRow = ({meal}) => {
  return (
    <Row className='MealRow' key={meal.title_fi}>
      <Col xs={6}>
        <Row>{meal.category.toUpperCase()}</Row>
        <Row className='MealRowTitle'>{meal.title_fi}</Row>
      </Col>
      <Col xs={6}>
        <Row className="d-flex justify-content-center">
          <Col xs={3} className='MealPrices' >
            {meal.price.split('/').map(p => <Row key={meal.title_fi+p}>{p}</Row> )}
          </Col>
          <Col xs={3} className='MealDietcodes d-flex align-items-center'>
            <Row>{meal.dietcodes}</Row>
          </Col>
          <Col xs={3} className='MealDietInfo '  >
            <Row className="d-flex justify-content-end h-100 d-inline-block">
              { meal.additionalDietInfo.dietcodeImages && meal.additionalDietInfo.dietcodeImages.map(image =>
              <Col xs={4} key={meal.title_fi+image} className="d-flex align-self-center">
                <img   src={image}  alt='diet icon' />
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
