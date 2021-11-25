import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../styles/MealRow.css'

import QRCode from 'qrcode.react'

const MealRow = ({meal}) => {
  //console.log(meal)
  return (
    <Row className='MealRow' key={meal.title_fi}>
      <Col xs={6}>
        <Row>{meal.category.toUpperCase()}</Row>
        <Row className='MealRowTitle'>
          <p>{meal.title_fi}<br/>{meal.title_en}</p>
        </Row>
      </Col>
      <Col xs={6}>
        <Row className="d-flex justify-content-around" style={{height:"100%"}}>
          <Col xs={3} className='MealPrices align-self-center' >
            {meal.price.split('/').map(p => <div key={meal.title_fi+p}>{p}</div> )}
          </Col>
          <Col xs={3} className='MealDietcodes d-flex align-items-center justify-content-center'>
            <Row>{meal.dietcodes}</Row>
          </Col>
          <Col xs={3} className='MealDietInfo '  >
            { meal.additionalDietInfo && meal.additionalDietInfo.dietcodeImages &&
              <Row className="d-flex justify-content-end h-100 d-inline-block">
                { meal.additionalDietInfo.dietcodeImages &&
                  meal.additionalDietInfo.dietcodeImages.map(image =>
                    <Col xs={4} key={meal.title_fi+image} className="d-flex align-self-center">
                      <img   src={image}  alt='diet icon' />
                    </Col>
                  ) 
                }
              </Row>
            }
            {meal.category === "Jälkiruoka" && 
              <Row>
                <QRCode value="https://www.sodexo.fi/en/restaurants/metropolia-myllypuro" />
              </Row>
            }
          </Col>
          
        </Row>
      </Col>
    </Row>
  )
}

export default MealRow
