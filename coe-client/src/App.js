import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRunDetails from './DA/components/AddRunDetails';

import { TableComponents } from './DD/components/TableComponents';
import CheckList from './DA/components/CheckList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AddRunDetails />} />
        <Route path="/landing" element={<TableComponents />} />
        <Route path="/checklist" element={<CheckList />} />
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
