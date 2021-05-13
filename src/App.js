import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import ComicsByCharacter from "./containers/ComicsByCharacter";
import Favorites from "./containers/Favorites";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comics/:idCharacter">
          <ComicsByCharacter />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/">
          <Characters />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
