import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import reportWebVitals from './reportWebVitals';

import Layout from "./components/layout";

import Home from "./pages/home";
import Login from "./pages/login";
import Recipes from "./pages/recipes";
import Submit from "./pages/submit";
//import Events from "./pages/events";
import Notices from "./pages/notices";
import About from "./pages/about";
import Admin from "./pages/admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="notices" element={<Notices />} />
          <Route path="submit" element={<Submit />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/*
<Route path="recipes/:id" element={<Recipe />} />
<Route path="submit" element={<Submit />} />
<Route path="events" element={<Events />} />
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
