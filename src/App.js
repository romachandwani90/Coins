import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import CoinTable from './Components/CoinTable';
import Details from './Components/Details';

const App = () => 
<Router>
    <Switch>
        <Route exact path="/" component={CoinTable} />
        <Route path="/details/:id" component={Details} />
    </Switch>
</Router>


export default App;
