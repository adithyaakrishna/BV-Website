import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './pages/homepage/homepage';
import Partners from './pages/partners/partners';
import News from './pages/news/news';

function App() {
  return (
       <Switch>
           <Route exact path = '/home' render = {() => <News></News>}></Route>
           <Redirect from = '' to = '/home'></Redirect>
       </Switch>
       
   );
}

export default App;
