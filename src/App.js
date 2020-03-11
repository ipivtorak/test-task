import React from 'react';
import Search from './Search';
import {BrowserRouter, Route } from 'react-router-dom';
import DetailedView from './DetailedView';
import List from './List';


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">Фильмы онлайн смотреть бесплатно только у нас БЕЗ РЕКЛАМЫ</a>
      </header>
      <BrowserRouter>
        <Route exact path='/' component={Search} />
        <Route path='/dashboard/:query' render={(props) => (<List {...props} />)} />
        <Route path='/film/:query' render={(props) => (<DetailedView {...props} />)} />
      </BrowserRouter>
    </div>
  );
}

