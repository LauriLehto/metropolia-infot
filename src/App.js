import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'

import TopBar from './components/TopBar'
import Traffic from './views/Traffic'
import Menu from './views/Menu'

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
              <Link to="/ruokalista">
                <Button variant="secondary" size="lg">Ruokalista</Button>
              </Link>
            </Col>
          </Row>
        </Route>
        <Route path="/liikenne">
          <Traffic />
        </Route>
        <Route path="/ruokalista">
          <Menu />
        </Route>
      </Switch>
    </Router>
    </Container>
  );
}

export default App;
