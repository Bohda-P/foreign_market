import React from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import Map from '../Map/Map'
import Overview from '../Overview/Overview'
import Statistics from '../Statistics/Statistics'
import './App.scss';

function App() {
  return (
    <Router>
       <Navigation/>
          <Switch>
                  <Route exact path="/" component={Overview} />
                  <Route path="/map" component={Map} />
                  <Route path="/statistics" component={Statistics} />
          </Switch>
      </Router> 
  )
} 

export default App
