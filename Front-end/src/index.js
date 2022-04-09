import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from 'react-router-dom';
import { LoginComponent } from './Components/LoginComponent/LoginComponent';
import { SignUpComponent } from './Components/SignUpComponent/SignUpComponent';
import { AboutComponent } from './Components/AboutUS/AboutComponent';
import { RentComponent } from './Components/RentComponent/RentComponent';
import { BuyComponent } from './Components/BuyComponent/BuyComponent';
import { SingleHome } from './Components/SingleHome/SingleHome'
import { SimpleMap } from './Components/SingleHome/SimpleMap';
import { ContactComponent } from './Components/ContactComponent/ContactComponent'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="signUp" element={<SignUpComponent />} />
        <Route path="aboutUS" element={<AboutComponent />} />
        <Route path="rent" element={<RentComponent />} />
        <Route path="buy" element={<BuyComponent />} />
        <Route path="singleHome" element={<SingleHome />} />
        <Route path="simpleMap" element={<SimpleMap />} />
        <Route path="contactUs" element={<ContactComponent />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
