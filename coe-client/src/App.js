import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRunDetails from './DA/components/AddRunDetails';

import { TableComponents } from './DD/components/TableComponents';
import CheckList from './DA/components/CheckList'
import DirForm from './FM/components/DirForm';
import Login from './DA/components/Login';
import InputVariables from './FM/components/InputVariables'
import DataDisplay from './FM/components/DataDisplay';
import { ToastContainer } from "react-toastify";
import View from './FM/components/View';
import PreSynthesisReport from './DA/components/preSynthesisReport';
import { AreaTable } from './DD/dashboardTable/AreaTable';

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
        <Route path='/InputVariables' element={<InputVariables />} />
        <Route path="/view-data" element={<View/>}/>
        <Route path='/data-display' element={<DataDisplay/>}/>
        <Route path='/preSynthesisReport' element={<PreSynthesisReport/>} />
        <Route path='/viewdashboard' element={<AreaTable />} />
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
