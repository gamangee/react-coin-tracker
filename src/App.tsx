import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Coins from './routes/Coins';

function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <Coins />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
