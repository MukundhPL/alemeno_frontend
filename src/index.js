import React from 'react';
// import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import {store} from "./app/store"
import {Provider } from "react-redux"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* <Router>
        <Routes>  
          <Route path='/' element={<App/>} />
        </Routes>
      </Router> */}
      <App/>

    </Provider>
    
  // </React.StrictMode>
);


