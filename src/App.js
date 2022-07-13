import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 6;
  render() {
    return (
      <><BrowserRouter>
        
        
          <NavBar/>
          <Routes>
            <Route exact path='/' element={<News pageSize = {this.pageSize} key="general"  country = {'in'} category="general"/>}></Route>
            <Route exact path='/home' element={<News pageSize = {this.pageSize} key="general"  country = {'in'} category="general"/>}></Route>
            <Route exact path='/business' element={<News pageSize = {this.pageSize} key="business" country = {'in'} category="business"/>}></Route>
            <Route exact path='/entertainment' element={<News pageSize = {this.pageSize} key="entertainment" country = {'in'} category="entertainment"/>}></Route>
            <Route exact path='/science' element={<News pageSize = {this.pageSize} key="science"  country = {'in'} category="science"/>}></Route>
            <Route exact path='/sports' element={<News pageSize = {this.pageSize} key="sports" country = {'in'} category="sports"/>}></Route>
            <Route exact path='/health' element={<News pageSize = {this.pageSize} key="health" country = {'in'} category="health"/>}></Route>
            <Route exact path='/technology' element={<News pageSize = {this.pageSize} key="technology"  country = {'in'} category="technology"/>}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

