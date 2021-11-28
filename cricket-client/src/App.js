import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TeamPage, MatchPage } from "./pages";
import { HomePage } from "./pages/home/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/teams/:teamName/matches/:year">
            <MatchPage />
          </Route>
          <Route path="/teams/:teamName">
            <TeamPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
