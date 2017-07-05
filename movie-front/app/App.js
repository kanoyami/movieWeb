import React from 'react';
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MainRouter from './Main-router.js'


class App extends React.Component{
    render(){
        return(    
  <Router>
    <div>
    <Route exact path="/" component={MainRouter}/>
    <Route path={'/home/:id?'} component={MainRouter}/>
    </div>
  </Router>           
        )
    }
}


render((
<App/>
), document.getElementById('root'))