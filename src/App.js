import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'

import TopBar from './components/TopBar'
import Traffic from './views/Traffic'
import Sodexo from './views/Sodexo'
import Foodnco from './views/Foodnco'

function App() {
  return (
    <Container>
    <Router>
      <TopBar />
      <Switch>
        <Route path="/" exact>
          <Row style={{height:"50%"}}>
            <Col className="d-flex justify-content-center align-items-center">
              <Link to="/liikenne">
                <Button variant="info" size="lg">Liikenne</Button>
              </Link>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Link to="/sodexo">
                <Button variant="secondary" size="lg">Sodexo</Button>
              </Link>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Link to="/foodnco">
                <Button variant="secondary" size="lg">Food'n'Co</Button>
              </Link>
            </Col>
          </Row>
        </Route>
        <Route path="/liikenne">
          <Traffic />
        </Route>
        <Route path="/sodexo">
          <Sodexo />
        </Route>
        <Route path="/foodnco">
          <Foodnco />
        </Route>
      </Switch>
    </Router>
    </Container>
  );
}

export default App;
