import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { Container } from 'react-bootstrap'

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
          <Link to="/liikenne">Liikenne</Link>
          <Link to="/ruokalista">Ruokalista</Link>
          <div>Koti</div>
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
