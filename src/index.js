import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Home} from "./components/home" ;
import {Submit} from "./components/Submit" ;
import { Router, Route, NavLink } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory"
import './index.css';


const history = createBrowserHistory();

ReactDOM.render(<Router history={history}>
    <div>
    	  <nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		    </div>
		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul className="nav navbar-nav">
		      	<li><NavLink exact activeStyle={{
				    fontWeight: 'bold',
				    color: 'blue'
				   }} activeClassName="active" to="/">Love to Eat!</NavLink></li>
		     
				<li><NavLink activeStyle={{
				    fontWeight: 'bold',
				    color: 'blue'
				   }} activeClassName="active" to="/Home">Home</NavLink></li> 

			    <li><NavLink activeStyle={{
				    fontWeight: 'bold',
				    color: 'blue'
				   }} activeClassName="active" to="/Submit">Submit</NavLink></li>

		      </ul>
		    </div>
		  </div>
		</nav>
		<Route exact path="/" component={App} />
        <Route path="/Submit" component={Submit} />
        <Route path="/Home" component={Home} />
    </div>
  </Router>, document.getElementById('root'));
registerServiceWorker();
