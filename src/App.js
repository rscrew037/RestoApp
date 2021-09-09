import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ResturantUpdate from "./components/ResturantUpdate";
import ResturantCreate from "./components/ResturantCreate";
import ResturantDetail from "./components/ResturantDetail";
import ResturantSearch from "./components/ResturantSearch";
import ResturantList from "./components/ResturantList";
import Login from "./components/Login";

import Logout from "./components/Logout";
import Protected from "./components/Protected";


function App() {
  return (
    <div className="App">
     
      <Router>
      
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/login" render={props=>(
          <Login  {...props}/>
        )}
        >
        </Route>
      
        <Protected exact path="/" component={Home} />
        <Protected exact path="/update/:id" component={ResturantUpdate} />
        <Protected exact path="/detail" component={ResturantDetail} />
        <Protected exact path="/search" component={ResturantSearch} />
        <Protected exact path="/create" component={ResturantCreate} />
        <Protected exact path="/list" component={ResturantList} />
      </Router>
    </div>
  );
}
export default App;
