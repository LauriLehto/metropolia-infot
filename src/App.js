import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Trafic from './views/Trafic'
import Menu from './views/Menu'
function App() {
  return (
    <Router>
      <Link to="/liikenne">Liikenne</Link>
      <Link to="/ruokalista">Ruokalista</Link>
      <Switch>
        <Route path="/" exact>
          <div>Koti</div>
        </Route>
        <Route path="/liikenne">
          <Trafic />
        </Route>
        <Route path="/ruokalista">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
