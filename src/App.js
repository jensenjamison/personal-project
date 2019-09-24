import React from 'react';
import './App.css';
import {HashRouter, Link} from "react-router-dom";
import routes from "./routes"


function App() {
  return (
    <HashRouter>
      <nav className="nav">
        <Link to="/"><button>Home</button></Link>
        <div className="nav-right">
          <Link to="/create"><button>Create</button></Link>
          <Link to="/surveys"><button>Surveys</button></Link>
        </div>
      </nav>
      {routes}
    </HashRouter>
  );
}

export default App;
