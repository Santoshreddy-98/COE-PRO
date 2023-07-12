import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRunDetails from './DA/components/AddRunDetails';

import { TableComponents } from './DD/components/TableComponents';
import CheckList from './DA/components/CheckList'
import DirForm from './FM/components/DirForm';
import Login from './DA/components/Login';
import nextpage from './DA/components/nextpage'
import InputVariables from './FM/components/InputVariables'
import { ToastContainer } from "react-toastify";
import View from './FM/components/View';

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>

        <Route path="/" element={<AddRunDetails />} />
        <Route path="/landing" element={<TableComponents />} />
        <Route path="/checklist" element={<CheckList />} />
        <Route path='/dirform' element={<DirForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/nextpage' element={<nextpage />} />
        <Route path='/InputVariables' element={<InputVariables />} />
        <Route path="/view-data" element={<View/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

















// import './App.css';
// import React, { useState } from 'react';
// import AddRunDetails from './DA/components/AddRunDetails';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import LoginForm from './DA/components/LoginForm';

// function App() {
//   const [isLoggedIn, setLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setLoggedIn(true);
//   };
  
//   return (
//     <div className="App">
//      <AddRunDetails />
//      <LoginForm />
//      <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default App;
