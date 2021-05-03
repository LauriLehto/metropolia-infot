import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import TopBar from './components/TopBar'
import Traffic from './views/Traffic'
import Traffic2 from './views/Traffic2'
import Menu from './views/Menu'

function App() {
  return (
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
        <Route path="/liikenne2">
          <Traffic2 />
        </Route> 
        <Route path="/ruokalista">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
