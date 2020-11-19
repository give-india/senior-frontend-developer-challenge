import logo from './logo.svg';
import './App.css';
import Dashboard from "../src/Components/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect  } from "react-router-dom";
import React,{Component} from "react"; 
function App() {
  return (
    <Dashboard/>  
  );
}

export default App;
