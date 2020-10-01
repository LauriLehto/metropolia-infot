import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Traffic from './views/Traffic'
import Menu from './views/Menu'

function App() {
  return (
    <Router>
     {/*  <Link to="/liikenne">Liikenne</Link>
      <Link to="/ruokalista">Ruokalista</Link> */}
      <Switch>
        <Route path="/" exact>
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
  );
}

export default App;
